// Web Audio API Synthesizer & Audio Engine for SoundPulse Network

export function createSafeAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      return new (AudioContextClass as any)();
    }
  } catch (e) {
    console.warn('AudioContext unavailable or constructor restricted:', e);
  }
  return null;
}

class SoundPulseAudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private bpm: number = 120;
  private synthPattern: any = null;
  private stemVolumes: { [key: string]: number } = {
    vocals: 1,
    drums: 1,
    bass: 1,
    synth: 1,
    guitar: 1
  };
  private stemMutes: { [key: string]: boolean } = {};
  private stemSolos: { [key: string]: boolean } = {};

  private onTickCallbacks: Set<(step: number) => void> = new Set();
  private onStateChangeCallbacks: Set<() => void> = new Set();

  public init() {
    if (!this.ctx) {
      this.ctx = createSafeAudioContext();
      if (this.ctx) {
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playTrack(trackId: string, bpm: number = 120, pattern?: any) {
    this.init();
    if (this.isPlaying) {
      this.stop();
    }

    this.currentTrackId = trackId;
    this.bpm = bpm || 120;
    this.synthPattern = pattern || {
      tempo: bpm,
      baseNote: 220,
      synthType: 'sawtooth',
      drumBeat: 'synth'
    };
    this.isPlaying = true;
    this.currentStep = 0;

    const intervalMs = (60 / this.bpm / 4) * 1000; // 16th notes
    this.timerId = window.setInterval(() => {
      this.step();
    }, intervalMs);

    this.notifyStateChange();
  }

  public pause() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.notifyStateChange();
  }

  public resume() {
    if (!this.currentTrackId) return;
    this.init();
    this.isPlaying = true;
    const intervalMs = (60 / this.bpm / 4) * 1000;
    this.timerId = window.setInterval(() => {
      this.step();
    }, intervalMs);
    this.notifyStateChange();
  }

  public stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.currentStep = 0;
    this.notifyStateChange();
  }

  public togglePlayPause(trackId: string, bpm: number = 120, pattern?: any) {
    if (this.currentTrackId === trackId) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.resume();
      }
    } else {
      this.playTrack(trackId, bpm, pattern);
    }
  }

  public setMasterVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public setStemVolume(stemType: string, vol: number) {
    this.stemVolumes[stemType] = vol;
  }

  public setStemMute(stemType: string, muted: boolean) {
    this.stemMutes[stemType] = muted;
  }

  public setStemSolo(stemType: string, soloed: boolean) {
    this.stemSolos[stemType] = soloed;
  }

  private isStemAudible(type: string): boolean {
    const hasAnySolo = Object.values(this.stemSolos).some(v => v);
    if (hasAnySolo) {
      return !!this.stemSolos[type] && !this.stemMutes[type];
    }
    return !this.stemMutes[type];
  }

  private step() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const step = this.currentStep % 16;

    // Synth Melody / Lead (Notes in Pentatonic / Minor scale)
    if (this.isStemAudible('synth') || this.isStemAudible('vocals') || this.isStemAudible('guitar')) {
      const scale = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
      const noteIdx = (step * 3 + (this.synthPattern?.baseNote || 0)) % scale.length;
      const freq = scale[noteIdx];

      if (step % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = this.synthPattern?.synthType || 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        const vol = (this.stemVolumes['synth'] ?? 1) * 0.15;
        noteGain.gain.setValueAtTime(vol, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.2);
      }
    }

    // Drums (Kick on 0, 4, 8, 12; Snare on 4, 12; HiHat on every odd step)
    if (this.isStemAudible('drums')) {
      const drumVol = this.stemVolumes['drums'] ?? 1;

      // Kick Drum
      if (step === 0 || step === 4 || step === 8 || step === 12) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(150, now);
        kickOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.15);
        kickGain.gain.setValueAtTime(0.4 * drumVol, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(this.masterGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.16);
      }

      // Snare Drum
      if (step === 4 || step === 12) {
        const snareNoise = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        snareNoise.buffer = buffer;

        const snareFilter = this.ctx.createBiquadFilter();
        snareFilter.type = 'highpass';
        snareFilter.frequency.value = 1000;

        const snareGain = this.ctx.createGain();
        snareGain.gain.setValueAtTime(0.25 * drumVol, now);
        snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        snareNoise.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareGain.connect(this.masterGain);
        snareNoise.start(now);
      }

      // Hi-Hat
      if (step % 2 === 1) {
        const hatOsc = this.ctx.createOscillator();
        const hatGain = this.ctx.createGain();
        hatOsc.type = 'square';
        hatOsc.frequency.setValueAtTime(8000, now);
        hatGain.gain.setValueAtTime(0.05 * drumVol, now);
        hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        hatOsc.connect(hatGain);
        hatGain.connect(this.masterGain);
        hatOsc.start(now);
        hatOsc.stop(now + 0.05);
      }
    }

    // Bassline (Sub bass)
    if (this.isStemAudible('bass')) {
      if (step === 0 || step === 6 || step === 8 || step === 14) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        const bassFreq = (this.synthPattern?.baseNote || 220) / 4;
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        const vol = (this.stemVolumes['bass'] ?? 1) * 0.3;
        bassGain.gain.setValueAtTime(vol, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.32);
      }
    }

    this.currentStep++;
    this.onTickCallbacks.forEach(cb => cb(this.currentStep));
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16).fill(0);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      bpm: this.bpm,
      currentStep: this.currentStep
    };
  }

  public subscribeStateChange(callback: () => void) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  public subscribeTick(callback: (step: number) => void) {
    this.onTickCallbacks.add(callback);
    return () => this.onTickCallbacks.delete(callback);
  }

  private notifyStateChange() {
    this.onStateChangeCallbacks.forEach(cb => cb());
  }
}

export const audioEngine = new SoundPulseAudioEngine();
