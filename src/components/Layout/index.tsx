import { motion } from "framer-motion";
import { useEffect, type RefObject } from "react";

export function Layout({
  page,
  setPage,
  isProgrammaticScroll,
}: {
  page: string;
  setPage: (p: string) => void;
  isProgrammaticScroll: RefObject<boolean>;
}) {
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // ignore updates during click scroll
          if (isProgrammaticScroll.current) {
            const el = document.getElementById(page);
            if (el) {
              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
            return;
          }

          setPage(entry.target.id);
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setPage, page, isProgrammaticScroll]);

  return (
    <motion.div
      className="fixed z-10 h-svh w-full bg-[#120822]/60 backdrop-blur-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-full overflow-y-auto scroll-smooth">
        <section className="min-h-[700px]" id="about">
          About
        </section>
        <section className="min-h-[900px]" id="skills">
          Skills
        </section>
        <section className="min-h-[900px]" id="projects">
          Projects
        </section>
        <section className="min-h-[900px]" id="contact">
          Contact
        </section>
      </div>
    </motion.div>
  );
}
