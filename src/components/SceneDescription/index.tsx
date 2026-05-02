import DiagonalRingTech from "../DiagonalRingCard";
import { AnimatePresence, motion } from "framer-motion";
import HomeSceneCard from "./HomeSceneCard";
import ProjectsSceneCard from "./ProjectsSceneCard";
import ContactSceneCard from "./ContactSceneCard";
import AboutSceneCard from "./AboutSceneCard";

const getActivePlanet = (
  activePlanet: number,
  onClick: (page: string) => void,
) => {
  switch (activePlanet) {
    case 1:
      return <HomeSceneCard />;
    case 2:
      return <AboutSceneCard />;
    case 3:
      return <DiagonalRingTech onClick={onClick} />;
    case 4:
      return <ProjectsSceneCard onClick={onClick} />;
    case 5:
      return <ContactSceneCard />;
    default:
      return <HomeSceneCard />;
  }
};

export default function SceneDescription({
  isVisible,
  activePlanet,
  onClick,
}: {
  isVisible: boolean;
  activePlanet: number;
  onClick: (page: string) => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <div className="absolute z-10 bottom-10 flex">
            <motion.div
              key={activePlanet}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.6, y: 40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {getActivePlanet(activePlanet, onClick)}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
