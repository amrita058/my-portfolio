import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeaderText from "./components/HeaderText";
import { TiltCard } from "./components/TiltCard";
import { PROJECTS, type ProjectType } from "../data/projects";

const categories = [
  "All",
  "React Development",
  "React Native",
  "Full Stack Development",
  "TypeScript",
  "PostgreSQL",
];

function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.85, filter: "blur(8px)" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <TiltCard style={{}} className="h-full">
        <motion.div
          className="relative rounded-2xl overflow-hidden h-full cursor-pointer group"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: hovered
              ? `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}40, inset 0 1px 0 rgba(255,255,255,0.1)`
              : `0 8px 32px rgba(0,0,0,0.3)`,
            transition: "box-shadow 0.4s ease",
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${project.accent}20 0%, transparent 70%)`,
            }}
          />

          {/* Image area */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${project.gradientTo} 100%)`,
              }}
            />

            {/* Year badge */}
            <motion.div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span style={{ color: project.accent }}>◆</span>
              {project.year}
            </motion.div>

            {/* Stat badge */}
            <motion.div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
              style={{
                background: `${project.accent}20`,
                border: `1px solid ${project.accent}50`,
                color: project.accent,
              }}
              animate={{
                opacity: hovered ? 1 : 0.7,
                scale: hovered ? 1.05 : 1,
              }}
            >
              {project.stat}
            </motion.div>

            {/* Icon */}
            <motion.div
              className="absolute bottom-3 left-4 text-3xl"
              animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.icon}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-3">
            <div>
              <h3
                className="text-white font-bold text-lg leading-tight mb-1.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {project.description}
              </p>
            </div>

            {/* Divider */}
            <motion.div
              className="w-full h-px"
              style={{
                background: `linear-gradient(to right, ${project.accent}60, transparent)`,
              }}
              animate={{ scaleX: hovered ? 1 : 0.5, originX: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <motion.span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: `${project.accent}20`,
                    borderColor: `${project.accent}50`,
                    color: project.accent,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
              {project.extraCount > 0 && (
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  +{project.extraCount} more
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-1">
              {project.hasLive && (
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: project.accent,
                    color: "#000",
                    border: "none",
                  }}
                  whileHover={{ scale: 1.03, opacity: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>↗</span> View Live
                </motion.button>
              )}
              <motion.button
                className={`${project.hasLive ? "flex-1" : "w-full"} flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold`}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                whileHover={{
                  scale: 1.03,
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span style={{ fontSize: 14 }}>{"</>"}</span> Code
              </motion.button>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filtered = PROJECTS.filter(
    (p) => activeCategory === "All" || p.categories.includes(activeCategory),
  );

  return (
    <div>
      {/* Ambient background blobs */}
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <HeaderText text1="my work" text2="Featured Projects" />

          <motion.p
            className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore my latest works showcasing a blend of creativity, technical
            expertise, and attention to detail.
          </motion.p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onHoverStart={() => setHoveredCat(cat)}
                onHoverEnd={() => setHoveredCat(null)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  color: isActive
                    ? "#000"
                    : hoveredCat === cat
                      ? "#fff"
                      : "rgba(255,255,255,0.5)",
                  background: isActive ? "#fff" : "transparent",
                  border: isActive
                    ? "none"
                    : "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  outline: "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#fff", zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Count */}
        <motion.div
          className="text-center mb-8"
          key={activeCategory}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 rounded-2xl text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              outline: "none",
            }}
            whileHover={{
              scale: 1.04,
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            View All Projects →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
