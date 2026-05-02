import * as THREE from "three";
import { Pane } from "tweakpane";

export function addBackgroundTexture(path: string) {
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath(path);
  cubeTextureLoader.setPath("public/textures/background/lightStarrySky/");
  const cubeTexture = cubeTextureLoader.load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ]);

  return cubeTexture;
}

const safeLoad = (path: string) => {
  const textureLoader = new THREE.TextureLoader();

  const tex = textureLoader.load(path);

  tex.flipY = false; // important safety for advanced pipelines
  tex.generateMipmaps = true;

  return tex;
};

export function addMeshMaterialWithTexture(
  textureName: string,
  roughness?: number,
  metalness?: number,
  intensity?: number,
  addPane?: boolean,
) {
  const objectTexture = safeLoad(
    `public/textures/mesh/${textureName}-bl/${textureName}_albedo.png`,
  );

  const objectTextureRoughness = safeLoad(
    `public/textures/mesh/${textureName}-bl/${textureName}_roughness.png`,
  );

  const objectTextureMetallic = safeLoad(
    `public/textures/mesh/${textureName}-bl/${textureName}_metallic.png`,
  );

  const objectTextureNormal = safeLoad(
    `public/textures/mesh/${textureName}-bl/${textureName}_normal-ogl.png`,
  );

  const objectTextureAo = safeLoad(
    `public/textures/mesh/${textureName}-bl/${textureName}_ao.png`,
  );

  // const objectTextureHeight = safeLoad(
  //   `public/textures/mesh/${textureName}-bl/${textureName}_height.png`,
  // );

  objectTexture.repeat.set(3, 3);
  objectTexture.wrapS = THREE.RepeatWrapping;
  objectTexture.wrapT = THREE.RepeatWrapping;

  console.log("loaded texture", textureName, metalness, roughness, intensity);

  //initialize the material
  const objectMaterial = new THREE.MeshStandardMaterial({});
  objectMaterial.map = objectTexture;
  objectMaterial.roughnessMap = objectTextureRoughness;
  objectMaterial.roughness = roughness ?? 0.1;
  objectMaterial.metalnessMap = objectTextureMetallic;
  objectMaterial.metalness = metalness ?? 0;
  objectMaterial.normalMap = objectTextureNormal;
  objectMaterial.aoMap = objectTextureAo;
  objectMaterial.aoMapIntensity = 0.7;
  objectMaterial.transparent = false;
  objectMaterial.opacity = 1;
  objectMaterial.alphaMap = null;
  objectMaterial.roughness = 0.4;
  objectMaterial.metalness = 0.1;
  // objectMaterial.displacementMap = objectTextureHeight;
  // objectMaterial.displacementScale = 0.05;

  if (addPane) {
    const pane = new Pane();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pane as any).addBinding(objectTexture, "roughness", {
      min: 0,
      max: 100,
    });
  }

  return objectMaterial;
}

export function createTextTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // text
  ctx.fillStyle = "white";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // repeat X times horizontally, Y times vertically
  texture.repeat.set(3, 4);

  return texture;
}

