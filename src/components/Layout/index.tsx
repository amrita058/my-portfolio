import { AnimatePresence, motion } from "framer-motion";

export function Layout({ page }: { page: string }) {
  console.log("page here", page);
  return (
    <AnimatePresence mode="wait">
      {page === "skills" && (
        <motion.div
          key="home"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5 }}
          className="h-screen"
        >
          Home Content
        </motion.div>
      )}

      {page === "about" && (
        <motion.div
          key="about"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Page
        </motion.div>
      )}
    </AnimatePresence>
  );
}
