import DiagonalRingTech from "../DiagonalRingCard";
import Header from "../Header";
import { AnimatePresence, motion } from "framer-motion";

const getActivePlanet = (
  activePlanet: number,
  onClick: (page: string) => void,
) => {
  switch (activePlanet) {
    case 1:
      return <DiagonalRingTech onClick={onClick} />;
    case 2:
      return <div className="text-2xl text-white">hi there</div>;
    case 3:
      return <div className="tetx-2xl text-white">dbfhsdfhdsh</div>;
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
  console.log("is visible here");
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <Header />
          <div className="absolute z-1 bottom-10 flex">
            <motion.div
              key={activePlanet}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.6, y: 40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* {getActivePlanet(activePlanet)} */}
              <DiagonalRingTech onClick={onClick} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
