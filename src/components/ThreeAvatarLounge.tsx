import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { UserAvatarState, LoungePlayer, AvatarFashionItem } from '../types';
import { MessageSquare, Sparkles, Music, UserCheck, Flame, Send, Heart, Radio } from 'lucide-react';

interface ThreeAvatarLoungeProps {
  userAvatar: UserAvatarState;
  equippedItems: AvatarFashionItem[];
  otherPlayers: LoungePlayer[];
  onSendMessage: (msg: string) => void;
}

export const ThreeAvatarLounge: React.FC<ThreeAvatarLoungeProps> = ({
  userAvatar,
  equippedItems,
  otherPlayers,
  onSendMessage
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDance, setActiveDance] = useState<string>(userAvatar.equippedPose);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Aria Eclipse', text: '🔥 Drop the bass! The 3D Lounge is lit tonight!', time: '2m ago' },
    { sender: 'Cypher Kai', text: 'Who wants to trade titanium blueprints for AETH credits?', time: '1m ago' }
  ]);

  const avatarMeshRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a16);
    scene.fog = new THREE.FogExp2(0x0a0a16, 0.02);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 3, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Neon Spotlight for DJ Stage
    const djSpotlight = new THREE.SpotLight(0x06b6d4, 8);
    djSpotlight.position.set(0, 20, -5);
    djSpotlight.angle = Math.PI / 4;
    djSpotlight.penumbra = 0.5;
    scene.add(djSpotlight);

    const pinkSpotlight = new THREE.SpotLight(0xec4899, 8);
    pinkSpotlight.position.set(-10, 15, 5);
    scene.add(pinkSpotlight);

    // 5. Grid Floor (Club Floor)
    const floorGeo = new THREE.PlaneGeometry(60, 60, 20, 20);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    scene.add(floorMesh);

    // Glowing Neon Floor Grid Lines
    const gridHelper = new THREE.GridHelper(60, 30, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 6. DJ Stage Platform
    const stageGeo = new THREE.CylinderGeometry(8, 9, 1.2, 32);
    const stageMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, metalness: 0.9, roughness: 0.2 });
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.position.set(0, 0.6, -10);
    scene.add(stage);

    // DJ Booth Console
    const djDeskGeo = new THREE.BoxGeometry(6, 2.5, 2);
    const djDeskMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0369a1, roughness: 0.3 });
    const djDesk = new THREE.Mesh(djDeskGeo, djDeskMat);
    djDesk.position.set(0, 2.4, -10);
    scene.add(djDesk);

    // 7. Player Avatar Group Model
    const playerGroup = new THREE.Group();
    avatarMeshRef.current = playerGroup;

    // Body Torso
    const torsoGeo = new THREE.CylinderGeometry(1.2, 0.8, 4, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.3,
      metalness: 0.6
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 3;
    playerGroup.add(torso);

    // Head
    const headGeo = new THREE.SphereGeometry(1.1, 24, 24);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 5.8;
    playerGroup.add(head);

    // Visor / Helmet (if equipped)
    const visorGeo = new THREE.BoxGeometry(1.8, 0.6, 1.2);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 5.9, 0.6);
    playerGroup.add(visor);

    // Cyber Wings FX (if active)
    const wingLGeo = new THREE.BufferGeometry();
    const wingMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide });
    const wingL = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), wingMat);
    wingL.position.set(-2, 4.5, -0.5);
    wingL.rotation.y = 0.5;
    playerGroup.add(wingL);
    const wingR = wingL.clone();
    wingR.position.set(2, 4.5, -0.5);
    wingR.rotation.y = -0.5;
    playerGroup.add(wingR);

    playerGroup.position.set(0, 0, 2);
    scene.add(playerGroup);

    // 8. Add Other Online Avatars in Lounge
    otherPlayers.forEach((p) => {
      const pGroup = new THREE.Group();
      const pTorso = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 0.7, 3.8, 12),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(p.outfitColor) })
      );
      pTorso.position.y = 2.9;
      pGroup.add(pTorso);

      const pHead = new THREE.Mesh(
        new THREE.SphereGeometry(1, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
      );
      pHead.position.y = 5.4;
      pGroup.add(pHead);

      pGroup.position.set(p.position[0] * 5, p.position[1], p.position[2] * 5);
      scene.add(pGroup);
    });

    // Mouse Controls
    let isDragging = false;
    let prevX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      scene.rotation.y += dx * 0.005;
      prevX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Dance & Pose Animations
      if (avatarMeshRef.current) {
        if (activeDance === 'Breakdancing' || activeDance === 'DJing') {
          avatarMeshRef.current.rotation.y = Math.sin(t * 3) * 0.4;
          avatarMeshRef.current.position.y = Math.abs(Math.sin(t * 4)) * 0.8;
        } else if (activeDance === 'Floating') {
          avatarMeshRef.current.position.y = 1.5 + Math.sin(t * 2) * 0.5;
        } else {
          avatarMeshRef.current.position.y = 0;
          avatarMeshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
        }
      }

      // Rotate Stage Lights
      djSpotlight.position.x = Math.sin(t * 1.5) * 12;
      pinkSpotlight.position.z = Math.cos(t * 1.5) * 12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeDance, otherPlayers]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLog((prev) => [
      { sender: userAvatar.name, text: chatInput.trim(), time: 'Just now' },
      ...prev
    ]);
    onSendMessage(chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Lounge Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-500/30 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase font-mono">
              3D SOCIAL METAVERSE
            </span>
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              LIVE CLUB STAGE • 342 ONLINE
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Aetheria Cyber Lounge & Club</h2>
          <p className="text-xs text-slate-300">
            Meet avatars, dance on the WebGL 3D stage, order drinks, and trade real exchangeable items!
          </p>
        </div>

        {/* Quick Dance / Emote Trigger Buttons */}
        <div className="flex items-center gap-2">
          {['Standing', 'DJing', 'Breakdancing', 'Floating'].map((pose) => (
            <button
              key={pose}
              onClick={() => setActiveDance(pose)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeDance === pose
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {pose === 'DJing' ? '🎧 DJ' : pose === 'Breakdancing' ? '💃 Dance' : pose === 'Floating' ? '🪽 Float' : '🧍 Stand'}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Lounge Canvas + Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D WebGL Lounge Canvas */}
        <div className="lg:col-span-2 relative h-[480px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Player Name Tag Overhead */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-slate-950 text-sm">
              👑
            </div>
            <div>
              <h4 className="font-bold text-white text-xs font-mono">{userAvatar.name}</h4>
              <p className="text-[10px] text-cyan-400 font-mono">{userAvatar.title}</p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
            🖱️ Drag canvas to rotate lounge camera
          </div>
        </div>

        {/* Live Lounge Social Chat Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between h-[480px] font-mono shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> LOUNGE CHAT
              </h3>
              <span className="text-[10px] text-slate-400">Jita System Relay</span>
            </div>

            {/* Chat Log List */}
            <div className="space-y-3 h-[330px] overflow-y-auto pr-1">
              {chatLog.map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-cyan-400">{c.sender}</span>
                    <span className="text-slate-500">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-800">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send message to 3D Lounge..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
