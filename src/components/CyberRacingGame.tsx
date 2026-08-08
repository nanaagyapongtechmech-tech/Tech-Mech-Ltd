import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createSafeAudioContext } from '../utils/audioEngine';
import { Play, RotateCcw, Trophy, Zap, Compass, Volume2, VolumeX, Flag, Award, Sparkles, Key } from 'lucide-react';

interface RacingTrack {
  id: string;
  name: string;
  theme: 'neon_highway' | 'magma_canyon' | 'cryo_ice' | 'hyperspace' | 'acid_jungle';
  bgColor: number;
  roadColor: number;
  neonColor: number;
  laps: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  rewardAeth: number;
}

const TRACKS: RacingTrack[] = [
  { id: 'tr_1', name: 'Neo-Tokyo Expressway', theme: 'neon_highway', bgColor: 0x020617, roadColor: 0x0f172a, neonColor: 0x06b6d4, laps: 3, difficulty: 'Easy', rewardAeth: 2500 },
  { id: 'tr_2', name: 'Vulkan Magma Circuit', theme: 'magma_canyon', bgColor: 0x1f0a00, roadColor: 0x27120a, neonColor: 0xf97316, laps: 3, difficulty: 'Medium', rewardAeth: 4000 },
  { id: 'tr_3', name: 'Cryo Ice Glacier Ring', theme: 'cryo_ice', bgColor: 0x021024, roadColor: 0x075985, neonColor: 0x38bdf8, laps: 3, difficulty: 'Medium', rewardAeth: 4500 },
  { id: 'tr_4', name: 'Hyperspace Tunnel Run', theme: 'hyperspace', bgColor: 0x0f0326, roadColor: 0x3b0764, neonColor: 0xc084fc, laps: 4, difficulty: 'Hard', rewardAeth: 6000 },
  { id: 'tr_5', name: 'Acid Jungle Bio-Speedway', theme: 'acid_jungle', bgColor: 0x021a10, roadColor: 0x064e3b, neonColor: 0x22c55e, laps: 4, difficulty: 'Extreme', rewardAeth: 8500 }
];

interface HoverVehicle {
  id: string;
  name: string;
  topSpeed: number;
  acceleration: number;
  handling: number;
  color: number;
  unlocked: boolean;
}

const VEHICLES: HoverVehicle[] = [
  { id: 'veh_1', name: 'Apex Interceptor', topSpeed: 280, acceleration: 92, handling: 88, color: 0x06b6d4, unlocked: true },
  { id: 'veh_2', name: 'Phantom Drift X', topSpeed: 310, acceleration: 85, handling: 95, color: 0xc084fc, unlocked: true },
  { id: 'veh_3', name: 'Titan Turbo GT', topSpeed: 330, acceleration: 98, handling: 78, color: 0xf59e0b, unlocked: true },
  { id: 'veh_4', name: 'Valkyrie Hyperion', topSpeed: 350, acceleration: 95, handling: 92, color: 0xf43f5e, unlocked: true }
];

interface CyberRacingGameProps {
  onEarnAeth: (amount: number) => void;
}

