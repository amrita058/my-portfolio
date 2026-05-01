import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Design1() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePlanet, setActivePlanet] = useState<number>(-1);

  useEffect(() => {
    const cameraTarget = new THREE.Vector3(); // where camera should look
    const cameraPosition = new THREE.Vector3(); // where camera should move to

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let targetOffset = 0; // where we want to reach

    const onCanvasClick = (e: MouseEvent) => {
      console.log("clicked event called", e);
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(planetsMeshes);

      if (hits.length > 0) {
        const clickedIndex = planetsMeshes.indexOf(hits[0].object as any);
        const frontAngle = Math.PI / 2;

        // How far clicked planet is from front
        const diff = frontAngle - orbitAngles[clickedIndex];
        targetOffset += diff; // accumulate into target
      }
    };

    canvas.addEventListener("click", onCanvasClick);
  }, []);

  return (
    <>
      <canvas className="threejs" ref={canvasRef} />;
    </>
  );
}

export default Design1;