import React, { useState, useEffect, useRef } from 'react';
import { Zap, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const FractalLabView: React.FC = () => {
  const [zoom, setZoom] = useState<number>(1.0);
  const [maxIter, setMaxIter] = useState<number>(50);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let zx = (x - width / 2) / (0.3 * zoom * width);
        let zy = (y - height / 2) / (0.3 * zoom * height);
        let cx = zx;
        let cy = zy;

        let iter = 0;
        while (zx * zx + zy * zy < 4 && iter < maxIter) {
          let tmp = zx * zx - zy * zy + cx - 0.7;
          zy = 2 * zx * zy + cy + 0.27015;
          zx = tmp;
          iter++;
        }

        const pIdx = (y * width + x) * 4;
        if (iter === maxIter) {
          data[pIdx] = 2;
          data[pIdx + 1] = 6;
          data[pIdx + 2] = 23;
          data[pIdx + 3] = 255;
        } else {
          data[pIdx] = (iter * 12) % 255;
          data[pIdx + 1] = (iter * 18) % 255;
          data[pIdx + 2] = 240;
          data[pIdx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [zoom, maxIter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            RECURSION & FRACTAL LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Infinite Self-Similarity & Complex Iteration</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore Mandelbrot, Julia sets, recursive trees, and self-referential mathematical fractals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => z * 1.5)} className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoom(z => Math.max(0.5, z / 1.5))} className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={() => setZoom(1.0)} className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"><RotateCcw className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex justify-center items-center">
        <canvas ref={canvasRef} width={500} height={320} className="rounded-xl border border-slate-800 w-full max-w-2xl h-80 object-cover" />
      </div>
    </div>
  );
};
