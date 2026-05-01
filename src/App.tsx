import { useRef, useState } from "react";
import CanvasApp from "./CanvasApp";
import Sidebar from "./components/Navbar";
import { Layout } from "./components/Layout";
import SceneDescription from "./components/SceneDescription";
import Header from "./components/Header";

export default function App() {
  const [activePlanet, setActivePlanet] = useState<number>(-1);
  const [page, setPage] = useState("home");

  console.log("active planet here", activePlanet);

  const isProgrammaticScroll = useRef(false);

  // call this instead of directly setting page
  const onClickNavigator = (id: string) => {
    console.log("here here navigator clicked", id);
    isProgrammaticScroll.current = true;

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setPage(id);

    // unlock after scroll finishes
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700); // match your scroll duration
  };

  return (
    <>
      <Header />

      {page !== "home" && (
        <Layout
          setPage={setPage}
          page={page}
          isProgrammaticScroll={isProgrammaticScroll}
        />
      )}

      <Sidebar page={page} setPage={onClickNavigator} />

      <CanvasApp setActivePlanet={setActivePlanet} />

      {activePlanet >= 0 && (
        <SceneDescription
          isVisible={page === "home"}
          activePlanet={activePlanet}
          onClick={(page) => {
            onClickNavigator(page);
          }}
        />
      )}
      <SceneDescription
        isVisible={page === "home"}
        activePlanet={activePlanet}
        onClick={(page) => {
          onClickNavigator(page);
        }}
      />
    </>
  );
}
