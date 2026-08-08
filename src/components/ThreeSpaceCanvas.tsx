import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createSafeAudioContext } from '../utils/audioEngine';
import { StarShip, StarSystem, BossRaidEntity, PvPOpponent, SpaceGameMode } from '../types';
import { Play, Shield, Target, Zap, RotateCcw, Rocket, Anchor, Compass, Skull, Swords, Volume2, VolumeX, Flame, Award, Sparkles, AlertTriangle } from 'lucide-react';

interface ThreeSpaceCanvasProps {
  currentShip: StarShip;
  currentSystem: StarSystem;
  bossRaid: BossRaidEntity;
  pvpOpponents: PvPOpponent[];
  gameMode: SpaceGameMode;
  setGameMode: (mode: SpaceGameMode) => void;
  onMineOre: (amount: number) => void;
  onDefeatPirate: (bountyAeth: number) => void;
  onAttackBoss: (damage: number) => void;
  onDefeatPvPOpponent: (opponentId: string, bountyAeth: number) => void;
}

export const ThreeSpaceCanvas: React.FC<ThreeSpaceCanvasProps> = ({
  currentShip,
  currentSystem,
  bossRaid,
  pvpOpponents,
  gameMode,
  setGameMode,
  onMineOre,
  onDefeatPirate,
  onAttackBoss,
  onDefeatPvPOpponent
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive Simulation Controls
  const [isWarping, setIsWarping] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [isFiringLasers, setIsFiringLasers] = useState(false);
  const [isFiringMissile, setIsFiringMissile] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Targets State
  const [selectedPvpTargetId, setSelectedPvpTargetId] = useState<string>(pvpOpponents[0]?.id || '');
  const [targetLockType, setTargetLockType] = useState<'Asteroid' | 'Pirate Raider' | 'PvP Pilot' | 'World Boss'>('Asteroid');
  const [pirateHp, setPirateHp] = useState(100);
  
  // Player Stats in combat session
  const [shieldState, setShieldState] = useState(currentShip.shieldPoints);
  const [hullState, setHullState] = useState(currentShip.hullIntegrity);
  const [floatingDamage, setFloatingDamage] = useState<{ id: string; text: string; color: string }[]>([]);

  const [combatLog, setCombatLog] = useState<string[]>([
    `[SYSTEM] Undocked in ${currentSystem.name}. Security: ${currentSystem.securityRating}`,
    `[TACTICAL] Mode active: ${gameMode.toUpperCase().replace('_', ' ')}`
  ]);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const shipGroupRef = useRef<THREE.Group | null>(null);
  const bossGroupRef = useRef<THREE.Group | null>(null);
  const pvpShipsGroupRef = useRef<THREE.Group | null>(null);
  const lasersGroupRef = useRef<THREE.Group | null>(null);
  const missilesGroupRef = useRef<THREE.Group | null>(null);
  const miningBeamRef = useRef<THREE.Mesh | null>(null);
  const asteroidRef = useRef<THREE.Mesh | null>(null);
  const pirateRef = useRef<THREE.Group | null>(null);
  const warpParticlesRef = useRef<THREE.Points | null>(null);
  const bossBeamRef = useRef<THREE.Mesh | null>(null);
  const thrusterParticlesRef = useRef<THREE.Points | null>(null);

  // Audio Synthesizer for Sci-Fi SFX
  const playSFX = (type: 'laser' | 'missile' | 'explosion' | 'warp' | 'shield') => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      if (type === 'laser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'missile') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'explosion') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'warp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } else if (type === 'shield') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Helper to trigger pop-up damage text
  const addDamageText = (text: string, color: string = '#f43f5e') => {
    const id = `dmg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setFloatingDamage((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFloatingDamage((prev) => prev.filter((d) => d.id !== id));
    }, 1200);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x020617); // Deep Slate Night
    scene.fog = new THREE.FogExp2(0x020617, 0.0012);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 16, 38);
    camera.lookAt(0, 0, -5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 1.5);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0x38bdf8, 2.8);
    mainSun.position.set(120, 180, 120);
    mainSun.castShadow = true;
    scene.add(mainSun);

    const rimLight = new THREE.PointLight(0xa855f7, 3.5, 250);
    rimLight.position.set(-60, -30, -60);
    scene.add(rimLight);

    // 5. Deep Space Dust & Starfield
    const starCount = 2500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 1600;
      starPositions[i + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i + 2] = (Math.random() - 0.5) * 1600;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0x38bdf8, size: 1.6, transparent: true, opacity: 0.8 });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Warp Speed Particles
    const warpCount = 800;
    const warpGeometry = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpCount * 3);
    for (let i = 0; i < warpCount * 3; i += 3) {
      warpPositions[i] = (Math.random() - 0.5) * 80;
      warpPositions[i + 1] = (Math.random() - 0.5) * 80;
      warpPositions[i + 2] = (Math.random() - 0.5) * 800;
    }
    warpGeometry.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    const warpMaterial = new THREE.PointsMaterial({ color: 0x06b6d4, size: 2.5, transparent: true, opacity: 0 });
    const warpParticles = new THREE.Points(warpGeometry, warpMaterial);
    scene.add(warpParticles);
    warpParticlesRef.current = warpParticles;

    // 7. Player Starship 3D Group
    const shipGroup = new THREE.Group();
    shipGroupRef.current = shipGroup;

    // Hull Core Mesh
    const hullGeo = new THREE.ConeGeometry(3.5, 15, 8);
    hullGeo.rotateX(Math.PI / 2);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.15
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    shipGroup.add(hullMesh);

    // Wings
    const wingGeo = new THREE.BoxGeometry(18, 0.4, 7);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1 });
    const wingMesh = new THREE.Mesh(wingGeo, wingMat);
    wingMesh.position.set(0, 0, 2);
    shipGroup.add(wingMesh);

    // Dual Thruster Exhaust Glow
    const engineGeo = new THREE.CylinderGeometry(0.9, 1.3, 3.5, 12);
    engineGeo.rotateX(Math.PI / 2);
    const engineMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const engine1 = new THREE.Mesh(engineGeo, engineMat);
    engine1.position.set(-3, 0, 7.5);
    const engine2 = engine1.clone();
    engine2.position.set(3, 0, 7.5);
    shipGroup.add(engine1);
    shipGroup.add(engine2);

    // Cockpit Glass Canopy
    const cockpitGeo = new THREE.SphereGeometry(1.4, 16, 16);
    const cockpitMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0,
      ior: 1.5
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 1.2, -2.5);
    cockpit.scale.set(1, 0.6, 2.8);
    shipGroup.add(cockpit);

    // Shield Bubble Sphere
    const shieldGeo = new THREE.SphereGeometry(11, 24, 24);
    const shieldMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.08, wireframe: true });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shipGroup.add(shieldMesh);

    scene.add(shipGroup);

    // 7b. Massive 3D Celestial Planet & Atmosphere Ring
    const celestialGroup = new THREE.Group();
    const planetGeo = new THREE.SphereGeometry(45, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.7,
      metalness: 0.2,
      emissive: 0x082f49
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    celestialGroup.add(planetMesh);

    // Planet Rings
    const pRingGeo = new THREE.RingGeometry(55, 75, 48);
    const pRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const pRing = new THREE.Mesh(pRingGeo, pRingMat);
    pRing.rotation.x = Math.PI / 2.5;
    celestialGroup.add(pRing);

    celestialGroup.position.set(-80, -20, -140);
    scene.add(celestialGroup);

    // 8. Asteroid Object (PvE Mining Mode)
    const astGeo = new THREE.DodecahedronGeometry(7, 1);
    const astMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.85,
      metalness: 0.35
    });
    const asteroid = new THREE.Mesh(astGeo, astMat);
    asteroid.position.set(24, 2, -28);
    scene.add(asteroid);
    asteroidRef.current = asteroid;

    // 9. Pirate Raider Ship (PvE)
    const pirateGroup = new THREE.Group();
    const pBodyGeo = new THREE.BoxGeometry(4.5, 2.2, 9);
    const pBodyMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, metalness: 0.8 });
    const pBody = new THREE.Mesh(pBodyGeo, pBodyMat);
    pirateGroup.add(pBody);
    pirateGroup.position.set(-28, 6, -38);
    scene.add(pirateGroup);
    pirateRef.current = pirateGroup;

    // 10. World Boss Titan Leviathan (Boss Raid Mode)
    const bossGroup = new THREE.Group();
    bossGroupRef.current = bossGroup;

    const bCoreGeo = new THREE.IcosahedronGeometry(14, 2);
    const bCoreMat = new THREE.MeshStandardMaterial({
      color: 0x881337,
      emissive: 0x4c0519,
      metalness: 0.9,
      roughness: 0.2
    });
    const bCore = new THREE.Mesh(bCoreGeo, bCoreMat);
    bossGroup.add(bCore);

    // Boss Outer Armor Ring
    const ringGeo = new THREE.TorusGeometry(22, 2.5, 16, 50);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, emissive: 0x9f1239, metalness: 0.9 });
    const bossRing = new THREE.Mesh(ringGeo, ringMat);
    bossRing.rotation.x = Math.PI / 3;
    bossGroup.add(bossRing);

    // Boss Doomsday Ray Mesh
    const bBeamGeo = new THREE.CylinderGeometry(1.5, 8, 80, 16);
    bBeamGeo.rotateX(Math.PI / 2);
    const bBeamMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0 });
    const bossBeam = new THREE.Mesh(bBeamGeo, bBeamMat);
    bossBeam.position.set(0, 0, 40);
    bossGroup.add(bossBeam);
    bossBeamRef.current = bossBeam;

    bossGroup.position.set(0, 0, -55);
    scene.add(bossGroup);

    // 11. PvP Opponents Ships Group (PvP Arena Mode)
    const pvpShipsGroup = new THREE.Group();
    pvpShipsGroupRef.current = pvpShipsGroup;

    pvpOpponents.forEach((opp, i) => {
      const oppGroup = new THREE.Group();
      oppGroup.name = opp.id;

      const oppGeo = new THREE.ConeGeometry(3, 12, 6);
      oppGeo.rotateX(Math.PI / 2);
      const oppMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x0284c7 : i === 1 ? 0xc084fc : 0xeab308,
        metalness: 0.8
      });
      const oppMesh = new THREE.Mesh(oppGeo, oppMat);
      oppGroup.add(oppMesh);

      // Rank Ring Aura
      const auraGeo = new THREE.RingGeometry(5, 5.5, 24);
      const auraMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.rotation.x = Math.PI / 2;
      oppGroup.add(aura);

      oppGroup.position.set(opp.position[0], opp.position[1], opp.position[2]);
      pvpShipsGroup.add(oppGroup);
    });

    scene.add(pvpShipsGroup);

    // 12. Lasers & Missiles Containers
    const lasersGroup = new THREE.Group();
    scene.add(lasersGroup);
    lasersGroupRef.current = lasersGroup;

    const missilesGroup = new THREE.Group();
    scene.add(missilesGroup);
    missilesGroupRef.current = missilesGroup;

    // 13. Mining Beam
    const beamGeo = new THREE.CylinderGeometry(0.35, 0.35, 38, 8);
    beamGeo.rotateX(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0 });
    const miningBeam = new THREE.Mesh(beamGeo, beamMat);
    miningBeam.position.set(12, 1, -14);
    scene.add(miningBeam);
    miningBeamRef.current = miningBeam;

    // Mouse drag orbit handling
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !shipGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      shipGroupRef.current.rotation.y += deltaX * 0.005;
      shipGroupRef.current.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Main 3D WebGL Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation for player ship
      if (shipGroupRef.current && !isWarping) {
        shipGroupRef.current.position.y = Math.sin(elapsedTime * 1.6) * 0.9;
        shipGroupRef.current.rotation.z = Math.sin(elapsedTime * 0.9) * 0.06;
      }

      // Rotate Asteroid
      if (asteroidRef.current) {
        asteroidRef.current.rotation.x += 0.006;
        asteroidRef.current.rotation.y += 0.009;
      }

      // Move Pirate Ship
      if (pirateRef.current) {
        pirateRef.current.position.x = -28 + Math.sin(elapsedTime * 1.2) * 12;
        pirateRef.current.rotation.y = Math.sin(elapsedTime * 0.6) * 0.3;
      }

      // Animate Boss Titan Leviathan
      if (bossGroupRef.current) {
        bossGroupRef.current.rotation.y = elapsedTime * 0.15;
        bossGroupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 2;
      }

      // Animate PvP Ships
      if (pvpShipsGroupRef.current) {
        pvpShipsGroupRef.current.children.forEach((oppGroup, idx) => {
          oppGroup.position.x += Math.sin(elapsedTime + idx) * 0.05;
          oppGroup.position.y += Math.cos(elapsedTime * 1.5 + idx) * 0.03;
          oppGroup.rotation.y += 0.01;
        });
      }

      // Move Homing Missiles
      if (missilesGroupRef.current) {
        missilesGroupRef.current.children.forEach((m) => {
          m.position.z -= 1.8;
        });
      }

      // Rotate starfield slowly
      starField.rotation.y = elapsedTime * 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentSystem.name, gameMode]);

  // Execute MicroWarp Jump
  const handleWarp = () => {
    setIsWarping(true);
    playSFX('warp');
    if (warpParticlesRef.current) {
      (warpParticlesRef.current.material as THREE.PointsMaterial).opacity = 0.95;
    }
    setCombatLog((prev) => [
      `[WARP DRIVE] MicroWarpDrive engaged to ${currentSystem.name} Sector Grid...`,
      ...prev
    ]);

    setTimeout(() => {
      setIsWarping(false);
      if (warpParticlesRef.current) {
        (warpParticlesRef.current.material as THREE.PointsMaterial).opacity = 0;
      }
      setCombatLog((prev) => [`[WARP COMPLETE] Exit warp gate into combat grid!`, ...prev]);
    }, 2800);
  };

  // Fire Dual High-DPS Neutron Lasers
  const handleFireLasers = () => {
    if (isWarping) return;
    setIsFiringLasers(true);
    playSFX('laser');

    if (lasersGroupRef.current && shipGroupRef.current) {
      const laserGeo = new THREE.CylinderGeometry(0.18, 0.18, 14, 6);
      laserGeo.rotateX(Math.PI / 2);
      const laserMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const l1 = new THREE.Mesh(laserGeo, laserMat);
      l1.position.set(-3.2, 0, -12);
      const l2 = l1.clone();
      l2.position.set(3.2, 0, -12);

      lasersGroupRef.current.add(l1);
      lasersGroupRef.current.add(l2);

      setTimeout(() => {
        if (lasersGroupRef.current) lasersGroupRef.current.clear();
        setIsFiringLasers(false);
      }, 350);
    }

    // Calculate Damage according to mode target
    if (gameMode === 'mining_pve' && targetLockType === 'Pirate Raider') {
      const dmg = Math.floor(Math.random() * 180) + currentShip.laserDPS;
      const newHp = Math.max(0, pirateHp - dmg);
      setPirateHp(newHp);
      addDamageText(`-${dmg}`, '#38bdf8');
      setCombatLog((prev) => [
        `[PVE COMBAT] Lasers hit Pirate Raider for ${dmg} thermal damage!`,
        ...prev
      ]);

      if (newHp === 0) {
        playSFX('explosion');
        onDefeatPirate(1500); // 1,500 AETH Bounty
        setCombatLog((prev) => [
          `💥 [PIRATE DESTROYED] Target neutralized! Claimed 1,500 AETH ($15.00 USD) bounty!`,
          ...prev
        ]);
        setTargetLockType('Asteroid');
        setPirateHp(100);
      }
    } else if (gameMode === 'boss_raid') {
      const dmg = Math.floor(Math.random() * 850) + currentShip.laserDPS * 2;
      onAttackBoss(dmg);
      addDamageText(`-${dmg} CRIT`, '#f43f5e');
      setCombatLog((prev) => [
        `🔥 [BOSS RAID] Lasers blasted TITAN LEVIATHAN for ${dmg} damage!`,
        ...prev
      ]);

      // Boss Counter-Attack Ray
      if (Math.random() > 0.5) {
        setTimeout(() => {
          playSFX('shield');
          if (bossBeamRef.current) {
            (bossBeamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8;
            setTimeout(() => {
              if (bossBeamRef.current) (bossBeamRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
            }, 300);
          }
          const bossDmg = Math.floor(Math.random() * 300) + 200;
          setShieldState((prev) => Math.max(0, prev - bossDmg));
          addDamageText(`SHIELD TAKEN -${bossDmg}`, '#eab308');
        }, 400);
      }
    } else if (gameMode === 'pvp_dogfight') {
      const targetOpponent = pvpOpponents.find((p) => p.id === selectedPvpTargetId) || pvpOpponents[0];
      const dmg = Math.floor(Math.random() * 450) + currentShip.laserDPS;
      addDamageText(`-${dmg} PvP`, '#a855f7');

      setCombatLog((prev) => [
        `⚔️ [PVP DOGFIGHT] Scored direct hit on ${targetOpponent.name} (${targetOpponent.rankTitle}) for ${dmg} damage!`,
        ...prev
      ]);

      // Check if PvP Opponent is neutralized
      if (targetOpponent.health - dmg <= 0) {
        playSFX('explosion');
        onDefeatPvPOpponent(targetOpponent.id, targetOpponent.bountyAeth);
        setCombatLog((prev) => [
          `🏆 [PVP VICTORY] Defeated ${targetOpponent.name}! Looted ${targetOpponent.bountyAeth} AETH ($${(targetOpponent.bountyAeth * 0.01).toFixed(2)} USD)!`,
          ...prev
        ]);
      }
    }
  };

  // Launch Guided Plasma Homing Missiles
  const handleFireMissiles = () => {
    if (isWarping) return;
    setIsFiringMissile(true);
    playSFX('missile');

    if (missilesGroupRef.current && shipGroupRef.current) {
      const misGeo = new THREE.ConeGeometry(0.5, 3, 8);
      misGeo.rotateX(Math.PI / 2);
      const misMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const m1 = new THREE.Mesh(misGeo, misMat);
      m1.position.set(0, -1, -6);
      missilesGroupRef.current.add(m1);

      setTimeout(() => {
        if (missilesGroupRef.current) missilesGroupRef.current.clear();
        setIsFiringMissile(false);
      }, 800);
    }

    const missileDmg = Math.floor(Math.random() * 1200) + 1500;
    addDamageText(`🚀 MISSILE -${missileDmg}`, '#f43f5e');

    if (gameMode === 'boss_raid') {
      onAttackBoss(missileDmg);
      setCombatLog((prev) => [
        `🚀 [MISSILE HIT] Plasma Homing Missile blasted TITAN LEVIATHAN for ${missileDmg} damage!`,
        ...prev
      ]);
    } else if (gameMode === 'pvp_dogfight') {
      const targetOpponent = pvpOpponents.find((p) => p.id === selectedPvpTargetId) || pvpOpponents[0];
      setCombatLog((prev) => [
        `🚀 [PVP MISSILE] Plasma Torpedo lock-on hit ${targetOpponent.name} for ${missileDmg} heavy shield damage!`,
        ...prev
      ]);
      if (targetOpponent.health - missileDmg <= 0) {
        playSFX('explosion');
        onDefeatPvPOpponent(targetOpponent.id, targetOpponent.bountyAeth);
      }
    }
  };

  // Flight Pitch / Yaw Steering
  const handleRotateShip = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (!shipGroupRef.current) return;
    if (dir === 'UP') shipGroupRef.current.rotation.x -= 0.12;
    if (dir === 'DOWN') shipGroupRef.current.rotation.x += 0.12;
    if (dir === 'LEFT') shipGroupRef.current.rotation.y -= 0.12;
    if (dir === 'RIGHT') shipGroupRef.current.rotation.y += 0.12;
  };

  const rotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startContinuousRotate = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    handleRotateShip(dir);
    if (rotateIntervalRef.current) clearInterval(rotateIntervalRef.current);
    rotateIntervalRef.current = setInterval(() => {
      handleRotateShip(dir);
    }, 100);
  };

  const stopContinuousRotate = () => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
      rotateIntervalRef.current = null;
    }
  };

  // Mine Asteroid for Ore
  const handleMine = () => {
    if (isWarping) return;
    setIsMining(true);
    playSFX('shield');
    if (miningBeamRef.current) {
      (miningBeamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.9;
    }

    const oreMined = Math.floor(Math.random() * 95) + currentShip.miningRate;
    onMineOre(oreMined);

    setCombatLog((prev) => [
      `⛏️ [DEEP CORE MINING] Extracted ${oreMined} units of ${currentSystem.asteroidOre} Ore!`,
      ...prev
    ]);

    setTimeout(() => {
      setIsMining(false);
      if (miningBeamRef.current) {
        (miningBeamRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }, 1200);
  };

  return (
    <div className="space-y-4">
      
      {/* Game Mode Sub-Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setGameMode('mining_pve')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              gameMode === 'mining_pve'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>⛏️ PvE Asteroid Mining</span>
          </button>

          <button
            onClick={() => setGameMode('planet_gta_sim')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              gameMode === 'planet_gta_sim'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-950 text-emerald-400 hover:text-white border border-emerald-800/60'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>🌐 Planet Sims & GTA Open World</span>
          </button>

          <button
            onClick={() => setGameMode('pvp_dogfight')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              gameMode === 'pvp_dogfight'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>⚔️ 3D PvP Arena Dogfight</span>
          </button>

          <button
            onClick={() => setGameMode('boss_raid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              gameMode === 'boss_raid'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Skull className="w-4 h-4" />
            <span>👾 World Raid Titan Boss ($500 USD Bounty)</span>
          </button>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-xl border text-xs font-bold cursor-pointer flex items-center gap-2 ${
            soundEnabled ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-950 text-slate-500 border-slate-800'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>SFX AUDIO: {soundEnabled ? 'ON' : 'MUTED'}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative w-full h-[560px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl font-mono">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Damage Numbers Popups */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          {floatingDamage.map((d) => (
            <div
              key={d.id}
              className="text-xl font-black animate-bounce tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
              style={{ color: d.color }}
            >
              {d.text}
            </div>
          ))}
        </div>

        {/* Top HUD Overlay */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          
          {/* Player Ship Status */}
          <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-2xl pointer-events-auto shadow-lg space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Rocket className="w-4 h-4 text-cyan-400" />
                {currentShip.name}
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                {currentShip.classType}
              </span>
            </div>

            {/* Shields Bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                <span>SHIELDS</span>
                <span>{shieldState} / {currentShip.maxShields} HP</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${(shieldState / currentShip.maxShields) * 100}%` }}
                />
              </div>
            </div>

            {/* Hull Bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                <span>HULL INTEGRITY</span>
                <span>{hullState}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${hullState}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mode Specific Dynamic Target HUD */}
          {gameMode === 'boss_raid' && (
            <div className="bg-slate-950/95 backdrop-blur-md border-2 border-rose-500 p-4 rounded-2xl pointer-events-auto shadow-2xl min-w-[320px] max-w-md w-full">
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="text-rose-400 font-extrabold flex items-center gap-1.5">
                  <Skull className="w-4 h-4 text-rose-500 animate-pulse" />
                  {bossRaid.name}
                </span>
                <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-bold">
                  PHASE {bossRaid.phase}
                </span>
              </div>

              {/* Boss Health Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-300">
                  <span>BOSS HEALTH</span>
                  <span className="text-rose-400 font-bold">{bossRaid.health.toLocaleString()} / {bossRaid.maxHealth.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-rose-900">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${(bossRaid.health / bossRaid.maxHealth) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mt-2 pt-2 border-t border-slate-800">
                <span>CASHOUT REWARD: {bossRaid.bountyAeth.toLocaleString()} AETH</span>
                <span className="text-emerald-400">${bossRaid.bountyUSD.toFixed(2)} USD</span>
              </div>
            </div>
          )}

          {gameMode === 'pvp_dogfight' && (
            <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/50 p-3.5 rounded-2xl pointer-events-auto shadow-lg min-w-[280px]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <Swords className="w-4 h-4" />
                  PVP TARGET PILOTS
                </span>
                <span className="text-[10px] text-amber-400 font-bold">LIVE ARENA</span>
              </div>

              <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {pvpOpponents.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPvpTargetId(p.id)}
                    className={`w-full p-2 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                      selectedPvpTargetId === p.id
                        ? 'bg-purple-950 border border-purple-500 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white text-[11px]">{p.name}</div>
                      <div className="text-[9px] text-purple-300">{p.rankTitle} • Rating: {p.pvpRating}</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">{p.bountyAeth} AETH</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Control Actions Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
          
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl">
            {/* Touch Flight Controls D-Pad */}
            <div className="flex items-center gap-1 border-r border-slate-800 pr-2 mr-1">
              <button
                onMouseDown={() => startContinuousRotate('UP')}
                onMouseUp={stopContinuousRotate}
                onMouseLeave={stopContinuousRotate}
                onTouchStart={(e) => { e.preventDefault(); startContinuousRotate('UP'); }}
                onTouchEnd={stopContinuousRotate}
                onTouchCancel={stopContinuousRotate}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer touch-none"
                title="Pitch Up"
              >
                ▲
              </button>
              <button
                onMouseDown={() => startContinuousRotate('DOWN')}
                onMouseUp={stopContinuousRotate}
                onMouseLeave={stopContinuousRotate}
                onTouchStart={(e) => { e.preventDefault(); startContinuousRotate('DOWN'); }}
                onTouchEnd={stopContinuousRotate}
                onTouchCancel={stopContinuousRotate}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer touch-none"
                title="Pitch Down"
              >
                ▼
              </button>
              <button
                onMouseDown={() => startContinuousRotate('LEFT')}
                onMouseUp={stopContinuousRotate}
                onMouseLeave={stopContinuousRotate}
                onTouchStart={(e) => { e.preventDefault(); startContinuousRotate('LEFT'); }}
                onTouchEnd={stopContinuousRotate}
                onTouchCancel={stopContinuousRotate}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer touch-none"
                title="Yaw Left"
              >
                ◄
              </button>
              <button
                onMouseDown={() => startContinuousRotate('RIGHT')}
                onMouseUp={stopContinuousRotate}
                onMouseLeave={stopContinuousRotate}
                onTouchStart={(e) => { e.preventDefault(); startContinuousRotate('RIGHT'); }}
                onTouchEnd={stopContinuousRotate}
                onTouchCancel={stopContinuousRotate}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 active:bg-cyan-500 text-white font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer touch-none"
                title="Yaw Right"
              >
                ►
              </button>
            </div>

            <button
              onClick={handleFireLasers}
              disabled={isWarping}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>DUAL LASERS</span>
            </button>

            <button
              onClick={handleFireMissiles}
              disabled={isWarping}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 active:scale-95 text-white font-black text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>PLASMA MISSILE</span>
            </button>

            {gameMode === 'mining_pve' && (
              <button
                onClick={handleMine}
                disabled={isWarping}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <Shield className="w-4 h-4 fill-slate-950" />
                <span>MINE ORE</span>
              </button>
            )}

            <button
              onClick={handleWarp}
              disabled={isWarping}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Compass className={`w-4 h-4 ${isWarping ? 'animate-spin' : ''}`} />
              <span>{isWarping ? 'WARPING...' : 'WARP JUMP'}</span>
            </button>
          </div>

          {/* Combat Log */}
          <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 p-2.5 rounded-2xl text-[11px] text-slate-300 max-w-md w-full h-20 overflow-y-auto pointer-events-auto leading-tight space-y-1 shadow-lg">
            {combatLog.map((log, idx) => (
              <div key={idx} className={idx === 0 ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                {log}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
