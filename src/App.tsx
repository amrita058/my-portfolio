import { useState } from "react";
import CanvasApp from "./CanvasApp";
import Sidebar from "./components/Navbar";
import { Layout } from "./components/Layout";
import SceneDescription from "./components/SceneDescription";

export default function App() {
  const [activePlanet, setActivePlanet] = useState<number>(-1);
  const [page, setPage] = useState("home");

  console.log("active planet her", activePlanet);

  return (
    <>
      <Layout page={page} />

      <Sidebar page={page} setPage={setPage} />

      <CanvasApp setActivePlanet={setActivePlanet} />

      {activePlanet >= 0 && (
        <SceneDescription
          isVisible={page === "home"}
          activePlanet={activePlanet}
          onClick={setPage}
        />
      )}
      <SceneDescription
        isVisible={page === "home"}
        activePlanet={activePlanet}
        onClick={setPage}
      />
    </>
  );
}
