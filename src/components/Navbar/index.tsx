import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";
import { PLANETS } from "../../data/planets";
import NavItem from "./NavItem";

const items = ["home", "about", "skills", "projects", "contact"];

export default function Navbar({
  page,
  setPage,
}: {
  page: string;
  setPage: (i: string) => void;
}) {
  const isHome = page === "home";

  return (
    <NavAnimationLayout isHome={isHome}>
      <motion.div
        layout
        className="pointer-events-auto p-2 rounded-full backdrop-blur-md"
        style={{
          display: "flex",
          flexDirection: isHome ? "column" : "row",
          gap: 8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {items.map((item, index) => (
          <div key={item} onClick={() => setPage(item)}>
            <NavItem
              selected={page === item}
              iconName={PLANETS[index].id}
              isTopBar={!isHome}
            />
          </div>
        ))}
      </motion.div>
    </NavAnimationLayout>
  );
}

const NavAnimationLayout = ({
  children,
  isHome,
}: {
  children: ReactNode;
  isHome: boolean;
}) => {
  return (
    <AnimatePresence mode="popLayout">
      {isHome ? (
        <motion.div
          key="nav-right"
          style={{ position: "fixed", zIndex: 50, pointerEvents: "none" }}
          initial={{
            opacity: 0,
            scale: 0.4,
            top: "50vh",
            left: "100vw",
            x: "-100%",
            y: "-50%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="nav-top"
          style={{ position: "fixed", zIndex: 50, pointerEvents: "none" }}
          initial={{
            opacity: 0,
            scale: 0.8,
            top: 0,
            left: "50vw",
            x: "-50%",
            y: "0%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