export const CyberRacingGame: React.FC<CyberRacingGameProps> = ({ onEarnAeth }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [selectedTrack, setSelectedTrack] = useState<RacingTrack>(TRACKS[0]);
  const [selectedVehicle, setSelectedVehicle] = useState<HoverVehicle>(VEHICLES[0]);
  const [gameState, setGameState] = useState<'idle' | 'racing' | 'finished'>('idle');

  // Live telemetry
  const [speed, setSpeed] = useState(0);
  const [lap, setLap] = useState(1);
  const [position, setPosition] = useState(1);
  const [nitro, setNitro] = useState(100);
  const [lapTime, setLapTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [raceResults, setRaceResults] = useState<{ rank: number; prize: number } | null>(null);

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Sound Synth
  const playSfx = (type: 'engine' | 'nitro' | 'win') => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      if (type === 'nitro') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'win') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(selectedTrack.bgColor);
    scene.fog = new THREE.FogExp2(selectedTrack.bgColor, 0.003);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 4, 12);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(selectedTrack.neonColor, 2.5);
    dirLight.position.set(20, 50, 20);
    scene.add(dirLight);

    // 5. Track Ground & Oval Road Mesh
    const trackGroup = new THREE.Group();
    const roadGeo = new THREE.RingGeometry(35, 65, 64);
    roadGeo.rotateX(Math.PI / 2);
    const roadMat = new THREE.MeshStandardMaterial({
      color: selectedTrack.roadColor,
      roughness: 0.4,
      metalness: 0.6
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    trackGroup.add(roadMesh);

    // Outer & Inner Neon Barrier Arches
    const barrierGeo = new THREE.TorusGeometry(65, 0.8, 16, 64);
    barrierGeo.rotateX(Math.PI / 2);
    const barrierMat = new THREE.MeshBasicMaterial({ color: selectedTrack.neonColor });
    const barrier1 = new THREE.Mesh(barrierGeo, barrierMat);
    barrier1.position.y = 1;
    trackGroup.add(barrier1);

    const barrierInnerGeo = new THREE.TorusGeometry(35, 0.8, 16, 64);
    barrierInnerGeo.rotateX(Math.PI / 2);
    const barrier2 = new THREE.Mesh(barrierInnerGeo, barrierMat);
    barrier2.position.y = 1;
    trackGroup.add(barrier2);

    scene.add(trackGroup);

    // 6. Player Hovercraft Mesh
    const playerGroup = new THREE.Group();
    const bodyGeo = new THREE.ConeGeometry(2, 7, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: selectedVehicle.color,
      metalness: 0.9,
      roughness: 0.1
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    playerGroup.add(bodyMesh);

    // Wings
    const wingGeo = new THREE.BoxGeometry(8, 0.3, 3);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.set(0, 0, 1);
    playerGroup.add(wings);

    // Engine Thrusters
    const tGeo = new THREE.CylinderGeometry(0.5, 0.8, 2.5, 12);
    tGeo.rotateX(Math.PI / 2);
    const tMat = new THREE.MeshBasicMaterial({ color: selectedTrack.neonColor });
    const t1 = new THREE.Mesh(tGeo, tMat); t1.position.set(-1.2, 0, 3.5);
    const t2 = t1.clone(); t2.position.set(1.2, 0, 3.5);
    playerGroup.add(t1); playerGroup.add(t2);

    scene.add(playerGroup);

    // 7. AI Opponent Hovercrafts
    const aiVehicles: THREE.Group[] = [];
    const aiColors = [0xe11d48, 0xeab308, 0x22c55e];
    for (let i = 0; i < 3; i++) {
      const aiGroup = new THREE.Group();
      const aiBody = new THREE.Mesh(
        new THREE.ConeGeometry(1.8, 6.5, 6).rotateX(Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: aiColors[i], metalness: 0.8 })
      );
      aiGroup.add(aiBody);
      aiVehicles.push(aiGroup);
      scene.add(aiGroup);
    }

    // Racing Physics State
    let angle = 0;
    let radius = 50;
    let currSpeed = 0;
    let currentLap = 1;
    let currentNitro = 100;
    let timer = 0;
    const aiAngles = [0.2, 0.5, 0.8];
    const aiSpeeds = [0.012, 0.014, 0.011];

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (gameState === 'racing') {
        timer += 0.016;
        setLapTime(Number(timer.toFixed(1)));

        // Handle Controls
        let isNitroActive = false;
        if (keysPressed.current['shift'] || keysPressed.current['ShiftLeft']) {
          if (currentNitro > 0) {
            isNitroActive = true;
            currentNitro = Math.max(0, currentNitro - 0.5);
            setNitro(Math.floor(currentNitro));
          }
        } else {
          currentNitro = Math.min(100, currentNitro + 0.1);
          setNitro(Math.floor(currentNitro));
        }

        const maxKmh = isNitroActive ? selectedVehicle.topSpeed * 1.25 : selectedVehicle.topSpeed;
        
        if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
          currSpeed = Math.min(maxKmh, currSpeed + 3.5);
        } else if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
          currSpeed = Math.max(0, currSpeed - 5);
        } else {
          currSpeed = Math.max(0, currSpeed - 1.2);
        }

        setSpeed(Math.floor(currSpeed));

        // Steering angle
        const angularVelocity = (currSpeed / 300) * 0.02;
        if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
          radius = Math.max(36, radius - 0.3);
          playerGroup.rotation.z = 0.25;
        } else if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
          radius = Math.min(64, radius + 0.3);
          playerGroup.rotation.z = -0.25;
        } else {
          playerGroup.rotation.z = 0;
        }

        angle += angularVelocity;

        // Lap progression
        if (angle >= Math.PI * 2) {
          angle -= Math.PI * 2;
          currentLap++;
          setLap(currentLap);
          if (currentLap > selectedTrack.laps) {
            setGameState('finished');
            playSfx('win');
            const prize = selectedTrack.rewardAeth;
            onEarnAeth(prize);
            setRaceResults({ rank: 1, prize });
          }
        }

        // Update player position along oval track
        playerGroup.position.x = Math.cos(angle) * radius;
        playerGroup.position.z = Math.sin(angle) * radius;
        playerGroup.position.y = 1 + Math.sin(angle * 4) * 0.2; // Hover bob
        playerGroup.rotation.y = -angle + Math.PI / 2;

        // Camera follow
        camera.position.x = playerGroup.position.x + Math.cos(angle - 0.3) * 14;
        camera.position.z = playerGroup.position.z + Math.sin(angle - 0.3) * 14;
        camera.position.y = 5;
        camera.lookAt(playerGroup.position);

        // Update AI Racers
        aiVehicles.forEach((ai, idx) => {
          aiAngles[idx] += aiSpeeds[idx];
          const aiRadius = 40 + idx * 8;
          ai.position.x = Math.cos(aiAngles[idx]) * aiRadius;
          ai.position.z = Math.sin(aiAngles[idx]) * aiRadius;
          ai.position.y = 1;
          ai.rotation.y = -aiAngles[idx] + Math.PI / 2;
        });

      } else {
        // Idle camera spin
        angle += 0.005;
        camera.position.x = Math.cos(angle) * 20;
        camera.position.z = Math.sin(angle) * 20;
        camera.position.y = 8;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedTrack.id, selectedVehicle.id, gameState]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono shadow-2xl space-y-4 p-6">
      
      {/* Game Title & Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded font-bold border border-rose-800">
              NEW GAME 🏎️ 3D HOVER RACING
            </span>
            <h3 className="text-base font-black text-white">Neon Cyber Racing Arena</h3>
          </div>
          <p className="text-xs text-slate-400">High-speed 3D hovercraft track racing with nitro drift, lap timers, and AETH cash prizes!</p>
        </div>

        <button
          onClick={() => setSoundEnabled((s) => !s)}
          className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      {/* Track & Vehicle Config Panel */}
      {gameState === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Select Track */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Flag className="w-4 h-4" /> SELECT RACING TRACK
            </h4>
            <div className="space-y-2">
              {TRACKS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTrack(t)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedTrack.id === t.id
                      ? 'bg-slate-900 border-cyan-400 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.laps} Laps • {t.difficulty}</div>
                  </div>
                  <span className="text-xs font-black text-amber-400">+{t.rewardAeth.toLocaleString()} AETH</span>
                </div>
              ))}
            </div>
          </div>

          {/* Select Hovercraft */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" /> SELECT HOVERCRAFT
            </h4>
            <div className="space-y-2">
              {VEHICLES.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedVehicle.id === v.id
                      ? 'bg-slate-900 border-rose-400 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{v.name}</div>
                    <div className="text-[10px] text-slate-400">Top Speed: {v.topSpeed} KM/H</div>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-bold">Handling: {v.handling}%</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setGameState('racing');
                setLap(1);
                playSfx('nitro');
              }}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer mt-4"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>START RACE NOW</span>
            </button>
          </div>

        </div>
      )}

      {/* 3D Racing Viewport */}
      <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950" ref={mountRef}>
        
        {/* Race Telemetry HUD */}
        {gameState === 'racing' && (
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none font-mono">
            
            {/* Speedometer */}
            <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-2xl">
              <div className="text-[10px] text-slate-400">SPEEDOMETER</div>
              <div className="text-2xl font-black text-white">{speed} <span className="text-xs text-rose-400">KM/H</span></div>
            </div>

            {/* Lap & Time */}
            <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-2xl text-center">
              <div className="text-xs font-bold text-amber-400">LAP {lap} / {selectedTrack.laps}</div>
              <div className="text-lg font-extrabold text-white">{lapTime}s</div>
            </div>

            {/* Nitro Gauge */}
            <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-2xl w-40">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>NITRO BOOST</span>
                <span className="text-cyan-400 font-bold">{nitro}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full transition-all" style={{ width: `${nitro}%` }} />
              </div>
            </div>

          </div>
        )}

        {/* Finished Modal overlay */}
        {gameState === 'finished' && raceResults && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur flex flex-col items-center justify-center space-y-4 z-20">
            <Trophy className="w-16 h-16 text-amber-400 animate-bounce" />
            <h2 className="text-2xl font-black text-white">RACE FINISHED!</h2>
            <div className="text-sm text-slate-300">Position: <span className="text-cyan-400 font-bold">1st Place 🏆</span></div>
            <div className="text-base font-black text-amber-400 bg-amber-950/60 px-4 py-2 rounded-xl border border-amber-800">
              PRIZE: +{raceResults.prize.toLocaleString()} AETH CREDITS
            </div>
            <button
              onClick={() => setGameState('idle')}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}

        {/* On-screen Keybinds & Touch Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="hidden sm:flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white">W / Up</kbd> Accelerate</span>
            <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white">A / D</kbd> Steer</span>
            <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white">SHIFT</kbd> Nitro Boost</span>
          </div>

          {/* Mobile Touch Steering & Pedals */}
          {gameState === 'racing' && (
            <div className="flex items-center justify-between w-full sm:w-auto gap-3 select-none">
              <div className="flex items-center gap-1">
                <button
                  onMouseDown={() => { keysPressed.current['a'] = true; }}
                  onMouseUp={() => { keysPressed.current['a'] = false; }}
                  onMouseLeave={() => { keysPressed.current['a'] = false; }}
                  onTouchStart={(e) => { e.preventDefault(); keysPressed.current['a'] = true; }}
                  onTouchEnd={() => { keysPressed.current['a'] = false; }}
                  onTouchCancel={() => { keysPressed.current['a'] = false; }}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
                  title="Steer Left"
                >
                  ◄
                </button>
                <button
                  onMouseDown={() => { keysPressed.current['d'] = true; }}
                  onMouseUp={() => { keysPressed.current['d'] = false; }}
                  onMouseLeave={() => { keysPressed.current['d'] = false; }}
                  onTouchStart={(e) => { e.preventDefault(); keysPressed.current['d'] = true; }}
                  onTouchEnd={() => { keysPressed.current['d'] = false; }}
                  onTouchCancel={() => { keysPressed.current['d'] = false; }}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
                  title="Steer Right"
                >
                  ►
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onMouseDown={() => { keysPressed.current['s'] = true; }}
                  onMouseUp={() => { keysPressed.current['s'] = false; }}
                  onMouseLeave={() => { keysPressed.current['s'] = false; }}
                  onTouchStart={(e) => { e.preventDefault(); keysPressed.current['s'] = true; }}
                  onTouchEnd={() => { keysPressed.current['s'] = false; }}
                  onTouchCancel={() => { keysPressed.current['s'] = false; }}
                  className="w-10 h-10 bg-rose-950 border border-rose-800 hover:bg-rose-900 active:bg-rose-600 text-rose-300 font-black rounded-xl text-xs flex items-center justify-center cursor-pointer touch-none"
                  title="Brake"
                >
                  BRAKE
                </button>
                <button
                  onMouseDown={() => { keysPressed.current['w'] = true; }}
                  onMouseUp={() => { keysPressed.current['w'] = false; }}
                  onMouseLeave={() => { keysPressed.current['w'] = false; }}
                  onTouchStart={(e) => { e.preventDefault(); keysPressed.current['w'] = true; }}
                  onTouchEnd={() => { keysPressed.current['w'] = false; }}
                  onTouchCancel={() => { keysPressed.current['w'] = false; }}
                  className="px-3.5 h-10 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center cursor-pointer touch-none shadow-md"
                  title="Accelerate"
                >
                  GAS ▲
                </button>
                <button
                  onMouseDown={() => { keysPressed.current['shift'] = true; }}
                  onMouseUp={() => { keysPressed.current['shift'] = false; }}
                  onMouseLeave={() => { keysPressed.current['shift'] = false; }}
                  onTouchStart={(e) => { e.preventDefault(); keysPressed.current['shift'] = true; }}
                  onTouchEnd={() => { keysPressed.current['shift'] = false; }}
                  onTouchCancel={() => { keysPressed.current['shift'] = false; }}
                  className="px-3.5 h-10 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center cursor-pointer touch-none shadow-md"
                  title="Nitro Boost"
                >
                  NITRO 🚀
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
