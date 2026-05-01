import * as THREE from "three";

export function buildStars(count: number, rMin: number, rMax: number) {
  const geo = new THREE.BufferGeometry();
  const pos = [],
    col = [];
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin);
    const t = Math.random() * Math.PI * 2;
    const p = (Math.random() - 0.5) * Math.PI;
    pos.push(
      r * Math.cos(p) * Math.cos(t),
      r * Math.sin(p),
      r * Math.cos(p) * Math.sin(t),
    );
    const w = Math.random();
    col.push(1, 0.85 + w * 0.15, 0.7 + w * 0.3);
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
    }),
  );
}

function createDustTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export function buildDust(count: number) {
  const pos = [],
    col = [];
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * 12;
    pos.push(r * Math.cos(a), (Math.random() - 0.5) * 0.9, r * Math.sin(a));
    const h = Math.random();
    col.push(0.3 + h * 0.2, 0.3 + h * 0.3, 0.6 + h * 0.4);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));

  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      opacity: 0.6,
      transparent: true,
      vertexColors: true,
      map: createDustTexture(),

      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    }),
  );
}
