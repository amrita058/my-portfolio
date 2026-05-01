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
