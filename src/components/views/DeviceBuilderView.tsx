import React, { useState } from 'react';
import { DeviceModel, DeviceNode, DeviceConnection } from '../../types/lab';
import { Layers, Plus, Sparkles, Play, Trash2, ArrowRight } from 'lucide-react';

interface DeviceBuilderViewProps {
  devices: DeviceModel[];
  onAddDevice: (d: DeviceModel) => void;
}

export const DeviceBuilderView: React.FC<DeviceBuilderViewProps> = ({
  devices,
  onAddDevice
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceModel>(devices[0] || {
    id: 'dev-1',
    title: 'Vacuum Energy Transducer Array',
    category: 'Field Electronics',
    description: 'Node-based hardware schematic for zero-point field collection.',
    isSpeculative: true,
    nodes: [
      { id: 'n1', type: 'sensor', name: 'Vacuum Field Sensor', x: 50, y: 100, inputs: [], outputs: ['Signal_Out'], params: {} },
      { id: 'n2', type: 'computing', name: 'UIM Processing Core', x: 260, y: 100, inputs: ['Signal_In'], outputs: ['Cmd_Out'], params: {} },
      { id: 'n3', type: 'field', name: 'Harmonic Emitter', x: 470, y: 100, inputs: ['Cmd_In'], outputs: ['Field_Out'], params: {} }
    ],
    connections: [
      { id: 'c1', fromId: 'n1', fromPort: 'Signal_Out', toId: 'n2', toPort: 'Signal_In', flowType: 'data' },
      { id: 'c2', fromId: 'n2', fromPort: 'Cmd_Out', toId: 'n3', toPort: 'Cmd_In', flowType: 'control' }
    ]
  });

  const handleAddNode = (type: DeviceNode['type']) => {
    const newNode: DeviceNode = {
      id: 'n-' + Date.now(),
      type,
      name: `New ${type.toUpperCase()} Component`,
      x: 100 + Math.random() * 200,
      y: 150 + Math.random() * 100,
      inputs: ['In_Port'],
      outputs: ['Out_Port'],
      params: {}
    };

    setSelectedDevice({
      ...selectedDevice,
      nodes: [...selectedDevice.nodes, newNode]
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            DEVICE BUILDER • NODE-BASED HARDWARE SCHEMATIC CANVAS
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">{selectedDevice.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect energy, data, field generators, materials, sensors, and control flows in an interactive visual canvas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddNode('sensor')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" /> Sensor
          </button>
          <button
            onClick={() => handleAddNode('computing')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" /> Computing Core
          </button>
          <button
            onClick={() => handleAddNode('field')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" /> Field Emitter
          </button>
        </div>
      </div>

      {/* Schematic Canvas */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-slate-300">INTERACTIVE HARDWARE CANVAS ({selectedDevice.nodes.length} COMPONENTS)</span>
          <span className="text-cyan-400">STATUS: SCHEMATIC VALID</span>
        </div>

        <div className="h-96 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden p-6 custom-scrollbar">
          {/* Render Nodes */}
          {selectedDevice.nodes.map((node) => (
            <div
              key={node.id}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              className="absolute p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 shadow-lg min-w-[160px] space-y-2 cursor-pointer hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center justify-between font-mono">
                <span className="text-[10px] uppercase font-bold text-cyan-400">{node.type}</span>
                <button
                  onClick={() => setSelectedDevice({
                    ...selectedDevice,
                    nodes: selectedDevice.nodes.filter(n => n.id !== node.id)
                  })}
                  className="text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs font-bold">{node.name}</div>

              {/* Ports */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                <span>In: {node.inputs.join(', ') || 'None'}</span>
                <span>Out: {node.outputs.join(', ') || 'None'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
