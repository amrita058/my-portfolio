import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="fixed top-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.6, y: 40 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="text-purple-300 flex text-3xl font-extrabold font-stretch-expanded">
          <span className="text-purple-50 mr-2 ">Amrita</span>Bhattarai
        </div>
      </motion.div>
    </div>
  );
}
