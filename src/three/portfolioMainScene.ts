import * as THREE from "three";
import World from "./world";
import Loop from "./loop";
import type { Dispatch, SetStateAction } from "react";
import Controls from "./controls";
import Environment from "./environment";

export default class PortfolioMainScene {
  canvas: HTMLCanvasElement;
  setActivePlanet: Dispatch<SetStateAction<number>>;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  environment: Environment;
  world: World;
  loop: Loop;
  controls: Controls;

  speed = 1;

  constructor(
    canvas: HTMLCanvasElement,
    setActivePlanet: Dispatch<SetStateAction<number>>,
  ) {
    this.canvas = canvas;
    this.setActivePlanet = setActivePlanet;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      30,
    );
    // this.camera.position.set(2, 4, 11); // look slightly from above, like solar system view
    this.camera.position.set(2, 2, 14);
    this.camera.lookAt(2, 2, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.environment = new Environment(this.scene, this.canvas, this.camera);
    this.world = new World(this.environment);

    this.controls = new Controls(this.camera, this.renderer);

    this.loop = new Loop(() => this.update());
    this.loop.start();

    console.log(this.renderer.domElement === this.canvas);

    window.addEventListener("resize", this.onResize);
    canvas.addEventListener("planetChange", this.onPlanetChange);
    // this.canvas.addEventListener("click", this.onClickPlanet);
    // this.canvas.addEventListener("pointerdown", (e) => {
    //   this.environment.onCanvasClick(e);
    // });
  }

  update() {
    //update planet meshes here
    this.world.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Listen for planet changes from the render loop
  onPlanetChange = (e: Event) => {
    console.log("event here", e);
    this.setActivePlanet((e as CustomEvent).detail);
  };

  onClickPlanet = (e: MouseEvent) => {
    // Handle planet click event
    console.log("Planet clicked!", e);
  };

  onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  destroy() {
    this.loop.stop();
    this.renderer.dispose();
    window.removeEventListener("resize", this.onResize);
  }
}
