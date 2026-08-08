import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createSafeAudioContext } from '../utils/audioEngine';
import { PlanetWorld, PlanetSimDistrict, PlayerLevelProgress, UserAvatarState, InteractableNPC, GroundMiningNode, OpenWorldVehicle } from '../types';
import { Rocket, Shield, Zap, Sparkles, Navigation, Car, Users, Pickaxe, Award, Globe, ArrowRight, MessageSquare, CheckCircle, Volume2, VolumeX, ChevronRight, Lock } from 'lucide-react';

interface GTAWorldCanvasProps {
  currentPlanet: PlanetWorld;
  currentSim: PlanetSimDistrict;
  playerLevel: PlayerLevelProgress;
  userAvatar: UserAvatarState;
  allPlanets: PlanetWorld[];
  onSelectSim: (sim: PlanetSimDistrict) => void;
  onGainExp: (exp: number) => void;
  onEarnAeth: (aeth: number) => void;
  onCompleteQuest: (npcId: string, questTitle: string, rewardAeth: number, rewardExp: number) => void;
}

export const GTAWorldCanvas: React.FC<GTAWorldCanvasProps> = ({
  currentPlanet,
  currentSim,
  playerLevel,
  userAvatar,
  allPlanets,
  onSelectSim,
  onGainExp,
  onEarnAeth,
  onCompleteQuest
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Vehicle & Mode State
  const [selectedVehicle, setSelectedVehicle] = useState<OpenWorldVehicle>(currentSim.featuredVehicles[0]);
  const [isDriving, setIsDriving] = useState(false);
  const [activeNpc, setActiveNpc] = useState<InteractableNPC | null>(null);
  const [activeDialogIndex, setActiveDialogIndex] = useState(0);
  const [miningNodesState, setMiningNodesState] = useState<GroundMiningNode[]>(currentSim.miningNodes);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPlanetSelectorOpen, setIsPlanetSelectorOpen] = useState(false);

  // 3D Three.js Refs
  const playerMeshRef = useRef<THREE.Group | null>(null);
  const vehicleMeshRef = useRef<THREE.Group | null>(null);
  const npcGroupRef = useRef<THREE.Group | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Sound Synthesizer
  const playSfx = (type: 'engine' | 'talk' | 'mine' | 'level') => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      if (type === 'mine') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'level') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'talk') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(currentPlanet.id === 'planet_volcanic_forge' ? 0x1f0a00 : 0x020617);
    scene.fog = new THREE.FogExp2(scene.background, 0.005);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 18, 30);
    camera.lookAt(0, 2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    sunLight.position.set(40, 80, 40);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // 5. Open World City / Sim Ground Grid Mesh
    const groundGeo = new THREE.PlaneGeometry(240, 240, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: currentSim.category === 'Second Life Beach Resort' ? 0x0284c7 : 0x0f172a,
      roughness: 0.8,
      metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Grid floor lines for Cyber aesthetic
    const gridHelper = new THREE.GridHelper(240, 40, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // 6. Buildings & Structures (GTA Cyber City or Tropical Palms)
    const buildingsGroup = new THREE.Group();
    if (currentSim.category === 'GTA Cyber Downtown') {
      for (let i = 0; i < 28; i++) {
        const bHeight = Math.random() * 35 + 15;
        const bGeo = new THREE.BoxGeometry(10, bHeight, 10);
        const bMat = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.5 ? 0x1e293b : 0x0f172a,
          roughness: 0.2,
          metalness: 0.8
        });
        const bMesh = new THREE.Mesh(bGeo, bMat);
        const angle = (i / 28) * Math.PI * 2;
        const dist = Math.random() * 60 + 40;
        bMesh.position.set(Math.cos(angle) * dist, bHeight / 2, Math.sin(angle) * dist);

        // Neon Roof Accents
        const roofGeo = new THREE.BoxGeometry(10.2, 0.8, 10.2);
        const roofMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x06b6d4 : 0xec4899 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = bHeight / 2 + 0.4;
        bMesh.add(roof);

        buildingsGroup.add(bMesh);
      }
    } else {
      // Beach or Volcanic Structures
      for (let i = 0; i < 16; i++) {
        const pGeo = new THREE.CylinderGeometry(1, 2, 12, 8);
        const pMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        const angle = (i / 16) * Math.PI * 2;
        const dist = Math.random() * 50 + 30;
        pMesh.position.set(Math.cos(angle) * dist, 6, Math.sin(angle) * dist);

        // Top Canopy
        const topGeo = new THREE.ConeGeometry(6, 4, 8);
        const topMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
        const topMesh = new THREE.Mesh(topGeo, topMat);
        topMesh.position.y = 6;
        pMesh.add(topMesh);

        buildingsGroup.add(pMesh);
      }
    }
    scene.add(buildingsGroup);

    // 7. Player 3D Avatar Group
    const playerGroup = new THREE.Group();
    playerMeshRef.current = playerGroup;

    const bodyGeo = new THREE.CapsuleGeometry(1, 2.5, 8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 2.25;
    playerGroup.add(bodyMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfde047 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 4.2;
    playerGroup.add(headMesh);

    scene.add(playerGroup);

    // 8. GTA Hover Roadster Vehicle
    const vehicleGroup = new THREE.Group();
    vehicleMeshRef.current = vehicleGroup;

    const carBodyGeo = new THREE.BoxGeometry(4.5, 1.8, 8);
    const carBodyMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.9, roughness: 0.1 });
    const carBody = new THREE.Mesh(carBodyGeo, carBodyMat);
    carBody.position.y = 1.2;
    vehicleGroup.add(carBody);

    // Hover Thruster Pads
    for (let x of [-2.4, 2.4]) {
      for (let z of [-2.8, 2.8]) {
        const padGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 12);
        const padMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
        const pad = new THREE.Mesh(padGeo, padMat);
        pad.position.set(x, 0.2, z);
        vehicleGroup.add(pad);
      }
    }

    vehicleGroup.position.set(6, 0, 4);
    scene.add(vehicleGroup);

    // 9. Render Interactable NPCs
    const npcGroup = new THREE.Group();
    npcGroupRef.current = npcGroup;

    currentSim.npcs.forEach((npc, index) => {
      const npcSubGroup = new THREE.Group();
      npcSubGroup.name = npc.id;

      const npcGeo = new THREE.CapsuleGeometry(1, 2.5, 8, 16);
      const npcMat = new THREE.MeshStandardMaterial({
        color: index === 0 ? 0xec4899 : 0xeab308,
        roughness: 0.4
      });
      const npcMesh = new THREE.Mesh(npcGeo, npcMat);
      npcMesh.position.y = 2.25;
      npcSubGroup.add(npcMesh);

      // Quest Beacon Marker Ring
      const beaconGeo = new THREE.RingGeometry(2, 2.4, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.rotation.x = Math.PI / 2;
      beacon.position.y = 0.1;
      npcSubGroup.add(beacon);

      const offset = (index + 1) * 12;
      npcSubGroup.position.set(-offset, 0, -offset / 2);
      npcGroup.add(npcSubGroup);
    });
    scene.add(npcGroup);

    // 10. Render Mining Nodes
    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;

    miningNodesState.forEach((node) => {
      if (node.mined) return;
      const nodeGeo = new THREE.OctahedronGeometry(2, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.type === 'Cyber Gold' ? 0xf59e0b : 0x06b6d4,
        emissive: node.type === 'Cyber Gold' ? 0x78350f : 0x083344,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(node.position[0], 2, node.position[2]);
      nodeMesh.name = node.id;
      nodesGroup.add(nodeMesh);
    });
    scene.add(nodesGroup);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate Hovercraft bobbing
      if (vehicleMeshRef.current) {
        vehicleMeshRef.current.position.y = Math.sin(elapsedTime * 2) * 0.3 + 0.2;
      }

      // Rotate Mining Crystals
      if (nodesGroupRef.current) {
        nodesGroupRef.current.children.forEach((crystal) => {
          crystal.rotation.y += 0.02;
          crystal.position.y = 2 + Math.sin(elapsedTime * 3) * 0.2;
        });
      }

      // Animate NPC floating indicators
      if (npcGroupRef.current) {
        npcGroupRef.current.children.forEach((npc) => {
          npc.rotation.y += 0.01;
        });
      }

      // Smooth camera follow player/vehicle
      const targetPos = isDriving && vehicleMeshRef.current ? vehicleMeshRef.current.position : playerGroup.position;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.x, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.z + 24, 0.05);
      camera.lookAt(targetPos.x, targetPos.y + 2, targetPos.z);

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
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentSim, currentPlanet, isDriving]);

  // Movement Controls
  const handleMove = (dir: 'W' | 'A' | 'S' | 'D') => {
    const targetGroup = isDriving ? vehicleMeshRef.current : playerMeshRef.current;
    if (!targetGroup) return;

    const speed = isDriving ? 3.5 : 1.8;
    if (dir === 'W') targetGroup.position.z -= speed;
    if (dir === 'S') targetGroup.position.z += speed;
    if (dir === 'A') targetGroup.position.x -= speed;
    if (dir === 'D') targetGroup.position.x += speed;

    playSfx('engine');
  };

  // Continuous Touch Hold Handler for Mobile
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startContinuousMove = (dir: 'W' | 'A' | 'S' | 'D') => {
    handleMove(dir);
    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      handleMove(dir);
    }, 120);
  };

  const stopContinuousMove = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
  };

  // Keyboard Movement Listener for GTA World
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') handleMove('W');
      if (key === 's' || key === 'arrowdown') handleMove('S');
      if (key === 'a' || key === 'arrowleft') handleMove('A');
      if (key === 'd' || key === 'arrowright') handleMove('D');
      if (key === 'e') setIsDriving((prev) => !prev);
      if (key === 'f') handleMineNode();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDriving, miningNodesState]);

  // Mine Nearby Node
  const handleMineNode = () => {
    const unminedNode = miningNodesState.find((n) => !n.mined);
    if (!unminedNode) {
      showNotification('All mining crystals in this sim sector have been harvested!');
      return;
    }

    setMiningNodesState((prev) =>
      prev.map((n) => (n.id === unminedNode.id ? { ...n, mined: true } : n))
    );

    playSfx('mine');
    onEarnAeth(unminedNode.valueAeth);
    onGainExp(unminedNode.expYield);
    showNotification(`⛏️ Harvested ${unminedNode.name}! Earned +${unminedNode.valueAeth} AETH ($${(unminedNode.valueAeth * 0.01).toFixed(2)}) & +${unminedNode.expYield} EXP!`);
  };

  // Talk to NPC
  const handleTalkNPC = (npc: InteractableNPC) => {
    setActiveNpc(npc);
    setActiveDialogIndex(0);
    playSfx('talk');
  };

  const handleNextDialog = () => {
    if (!activeNpc) return;
    if (activeDialogIndex < activeNpc.dialogue.length - 1) {
      setActiveDialogIndex((prev) => prev + 1);
      playSfx('talk');
    } else {
      // Accept Quest
      if (activeNpc.questTitle && !activeNpc.questCompleted) {
        onCompleteQuest(activeNpc.id, activeNpc.questTitle, activeNpc.questRewardAeth || 2500, activeNpc.questRewardExp || 1000);
        playSfx('level');
        showNotification(`🎉 QUEST COMPLETED: "${activeNpc.questTitle}"! Reward: +${activeNpc.questRewardAeth} AETH ($${((activeNpc.questRewardAeth || 0) * 0.01).toFixed(2)}) & +${activeNpc.questRewardExp} EXP!`);
      }
      setActiveNpc(null);
    }
  };

  return (
    <div className="space-y-4 font-mono">
      
      {/* 1000 Level Header & Planet Directory Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        
        {/* Level 1000 Progress Bar */}
        <div className="flex items-center gap-3.5 flex-1 min-w-[300px]">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg border-2 border-white/20">
            {playerLevel.level}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-cyan-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                {playerLevel.prestigeTitle} (LEVEL {playerLevel.level} / 1000)
              </span>
              <span className="text-slate-400 text-[10px]">
                EXP: {playerLevel.currentExp} / {playerLevel.expToNextLevel}
              </span>
            </div>

            {/* EXP Progress Track */}
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${(playerLevel.currentExp / playerLevel.expToNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Planet & Sim Explorer Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlanetSelectorOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>EXPLORE PLANETS & SIMS ({allPlanets.length} WORLDS)</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* 3D Neo-Chroma Open World Viewport */}
      <div className="relative w-full h-[560px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Notification */}
        {notification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/95 border-2 border-emerald-500 text-emerald-300 font-bold px-6 py-2.5 rounded-2xl text-xs shadow-2xl animate-bounce z-20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Current Location Badge */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl pointer-events-auto space-y-1">
          <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            {currentPlanet.name} • {currentSim.category}
          </div>
          <div className="text-xs font-black text-white">{currentSim.name}</div>
        </div>

        {/* Right HUD: Interactable NPCs list */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl pointer-events-auto max-w-xs space-y-2">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              SIM PATRONS & NPCS
            </span>
            <span className="text-[10px] text-purple-400 font-bold">{currentSim.npcs.length} ACTIVE</span>
          </div>

          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {currentSim.npcs.map((npc) => (
              <button
                key={npc.id}
                onClick={() => handleTalkNPC(npc)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-left cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <img src={npc.avatarUrl} alt={npc.name} className="w-6 h-6 rounded-full object-cover" />
                  <div>
                    <div className="text-[11px] font-bold text-white">{npc.name}</div>
                    <div className="text-[9px] text-slate-400">{npc.title}</div>
                  </div>
                </div>
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
              </button>
            ))}
          </div>
        </div>

        {/* NPC Dialogue Overlay Modal */}
        {activeNpc && (
          <div className="absolute bottom-20 left-6 right-6 bg-slate-900/95 backdrop-blur-xl border-2 border-purple-500 p-5 rounded-3xl shadow-2xl z-30 flex items-center gap-4">
            <img src={activeNpc.avatarUrl} alt={activeNpc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400" />
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-400">{activeNpc.name} ({activeNpc.title})</span>
                {activeNpc.questTitle && (
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800 font-bold">
                    QUEST: {activeNpc.questTitle}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                "{activeNpc.dialogue[activeDialogIndex]}"
              </p>

              {activeNpc.questDescription && (
                <div className="text-[11px] text-amber-300 pt-1 font-bold">
                  🎯 Objective: {activeNpc.questDescription} (Reward: +{activeNpc.questRewardAeth} AETH / +{activeNpc.questRewardExp} EXP)
                </div>
              )}
            </div>

            <button
              onClick={handleNextDialog}
              className="px-5 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>CONTINUE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Open World Control Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
          
          {/* Movement D-Pad with Touch support */}
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 flex items-center gap-1.5 shadow-xl select-none">
            <button
              onMouseDown={() => startContinuousMove('W')}
              onMouseUp={stopContinuousMove}
              onMouseLeave={stopContinuousMove}
              onTouchStart={(e) => { e.preventDefault(); startContinuousMove('W'); }}
              onTouchEnd={stopContinuousMove}
              onTouchCancel={stopContinuousMove}
              className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
              title="Forward (W)"
            >
              ▲
            </button>
            <button
              onMouseDown={() => startContinuousMove('S')}
              onMouseUp={stopContinuousMove}
              onMouseLeave={stopContinuousMove}
              onTouchStart={(e) => { e.preventDefault(); startContinuousMove('S'); }}
              onTouchEnd={stopContinuousMove}
              onTouchCancel={stopContinuousMove}
              className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
              title="Backward (S)"
            >
              ▼
            </button>
            <button
              onMouseDown={() => startContinuousMove('A')}
              onMouseUp={stopContinuousMove}
              onMouseLeave={stopContinuousMove}
              onTouchStart={(e) => { e.preventDefault(); startContinuousMove('A'); }}
              onTouchEnd={stopContinuousMove}
              onTouchCancel={stopContinuousMove}
              className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
              title="Steer Left (A)"
            >
              ◄
            </button>
            <button
              onMouseDown={() => startContinuousMove('D')}
              onMouseUp={stopContinuousMove}
              onMouseLeave={stopContinuousMove}
              onTouchStart={(e) => { e.preventDefault(); startContinuousMove('D'); }}
              onTouchEnd={stopContinuousMove}
              onTouchCancel={stopContinuousMove}
              className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-black rounded-xl text-sm flex items-center justify-center cursor-pointer touch-none"
              title="Steer Right (D)"
            >
              ►
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl">
            <button
              onClick={() => setIsDriving(!isDriving)}
              className={`px-4 py-2.5 rounded-xl font-black text-xs cursor-pointer flex items-center gap-2 transition-all ${
                isDriving ? 'bg-purple-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>{isDriving ? 'EXIT VEHICLE' : 'ENTER GTA VEHICLE'}</span>
            </button>

            <button
              onClick={handleMineNode}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Pickaxe className="w-4 h-4" />
              <span>MINE ORE NODE</span>
            </button>
          </div>

        </div>

      </div>

      {/* Planet & Sim Selection Modal */}
      {isPlanetSelectorOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-cyan-500 p-6 rounded-3xl max-w-4xl w-full space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  GALACTIC PLANETS & SIM DISTRICTS DIRECTORY
                </h3>
                <p className="text-xs text-slate-400">Select any planet or Second Life / Avakin / GTA open world sim district to teleport instantly.</p>
              </div>

              <button
                onClick={() => setIsPlanetSelectorOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-6">
              {allPlanets.map((planet) => (
                <div key={planet.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{planet.category} • LEVEL {planet.minLevel}+ REQUIRED</span>
                      <h4 className="text-base font-extrabold text-white">{planet.name}</h4>
                      <p className="text-xs text-slate-400">{planet.description}</p>
                    </div>

                    <span className="px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-bold rounded-full border border-cyan-800">
                      {planet.sims.length} SIM DISTRICTS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {planet.sims.map((sim) => {
                      const isUnlocked = playerLevel.level >= sim.minLevelRequired;
                      return (
                        <div
                          key={sim.id}
                          onClick={() => {
                            if (isUnlocked) {
                              onSelectSim(sim);
                              setIsPlanetSelectorOpen(false);
                            }
                          }}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                            isUnlocked
                              ? currentSim.id === sim.id
                                ? 'bg-cyan-950/60 border-cyan-500 text-white'
                                : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 text-slate-300'
                              : 'bg-slate-950/50 border-slate-900 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[9px] text-purple-400 font-bold uppercase">{sim.category}</span>
                              <div className="text-xs font-extrabold text-white">{sim.name}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-2">{sim.description}</div>
                            </div>

                            {!isUnlocked && (
                              <span className="flex items-center gap-1 text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                                <Lock className="w-3 h-3" />
                                Lvl {sim.minLevelRequired}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                            <span>{sim.npcs.length} NPCs • {sim.miningNodes.length} Mining Crystals</span>
                            <span className="text-cyan-400 font-bold flex items-center gap-1">
                              TELEPORT <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
