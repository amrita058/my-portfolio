import Environment from "./environment";

export default class World {
  environment: Environment;

  constructor(environment: Environment) {
    this.environment = environment;
  }

  update() {
    // this.environment.updateMeshes();
  }
}
