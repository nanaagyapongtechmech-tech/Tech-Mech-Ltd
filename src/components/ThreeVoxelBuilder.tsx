import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VoxelBlockType, VoxelBlockData, VoxelBlueprint } from '../types';
import { VOXEL_BLOCK_TYPES } from '../data/metaverseData';
import { Box, Layers, Zap, Shield, Plus, Trash2, Download, DollarSign, Sparkles, Save, Eye } from 'lucide-react';

interface ThreeVoxelBuilderProps {
  onSaveBlueprint: (bp: VoxelBlueprint) => void;
}

export const ThreeVoxelBuilder: React.FC<ThreeVoxelBuilderProps> = ({ onSaveBlueprint }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Selected Block Palette state
  const [selectedBlockType, setSelectedBlockType] = useState<VoxelBlockType>(VOXEL_BLOCK_TYPES[0]);
  const [buildMode, setBuildMode] = useState<'place' | 'delete'>('place');

  // Voxel Grid Blocks State
  const [blocks, setBlocks] = useState<VoxelBlockData[]>([
    { x: 0, y: 0, z: 0, typeId: 'block_titanium' },
    { x: 1, y: 0, z: 0, typeId: 'block_titanium' },
    { x: -1, y: 0, z: 0, typeId: 'block_titanium' },
    { x: 0, y: 0, z: 1, typeId: 'block_titanium' },
    { x: 0, y: 0, z: -1, typeId: 'block_titanium' },
    { x: 0, y: 1, z: 0, typeId: 'block_neon_cyan' },
    { x: 0, y: 2, z: 0, typeId: 'block_glass' },
    { x: 0, y: 3, z: 0, typeId: 'block_turret' }
  ]);

  // Blueprint Metadata Form State
  const [blueprintTitle, setBlueprintTitle] = useState('Omega Starbase Core');
  const [blueprintCategory, setBlueprintCategory] = useState<'Space Station' | 'Penthouse Pad' | 'Mining Outpost' | 'Battle Fortress'>('Space Station');
  const [sellingPriceAeth, setSellingPriceAeth] = useState(12000);

  // Three.js internal references
  const blocksGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    camera.position.set(12, 14, 18);
    camera.lookAt(0, 2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 5. Grid Floor Plane
    const gridHelper = new THREE.GridHelper(20, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // 6. Blocks Container
    const blocksGroup = new THREE.Group();
    blocksGroupRef.current = blocksGroup;
    scene.add(blocksGroup);

    // Render current blocks in Three.js group
    const renderVoxelBlocks = () => {
      blocksGroup.clear();

      blocks.forEach((b) => {
        const typeInfo = VOXEL_BLOCK_TYPES.find((t) => t.id === b.typeId) || VOXEL_BLOCK_TYPES[0];
        const geo = new THREE.BoxGeometry(0.96, 0.96, 0.96);
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(typeInfo.color),
          roughness: typeInfo.roughness,
          metalness: 0.5,
          emissive: typeInfo.emissive ? new THREE.Color(typeInfo.color) : new THREE.Color(0x000000),
          emissiveIntensity: typeInfo.emissive ? 0.6 : 0
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(b.x, b.y, b.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { voxelData: b };
        blocksGroup.add(mesh);
      });
    };

    renderVoxelBlocks();

    // Orbit Camera Drag Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      scene.rotation.y += dx * 0.005;
      scene.rotation.x += dy * 0.005;

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [blocks]);

  // Add block to stack top
  const handleAddBlockTop = () => {
    // Find highest block y coordinate
    const maxY = blocks.reduce((max, b) => Math.max(max, b.y), 0);
    const newBlock: VoxelBlockData = {
      x: 0,
      y: maxY + 1,
      z: 0,
      typeId: selectedBlockType.id
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Clear or reset grid
  const handleReset = () => {
    setBlocks([
      { x: 0, y: 0, z: 0, typeId: 'block_titanium' },
      { x: 1, y: 0, z: 0, typeId: 'block_solar' },
      { x: -1, y: 0, z: 0, typeId: 'block_solar' }
    ]);
  };

  // Calculate stats
  const totalPower = blocks.length * 120;
  const totalDefense = blocks.reduce((sum, b) => {
    const t = VOXEL_BLOCK_TYPES.find((type) => type.id === b.typeId);
    return sum + (t?.defenseValue || 10);
  }, 0);
  const estimatedValUSD = (blocks.length * 15).toFixed(2);

  // Package & Publish Blueprint to Market
  const handleExportBlueprint = () => {
    const newBp: VoxelBlueprint = {
      id: `bp_${Date.now()}`,
      title: blueprintTitle,
      creatorName: 'Captain Nova Vance',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      description: `3D Voxel structure featuring ${blocks.length} custom modules built with high-grade composites.`,
      totalBlocks: blocks.length,
      powerRating: totalPower,
      defenseRating: totalDefense,
      estimatedValueAeth: sellingPriceAeth,
      priceAeth: sellingPriceAeth,
      blocks: [...blocks],
      category: blueprintCategory
    };

    onSaveBlueprint(newBp);
    alert(`🎉 Blueprint "${blueprintTitle}" successfully minted & listed on the Galactic Market for ${sellingPriceAeth} AETH Credits ($${(sellingPriceAeth * 0.01).toFixed(2)} USD)!`);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Builder Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/30 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase">
              MINECRAFT STYLE VOXEL BUILDER
            </span>
            <span className="text-xs text-cyan-400">3D STARBASE & PENTHOUSE ARCHITECT</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">3D Space Station Construction Dock</h2>
          <p className="text-xs text-slate-300">
            Build custom voxel stations & apartments, export blueprints, and sell them for real exchangeable money!
          </p>
        </div>

        {/* Blueprint Packaging Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddBlockTop}
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>PLACE VOXEL BLOCK</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D WebGL Canvas */}
        <div className="lg:col-span-2 relative h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Voxel HUD Stats */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-2xl flex flex-wrap items-center gap-4 text-xs font-mono shadow-xl">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Box className="w-4 h-4" />
              <span>BLOCKS: {blocks.length}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Zap className="w-4 h-4" />
              <span>POWER: {totalPower} MW</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>DEFENSE: {totalDefense} HP</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800 font-mono">
            🖱️ Drag to rotate 3D grid plane
          </div>
        </div>

        {/* Block Palette & Export Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-6 font-mono shadow-2xl">
          
          {/* Palette Selector */}
          <div>
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> SELECT VOXEL MATERIAL
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {VOXEL_BLOCK_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedBlockType(type)}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedBlockType.id === type.id
                      ? 'bg-slate-800 border-cyan-400 shadow-md'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-tight">{type.name}</h4>
                    <span className="text-[10px] text-slate-400">{type.costAeth} AETH</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Blueprint Packaging & Monetization Settings */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> MONETIZE BLUEPRINT
            </h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Blueprint Title</label>
              <input
                type="text"
                value={blueprintTitle}
                onChange={(e) => setBlueprintTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                <select
                  value={blueprintCategory}
                  onChange={(e) => setBlueprintCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Space Station">Space Station</option>
                  <option value="Penthouse Pad">Penthouse Pad</option>
                  <option value="Mining Outpost">Mining Outpost</option>
                  <option value="Battle Fortress">Battle Fortress</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Price (AETH)</label>
                <input
                  type="number"
                  value={sellingPriceAeth}
                  onChange={(e) => setSellingPriceAeth(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Real Exchange Value:</span>
              <span className="font-bold text-emerald-400">${(sellingPriceAeth * 0.01).toFixed(2)} USD</span>
            </div>

            <button
              onClick={handleExportBlueprint}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>MINT & MINT TO GALACTIC MARKET</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
