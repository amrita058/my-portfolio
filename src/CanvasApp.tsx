import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import PortfolioMainScene from "./three/portfolioMainScene";

export default function CanvasApp({
  setActivePlanet,
}: {
  setActivePlanet: Dispatch<SetStateAction<number>>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<PortfolioMainScene | null>(null);

  // init once
  useEffect(() => {
    if (!canvasRef.current) return;

    appRef.current = new PortfolioMainScene(canvasRef.current, setActivePlanet);

    return () => {
      appRef.current?.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="threejs" />;
}
