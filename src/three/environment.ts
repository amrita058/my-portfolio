import * as THREE from "three";
import { buildDust, buildStars } from "../utils/helper";
import { PLANETS } from "../data/planets";
import { addMeshMaterialWithTexture } from "../utils/texture";

export default class Environment {
  scene: THREE.Scene;
  planetsMeshes: THREE.Mesh<
    THREE.IcosahedronGeometry,
    THREE.MeshStandardMaterial,
    THREE.Object3DEventMap
  >[];
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  ORBIT_SPEED = 0.002;
  orbitAngles: number[] = [];
  orbitOffset = 0;
  isFollowing = false;
  followIndex = -1;
  activePlanetIndex = -1;

  constructor(
    scene: THREE.Scene,
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
  ) {
    this.scene = scene;
    this.canvas = canvas;
    this.camera = camera;

    this.loadLights();
    this.loadEnvironment();
    this.initializeOrbitAngles();

    this.planetsMeshes = this.initializeMeshes();
  }

  loadLights() {
    // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    // pointLight.position.set(1, 1, 1);
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // const ambientLight = new THREE.AmbientLight(0xffffff);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.18);
    const sunDirectionalLight = new THREE.DirectionalLight(0xfff5ee, 1.3);
    sunDirectionalLight.position.set(18, 10, 12);
    const fillDirectionalLight = new THREE.DirectionalLight(0x334466, 0.35);
    fillDirectionalLight.position.set(-12, -4, -8);
    const pointLight = new THREE.PointLight(0x8866ff, 3, 50);

    this.scene.add(
      ambientLight,
      sunDirectionalLight,
      fillDirectionalLight,
      pointLight,
    );
  }

  loadEnvironment() {
    const axes = new THREE.AxesHelper();

    const stBg = buildStars(3000, 40, 160);
    const stNr = buildStars(600, 16, 40);
    const dust = buildDust(1500);

    this.scene.background = new THREE.Color(0x04040e);
    this.scene.fog = new THREE.FogExp2(0x04040e, 0.028);

    this.scene.add(stBg, stNr, dust, axes);
  }

  initializeMeshes() {
    const sphereGeometry = new THREE.IcosahedronGeometry(0.3, 3);

    return PLANETS.map((planet) => {
      const planetMesh = new THREE.Mesh(
        sphereGeometry,
        addMeshMaterialWithTexture(planet.texture),
      );
      planetMesh.scale.setScalar(planet.radius * 6);

      this.scene.add(planetMesh);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(
          planet.distance - 0.01,
          planet.distance + 0.01,
          64,
        ),
        new THREE.MeshBasicMaterial({
          color: 0x444444,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = Math.PI / 2; // lay flat on XZ plane

      if (planet.ring) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(
            planet.radius / 2 - 0.01,
            planet.radius / 2 + 0.01,
            64,
          ),
          new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
          }),
        );
        ring.rotation.x = Math.PI / 2;
        planetMesh.add(ring);
      }
      this.scene.add(ring);
      return planetMesh;
    });
  }

  initializeOrbitAngles() {
    // Spread planets evenly around the circle from the start
    //return 0 if want all planets to start from same position
    this.orbitAngles = PLANETS.map(
      (_, index) => (index / PLANETS.length) * Math.PI * 2,
    );
  }

  updateMeshes() {
    this.planetsMeshes.forEach((planet, index) => {
      const data = PLANETS[index];
      if (!data) return;

      // Self-spin: small fixed increment
      planet.rotation.y += 0.005 * data.rotation;

      // Orbit angle advances independently from mesh rotation
      // orbitAngles[index] += 0.2 * data.rotation; //use this for different speed
      this.orbitAngles[index] += this.ORBIT_SPEED;
      const angle = this.orbitAngles[index] + this.orbitOffset;

      // SET position around world origin (0,0,0)
      planet.position.set(
        Math.cos(angle) * data.distance,
        0,
        Math.sin(angle) * data.distance,
      );
    });

    const forward = this.getForwardPlanet(this.planetsMeshes, this.camera);
    if (forward !== this.activePlanetIndex) {
      this.activePlanetIndex = forward;
      // Dispatch a custom event so React can re-render
      this.canvas.dispatchEvent(
        new CustomEvent("planetChange", { detail: this.activePlanetIndex }),
      );
    }
  }

  getForwardPlanet = (
    planetsMeshes: THREE.Mesh<
      THREE.IcosahedronGeometry,
      THREE.MeshStandardMaterial,
      THREE.Object3DEventMap
    >[],
    camera: THREE.PerspectiveCamera,
  ) => {
    let closestIndex = -1;
    let closestScore = Infinity;

    planetsMeshes.forEach((planet, index) => {
      // Get world position in camera space
      const worldPos = new THREE.Vector3();
      planet.getWorldPosition(worldPos);

      // Project to screen space (-1 to 1 on both axes)
      const projected = worldPos.clone().project(camera);

      // Only consider planets in front of camera (z < 1)
      if (projected.z > 1) return;

      // Score = distance from screen center (0,0)
      const score = Math.sqrt(projected.x ** 2 + projected.y ** 2);

      if (score < closestScore) {
        closestScore = score;
        closestIndex = index;
      }
    });

    return closestIndex;
  };
}
