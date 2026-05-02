import { motion } from "framer-motion";
import { useEffect, type RefObject } from "react";
import AboutSection from "./About";
import FeaturedProjects from "./Projects";
import MyExpertise from "./Skills";
import Contact from "./Contact";

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
      className="fixed z-10 h-svh w-full "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background:
          "linear-gradient(160deg, #0b0314 0%, #0d0d16 30%, #10101e 45%, #0b0c18 100%)",
      }}
    >
      <div className="h-full overflow-y-auto scroll-smooth pb-40">
        {/* Grid style layout */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(124,92,191,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,92,191,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />

        {/* Sections */}
        <section className="pt-24 lg:max-w-[62%] flex mx-auto" id="about">
          <AboutSection />
        </section>
        <section className="min-h-[900px]" id="skills">
          <MyExpertise />
        </section>
        <section className="min-h-[900px]" id="projects">
          <FeaturedProjects />
        </section>
        <section className="pt-24 lg:max-w-[62%] flex mx-auto" id="contact">
          <Contact />
        </section>
      </div>
    </motion.div>
  );
}
