import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createBlueprintIcon(size) {
  const png = new PNG({ width: size, height: size });

  const bgR = 2, bgG = 6, bgB = 23; // #020617 dark slate background
  const cyanR = 6, cyanG = 182, cyanB = 212; // #06b6d4 cyan
  const whiteR = 255, whiteG = 255, whiteB = 255;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;

      // Distance from center
      const cx = size / 2;
      const cy = size / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxR = size * 0.46;

      // Background
      let r = bgR;
      let g = bgG;
      let b = bgB;
      let a = 255;

      // Outer rounded circle container
      if (dist <= maxR) {
        // Dark blueprint background
        r = 15;
        g = 23;
        b = 42;

        // Blueprint Grid lines (every 16th or 32nd pixel relative to scale)
        const gridStep = Math.round(size / 12);
        if (x % gridStep === 0 || y % gridStep === 0) {
          r = 14;
          g = 116;
          b = 144; // Subtle grid blue
        }

        // Draw blueprint drafting icon: compass / triangle / gear blueprint symbol
        const relX = (x - cx) / (size / 2);
        const relY = (y - cy) / (size / 2);

        // Drafting Compass lines
        const leg1 = Math.abs(relX - relY * 0.5) < 0.05 && relY > -0.5 && relY < 0.4;
        const leg2 = Math.abs(relX + relY * 0.5) < 0.05 && relY > -0.5 && relY < 0.4;
        const arc = Math.abs(Math.sqrt(relX * relX + relY * relY) - 0.35) < 0.04 && relY > -0.2 && relY < 0.3;
        const hinge = Math.sqrt(relX * relX + (relY + 0.45) * (relY + 0.45)) < 0.1;

        if (hinge || leg1 || leg2 || arc) {
          r = cyanR;
          g = cyanG;
          b = cyanB;
        }

        // Inner highlight
        if (Math.abs(dist - maxR) < 2) {
          r = cyanR;
          g = cyanG;
          b = cyanB;
        }
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return PNG.sync.write(png);
}

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating PWA icons...');
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), createBlueprintIcon(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), createBlueprintIcon(512));
fs.writeFileSync(path.join(publicDir, 'maskable-512.png'), createBlueprintIcon(512));

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#020617"/>
  <rect x="32" y="32" width="448" height="448" rx="96" fill="#0f172a" stroke="#06b6d4" stroke-width="8"/>
  <path d="M 64,128 H 448 M 64,256 H 448 M 64,384 H 448 M 128,64 V 448 M 256,64 V 448 M 384,64 V 448" stroke="#0e7490" stroke-width="2" opacity="0.4"/>
  <!-- Compass drafting tool -->
  <circle cx="256" cy="140" r="28" fill="#06b6d4"/>
  <path d="M 256,168 L 160,380 M 256,168 L 352,380" stroke="#06b6d4" stroke-width="20" stroke-linecap="round"/>
  <path d="M 190,300 A 120 120 0 0 0 322,300" fill="none" stroke="#38bdf8" stroke-width="12" stroke-dasharray="8 8"/>
  <circle cx="256" cy="256" r="12" fill="#38bdf8"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
console.log('PWA icons created successfully in /public!');
