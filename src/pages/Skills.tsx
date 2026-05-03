import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SKILLS, type SkillType } from "../data/skills";
import HeaderText from "./components/HeaderText";
import { TiltCard } from "./components/TiltCard";

const words = ["Crafting", "Skills", "that matter"];

function SkillCard({ item, index }: { item: SkillType; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isLarge = index === 0 || index === 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={isLarge ? "md:col-span-1" : ""}
    >
      <TiltCard style={{ perspective: 1000, height: "100%" }}>
        <motion.div
          className="relative rounded-2xl overflow-hidden h-full flex flex-col p-7 gap-5"
          style={{
            background: `linear-gradient(140deg, ${item.gradientFrom}, ${item.gradientTo})`,
            border: `1px solid rgba(255,255,255,0.07)`,
            boxShadow: hovered
              ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${item.accent}30, inset 0 1px 0 rgba(255,255,255,0.08)`
              : `0 4px 24px rgba(0,0,0,0.3)`,
            transition: "box-shadow 0.4s ease",
            minHeight: 280,
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow blob */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: -40,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${item.accent}18 0%, transparent 70%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1.2 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Corner accent line */}
          <motion.div
            className="absolute top-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(to right, ${item.accent}, transparent)`,
            }}
            animate={{ width: hovered ? "60%" : "30%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Icon */}
          <motion.div
            className="relative flex items-center justify-center rounded-xl"
            style={{
              width: 52,
              height: 52,
              background: `${item.accent}15`,
              border: `1px solid ${item.accent}30`,
              color: item.accent,
            }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {item.icon}
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ border: `1px solid ${item.accent}` }}
              animate={
                hovered
                  ? { scale: [1, 1.4], opacity: [0.5, 0] }
                  : { scale: 1, opacity: 0 }
              }
              transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
            />
          </motion.div>

          {/* Text */}
          <div className="relative flex flex-col gap-2 flex-1">
            <h3
              className="text-white font-bold text-xl leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {item.description}
            </p>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, ${item.accent}50, transparent)`,
            }}
            animate={{ scaleX: hovered ? 1 : 0.4, originX: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Tags */}
          <div className="relative flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: index * 0.1 + i * 0.05 + 0.3,
                  duration: 0.3,
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.6)",
                }}
                whileHover={{
                  background: `${item.accent}20`,
                  borderColor: `${item.accent}50`,
                  color: item.accent,
                  scale: 1.06,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Stat */}
          <motion.div
            className="absolute top-5 right-5 text-right"
            animate={{ opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="text-xl font-bold"
              style={{
                color: item.accent,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {item.stat}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {item.statLabel}
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

function HeadlineCard() {
  return (
    <div className="leading-none text-white/80 font-extrabold">
      {words.map((word, wi) => (
        <motion.span
          key={word}
          className="inline-block mr-4 text-7xl"
          initial={{ opacity: 0, y: 40, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2 + wi * 0.12,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            color: wi < 2 ? "rgba(255,255,255,0.95)" : "transparent",
            WebkitTextStroke:
              wi === 2 ? "2px rgba(255,255,255,0.4)" : undefined,
          }}
        >
          {word}
          {wi === 2 && (
            <motion.span
              style={{
                marginLeft: 12,
                fontSize: 36,
                WebkitTextStroke: 0,
                color: "#fff",
                verticalAlign: "middle",
              }}
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen w-full py-24 px-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <HeaderText text1="What i do" text2="My expertise" />

        {/* Headline — word by word */}
        <div className="grid grid-cols-2 gap-12 mb-12 ">
          <HeadlineCard />
          <div className="flex items-end pb-6">
            <motion.p
              className="text-base max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Specialized in modern React development with TypeScript, React
              Native, and full-stack solutions using PostgreSQL and cutting-edge
              tools for optimal performance and developer experience.
            </motion.p>
          </div>
        </div>

        {/* Grid — 3 on top, 2 centered on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {SKILLS.slice(0, 3).map((item, i) => (
            <SkillCard key={item.id} item={item} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:px-[16.67%]">
          {SKILLS.slice(3).map((item, i) => (
            <SkillCard key={item.id} item={item} index={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
