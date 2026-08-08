import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Zap, Flame, RotateCcw, Volume2, VolumeX, Crosshair, Award, Trophy, Play, Box } from 'lucide-react';
import { createSafeAudioContext } from '../utils/audioEngine';

interface VoxelWorld {
  id: string;
  name: string;
  theme: 'volcanic' | 'cryo' | 'cyber' | 'bioswamp';
  groundColor: number;
  gridColor: number;
  creepColor: number;
  rewardAeth: number;
}

const VOXEL_WORLDS: VoxelWorld[] = [
  { id: 'world_1', name: 'Cyber Grid Core', theme: 'cyber', groundColor: 0x0f172a, gridColor: 0x06b6d4, creepColor: 0xf43f5e, rewardAeth: 3000 },
  { id: 'world_2', name: 'Volcanic Ash Citadel', theme: 'volcanic', groundColor: 0x1f0a00, gridColor: 0xf97316, creepColor: 0xeab308, rewardAeth: 4500 },
  { id: 'world_3', name: 'Cryo Glacier Outpost', theme: 'cryo', groundColor: 0x021024, gridColor: 0x38bdf8, creepColor: 0xc084fc, rewardAeth: 5000 },
  { id: 'world_4', name: 'Acid Bio-Swamp Sector', theme: 'bioswamp', groundColor: 0x021a10, gridColor: 0x22c55e, creepColor: 0xf43f5e, rewardAeth: 7000 }
];

interface TurretType {
  id: string;
  name: string;
  cost: number;
  dps: number;
  color: number;
}

const TURRETS: TurretType[] = [
  { id: 'tur_1', name: 'Plasma Blaster', cost: 100, dps: 45, color: 0x06b6d4 },
  { id: 'tur_2', name: 'Laser Sentinel', cost: 250, dps: 110, color: 0xf43f5e },
  { id: 'tur_3', name: 'Cryo Slow Cannon', cost: 400, dps: 180, color: 0x38bdf8 }
];

interface VoxelDefenseGameProps {
  onEarnAeth: (amount: number) => void;
}