export function createNoiseTexture() {
  const size = 256;
  const data = new Uint8Array(size * size * 3);

  for (let i = 0; i < size * size * 3; i++) {
    data[i] = Math.random() * 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
  texture.needsUpdate = true;

  return texture;
}

function createPlanetParams(
  text1: string,
  text2: string,
  text3: string,
  color: THREE.Color,
  emissiveColor: THREE.Color,
  emissiveIntensity: number,
  shininess: number,
) {
  // All 9 tile positions in a 3x3 grid
  const allTiles = [
    { tileX: 0, tileY: 0 },
    { tileX: 1, tileY: 0 },
    { tileX: 2, tileY: 0 },
    { tileX: 0, tileY: 1 },
    { tileX: 1, tileY: 1 },
    { tileX: 2, tileY: 1 },
    { tileX: 0, tileY: 2 },
    { tileX: 1, tileY: 2 },
    { tileX: 2, tileY: 2 },
  ];

  // Shuffle and pick 3 — so each planet uses different tile slots
  const shuffled = allTiles.sort(() => Math.random() - 0.5);
  const pickedTiles = shuffled.slice(0, 3);

  return {
    texts: [text1, text2, text3],
    angles: [
      -5 + Math.random() * -15,
      5 + Math.random() * 15,
      -8 + Math.random() * 16,
    ],
    // Store tile assignment + within-tile jitter together
    positions: pickedTiles.map((tile) => ({
      tileX: tile.tileX,
      tileY: tile.tileY,
      jitterX: 0.2 + Math.random() * 0.6,
      jitterY: 0.2 + Math.random() * 0.6,
    })),
    color,
    emissiveColor,
    emissiveIntensity,
    shininess,
  };
}

function createSeamlessPlanetTexture(
  params: ReturnType<typeof createPlanetParams>,
) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Base color
  const { r, g, b } = params.color;
  ctx.fillStyle = `rgb(${Math.floor(r * 180)}, ${Math.floor(g * 180)}, ${Math.floor(b * 180)})`;
  ctx.fillRect(0, 0, size, size);

  // Seamless noise — draw each blob in all 4 "wrapped" positions
  //    so blobs that go off one edge reappear on the opposite edge
  const drawSeamlessBlob = (
    x: number,
    y: number,
    radius: number,
    alpha: number,
  ) => {
    const offsets = [
      { dx: 0, dy: 0 },
      { dx: size, dy: 0 },
      { dx: -size, dy: 0 },
      { dx: 0, dy: size },
      { dx: 0, dy: -size },
      { dx: size, dy: size },
      { dx: -size, dy: -size },
      { dx: size, dy: -size },
      { dx: -size, dy: size },
    ];

    offsets.forEach(({ dx, dy }) => {
      const cx = x + dx;
      const cy = y + dy;

      // Skip if the blob center is too far outside canvas to matter
      if (cx + radius < 0 || cx - radius > size) return;
      if (cy + radius < 0 || cy - radius > size) return;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(0,0,0,${alpha})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    });
  };

  // Draw blobs seamlessly
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 60;
    const alpha = 0.1 + Math.random() * 0.3;

    drawSeamlessBlob(x, y, radius, alpha);
  }

  // 🔹 Also blend the edges with a cross-fade strip to hide any remaining seam
  //    Paint a thin mirrored strip on each edge
  const edgeBlend = 40; // px — width of the blend zone

  // Left edge gets a copy of the right edge content (mirrored)
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.drawImage(
    canvas,
    size - edgeBlend,
    0,
    edgeBlend,
    size,
    0 - edgeBlend,
    0,
    edgeBlend,
    size,
  );
  ctx.drawImage(canvas, 0, 0, edgeBlend, size, size, 0, edgeBlend, size);
  ctx.drawImage(
    canvas,
    0,
    size - edgeBlend,
    size,
    edgeBlend,
    0,
    0 - edgeBlend,
    size,
    edgeBlend,
  );
  ctx.drawImage(canvas, 0, 0, size, edgeBlend, 0, size, size, edgeBlend);
  ctx.restore();

  // 🔹 Draw text labels — keep away from edges to avoid seam cutoff
  const drawRotatedText = (
    text: string,
    x: number,
    y: number,
    angleDeg: number,
    fontSize = 42,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleDeg * Math.PI) / 180);
    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "left";
    ctx.textBaseline = "hanging";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  params.texts.forEach((text, i) => {
    // Each text gets its own tile in the 3x3 grid
    // Tile coords: (tileX, tileY) from 0–2
    const tileAssignments = [
      { tileX: 0, tileY: 0 }, // text1 → top-left tile
      { tileX: 1, tileY: 1 }, // text2 → center tile
      { tileX: 2, tileY: 2 }, // text3 → bottom-right tile
    ];

    const { tileX, tileY } = tileAssignments[i];

    // Position within that tile (with jitter so it's not dead-center every time)
    const withinTileX = 0.2 + Math.random() * 0.6; // 20%–80% within tile
    const withinTileY = 0.2 + Math.random() * 0.6;

    // Convert tile + within-tile position → canvas pixel coords
    // Each tile is (size/3) px wide
    const tileSize = size / 3;
    const x = tileX * tileSize + withinTileX * tileSize;
    const y = tileY * tileSize + withinTileY * tileSize;

    drawRotatedText(text, x, y, params.angles[i]);
  });

  return new THREE.CanvasTexture(canvas);
}

export function createTextTextureMaterial(
  text: string,
  color: THREE.Color,
  emissiveColor: THREE.Color,
  emissiveIntensity: number,

  shininess: number,
) {
  const params = createPlanetParams(
    text,
    text,
    text,
    color,
    emissiveColor,
    emissiveIntensity,
    shininess,
  );

  const textTexture = createSeamlessPlanetTexture(params);

  textTexture.wrapS = THREE.RepeatWrapping; // X direction
  textTexture.wrapT = THREE.RepeatWrapping; // Y direction

  // repeat count
  textTexture.repeat.set(3, 3);

  const material = new THREE.MeshPhongMaterial({
    map: textTexture,
    color: new THREE.Color(color).multiplyScalar(6), //increasing scalar make planet more bright
    emissive: params.emissiveColor,
    emissiveIntensity: params.emissiveIntensity,
    shininess: params.shininess,
  });

  return material;
}
