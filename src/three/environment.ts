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
  ORBIT_SPEED = 0.001;
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
    // this.loadExampleMesh();
    this.loadOrbitGuideRing();
    this.initializeOrbitAngles();

    this.planetsMeshes = this.initializeMeshes();
  }

  loadLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    const sunDirectionalLight = new THREE.DirectionalLight(0xfff5ee, 2.0);
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
    // const axes = new THREE.AxesHelper();

    const stBg = buildStars(3000, 40, 160);
    const stNr = buildStars(600, 16, 40);
    const dust = buildDust(1500);

    // this.scene.background = new THREE.Color(0x03030f); // subtle purple-black
    // this.scene.background = new THREE.Color(0x030310); // a bit more blue tint
    // this.scene.background = new THREE.Color(0x07030f); // a touch more purple
    this.scene.background = new THREE.Color(0x120822);
    // this.scene.background = new THREE.Color(0xcbc3e3); //very light purple

    this.scene.fog = new THREE.FogExp2(new THREE.Color(0x0b0b38), 0.008);
    // const loader = new HDRLoader();
    // loader.load("hdr.hdr", (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   this.scene.environment = texture;
    // });

    this.scene.add(stBg, stNr, dust);
  }

  loadOrbitGuideRing() {
    // Orbit guide ring
    const orb = new THREE.Mesh(
      new THREE.RingGeometry(6.93, 7.07, 128),
      new THREE.MeshBasicMaterial({
        color: 0xcbc3e3,
        side: THREE.DoubleSide,
        opacity: 0.08,
        transparent: true,
      }),
    );
    orb.rotation.x = Math.PI / 2;
    orb.position.y = 2;
    this.scene.add(orb);
  }

  loadExampleMesh() {
    const sphereGeometry = new THREE.IcosahedronGeometry(0.3, 3);
    const planetMesh = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({ color: "red" }),
    );
    this.scene.add(planetMesh);
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

      if (planet.ring) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(
            planet.radius / 2 + 0.04,
            planet.radius / 2 + 0.2,
            64,
          ),
          new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.4,
          }),
        );
        ring.rotation.x = Math.PI / 2;
        planetMesh.add(ring);
      }
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

      // // Self-spin: small fixed increment
      planet.rotation.y += 0.09 * data.rotation;

      // // Orbit angle advances independently from mesh rotation
      // orbitAngles[index] += 0.2 * data.rotation; //use this for different speed
      this.orbitAngles[index] += this.ORBIT_SPEED;
      const angle = this.orbitAngles[index] + this.orbitOffset;

      // // SET position around world origin (0,0,0) no wooble
      // planet.position.set(
      //   Math.cos(angle) * data.distance + 1,
      //   2,
      //   Math.sin(angle) * data.distance,
      // );

      //testing
      const t = this.orbitAngles[index];

      const radius = data.distance;
      const wobble = 0.15;

      // base orbit
      planet.position.x = Math.cos(angle) * radius;
      planet.position.z = Math.sin(angle) * radius;

      // floating noise
      planet.position.x += Math.sin(t * 2.0) * wobble;
      planet.position.z += Math.cos(t * 1.7) * wobble;

      // vertical float
      planet.position.y = 2 + Math.sin(t * 2.5) * 0.25;
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
    // const tempMatrix = new THREE.Matrix4();
    const worldPos = new THREE.Vector3();

    let closestIndex = -1;
    let closestZ = Infinity;

    planetsMeshes.forEach((planet, index) => {
      // convert world position → camera space
      worldPos.setFromMatrixPosition(planet.matrixWorld);
      worldPos.applyMatrix4(camera.matrixWorldInverse);

      // ignore behind camera
      if (worldPos.z > 0) return;

      // smaller |z| = closer to camera forward line
      const score = Math.abs(worldPos.x) + Math.abs(worldPos.y);

      if (score < closestZ) {
        closestZ = score;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  onCanvasClick = (e: MouseEvent) => {
    console.log("clicked event called", e);
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    const hits = raycaster.intersectObjects(this.planetsMeshes);

    if (hits.length > 0) {
      const clickedIndex = this.planetsMeshes.indexOf(
        hits[0].object as unknown as THREE.Mesh<
          THREE.IcosahedronGeometry,
          THREE.MeshStandardMaterial,
          THREE.Object3DEventMap
        >,
      );
      const frontAngle = Math.PI / 2;

      // How far clicked planet is from front
      const diff = frontAngle - this.orbitAngles[clickedIndex];
      this.orbitOffset += diff; // accumulate into target
    }
    if (hits.length > 0) {
      console.log("Clicked planet:", hits[0].object);
    }
  };
}