export const VoxelDefenseGame: React.FC<VoxelDefenseGameProps> = ({ onEarnAeth }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [selectedWorld, setSelectedWorld] = useState<VoxelWorld>(VOXEL_WORLDS[0]);
  const [selectedTurret, setSelectedTurret] = useState<TurretType>(TURRETS[0]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'victory' | 'gameover'>('idle');

  // Game Stats
  const [coreHealth, setCoreHealth] = useState(100);
  const [wave, setWave] = useState(1);
  const [energy, setEnergy] = useState(300);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const playSfx = (type: 'shoot' | 'build' | 'hit') => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      if (type === 'shoot') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
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
    scene.background = new THREE.Color(selectedWorld.groundColor);
    scene.fog = new THREE.FogExp2(selectedWorld.groundColor, 0.005);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 30, 40);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dirLight = new THREE.DirectionalLight(selectedWorld.gridColor, 2.5);
    dirLight.position.set(30, 60, 30);
    scene.add(dirLight);

    // 5. Voxel Board Grid
    const boardGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(60, 20, selectedWorld.gridColor, 0x1e293b);
    boardGroup.add(gridHelper);

    // Core Crystal in center
    const coreGeo = new THREE.OctahedronGeometry(4, 0);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x082f49, roughness: 0.1 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 4;
    boardGroup.add(coreMesh);

    scene.add(boardGroup);

    // Player Hero Voxel
    const heroGroup = new THREE.Group();
    const heroMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 4, 2),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
    heroMesh.position.y = 2;
    heroGroup.add(heroMesh);
    scene.add(heroGroup);

    // Enemies Group
    const creepGroup = new THREE.Group();
    scene.add(creepGroup);

    let currWave = 1;
    let currHp = 100;
    let currEnergy = 300;
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Core spinning animation
      coreMesh.rotation.y = elapsedTime * 1.2;

      if (gameState === 'playing') {
        // Hero Movement with WASD
        if (keysPressed.current['w']) heroGroup.position.z -= 0.3;
        if (keysPressed.current['s']) heroGroup.position.z += 0.3;
        if (keysPressed.current['a']) heroGroup.position.x -= 0.3;
        if (keysPressed.current['d']) heroGroup.position.x += 0.3;

        // Keep Hero inside bounds
        heroGroup.position.x = Math.max(-28, Math.min(28, heroGroup.position.x));
        heroGroup.position.z = Math.max(-28, Math.min(28, heroGroup.position.z));

        // Spawn creeps periodically
        if (Math.random() < 0.03 && creepGroup.children.length < 8) {
          const creep = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 1.8, 1.8),
            new THREE.MeshStandardMaterial({ color: selectedWorld.creepColor })
          );
          const spawnAngle = Math.random() * Math.PI * 2;
          creep.position.set(Math.cos(spawnAngle) * 35, 1, Math.sin(spawnAngle) * 35);
          creepGroup.add(creep);
        }

        // Move creeps towards Core Crystal
        creepGroup.children.forEach((creep) => {
          creep.lookAt(0, 1, 0);
          creep.translateZ(0.12);

          // Check if reached core
          if (creep.position.distanceTo(coreMesh.position) < 5) {
            currHp = Math.max(0, currHp - 5);
            setCoreHealth(currHp);
            creepGroup.remove(creep);
            if (currHp === 0) {
              setGameState('gameover');
            }
          }
        });

      } else {
        // Idle camera spin
        camera.position.x = Math.cos(elapsedTime * 0.2) * 45;
        camera.position.z = Math.sin(elapsedTime * 0.2) * 45;
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
  }, [selectedWorld.id, gameState]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono shadow-2xl space-y-4 p-6">
      
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded font-bold border border-cyan-800">
              NEW GAME 🧱 3D VOXEL DEFENSE
            </span>
            <h3 className="text-base font-black text-white">Voxel Alien Invasion Defense</h3>
          </div>
          <p className="text-xs text-slate-400">Build laser turrets, pilot hero avatar, and defend core crystal against waves of alien invaders!</p>
        </div>

        <button
          onClick={() => setSoundEnabled((s) => !s)}
          className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      {/* World Selection Panel */}
      {gameState === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4" /> SELECT VOXEL BATTLEFIELD
            </h4>
            <div className="space-y-2">
              {VOXEL_WORLDS.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorld(w)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedWorld.id === w.id
                      ? 'bg-slate-900 border-cyan-400 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white">{w.name}</span>
                  <span className="text-xs font-black text-amber-400">+{w.rewardAeth.toLocaleString()} AETH</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">HOW TO PLAY</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-bold">WASD</kbd> keys to move your hero voxel around the grid. Aliens will spawn from all edges and attack the central Core Crystal!
              </p>
            </div>

            <button
              onClick={() => {
                setGameState('playing');
                setCoreHealth(100);
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>START DEFENSE WAVE</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D Viewport */}
      <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950" ref={mountRef}>
        
        {/* Telemetry HUD & Mobile Touch Controls */}
        {gameState === 'playing' && (
          <>
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none font-mono">
              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-2xl w-56">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>CORE CRYSTAL HEALTH</span>
                  <span className="text-cyan-400 font-bold">{coreHealth}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-cyan-400 h-full transition-all" style={{ width: `${coreHealth}%` }} />
                </div>
              </div>

              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-2xl text-center">
                <div className="text-xs font-bold text-amber-400">DEFENSE WAVE {wave}</div>
              </div>
            </div>

            {/* Mobile Touch Movement D-Pad */}
            <div className="absolute bottom-4 left-4 pointer-events-auto bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 flex items-center gap-1.5 shadow-2xl select-none">
              <button
                onMouseDown={() => { keysPressed.current['w'] = true; }}
                onMouseUp={() => { keysPressed.current['w'] = false; }}
                onMouseLeave={() => { keysPressed.current['w'] = false; }}
                onTouchStart={(e) => { e.preventDefault(); keysPressed.current['w'] = true; }}
                onTouchEnd={() => { keysPressed.current['w'] = false; }}
                onTouchCancel={() => { keysPressed.current['w'] = false; }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
                title="Move Up (W)"
              >
                ▲
              </button>
              <button
                onMouseDown={() => { keysPressed.current['s'] = true; }}
                onMouseUp={() => { keysPressed.current['s'] = false; }}
                onMouseLeave={() => { keysPressed.current['s'] = false; }}
                onTouchStart={(e) => { e.preventDefault(); keysPressed.current['s'] = true; }}
                onTouchEnd={() => { keysPressed.current['s'] = false; }}
                onTouchCancel={() => { keysPressed.current['s'] = false; }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
                title="Move Down (S)"
              >
                ▼
              </button>
              <button
                onMouseDown={() => { keysPressed.current['a'] = true; }}
                onMouseUp={() => { keysPressed.current['a'] = false; }}
                onMouseLeave={() => { keysPressed.current['a'] = false; }}
                onTouchStart={(e) => { e.preventDefault(); keysPressed.current['a'] = true; }}
                onTouchEnd={() => { keysPressed.current['a'] = false; }}
                onTouchCancel={() => { keysPressed.current['a'] = false; }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
                title="Move Left (A)"
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
                title="Move Right (D)"
              >
                ►
              </button>
            </div>
          </>
        )}

      </div>

    </div>
  );
};
