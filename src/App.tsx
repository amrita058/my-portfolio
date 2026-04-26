import { useState } from "react";
import CanvasApp from "./CanvasApp";
import { PLANETS } from "./data/planets";

export default function App() {
  const [speed, setSpeed] = useState(1);
  const [activePlanet, setActivePlanet] = useState<number>(-1);

  console.log("active planet her", speed, activePlanet);

  return (
    <>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <button onClick={() => setSpeed((s) => s + 0.5)}>Faster</button>
        <button onClick={() => setSpeed((s) => s - 0.5)}>Slower</button>
      </div>

      <CanvasApp setActivePlanet={setActivePlanet} />

      {activePlanet >= 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "16px 24px",
            borderRadius: 12,
            textAlign: "center",
            pointerEvents: "none", // don't block orbit controls
            backdropFilter: "blur(8px)",
          }}
        >
          <h2>{PLANETS[activePlanet].name}</h2>
          <p>{PLANETS[activePlanet].description}</p>
        </div>
      )}
    </>
  );
}
