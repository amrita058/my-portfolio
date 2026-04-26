import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Controls {
  camera: THREE.Camera;
  orbitControls: OrbitControls;

  constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.camera = camera;
    this.orbitControls = new OrbitControls(camera, renderer.domElement);

    // Vertical rotation limits (polar angle = up/down)
    this.orbitControls.minPolarAngle = Math.PI * 0.2; // can't go too far overhead
    this.orbitControls.maxPolarAngle = Math.PI * 0.8; // can't go below the plane

    // Zoom limits
    this.orbitControls.minDistance = 10; // can't zoom in closer than this
    this.orbitControls.maxDistance = 20; // can't zoom out further than this

    this.update();
  }

  update() {
    this.orbitControls.update();
  }
}
