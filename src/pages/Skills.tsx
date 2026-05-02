import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import HeaderText from "./components/HeaderText";

const expertise = [
  {
    id: 1,
    title: "React Development",
    description:
      "Building modern, scalable web applications with React, TypeScript, and Vite for optimal performance.",
    accent: "#00D4FF",
    gradientFrom: "#0f2027",
    gradientTo: "#1a2f3f",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Component Architecture",
    ],
    stat: "50+",
    statLabel: "Projects",
  },
  {
    id: 2,
    title: "React Native",
    description:
      "Creating cross-platform mobile applications with React Native for iOS and Android platforms.",
    accent: "#FF6B6B",
    gradientFrom: "#1a0533",
    gradientTo: "#2a1545",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    tags: [
      "React Native",
      "TypeScript",
      "Native Modules",
      "Mobile UI/UX",
      "App Store Deployment",
    ],
    stat: "15+",
    statLabel: "Apps",
  },
  {
    id: 3,
    title: "Full-Stack Development",
    description:
      "End-to-end web solutions with modern frontend and robust PostgreSQL backend architectures.",
    accent: "#00FF94",
    gradientFrom: "#0a1628",
    gradientTo: "#0e2418",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <rect x="2" y="3" width="20" height="4" rx="1" />
        <rect x="2" y="10" width="20" height="4" rx="1" />
        <rect x="2" y="17" width="20" height="4" rx="1" />
      </svg>
    ),
    tags: [
      "PostgreSQL",
      "REST APIs",
      "Node.js",
      "TypeScript",
      "Database Design",
    ],
    stat: "99%",
    statLabel: "Uptime",
  },
  {
    id: 4,
    title: "Modern Tools",
    description:
      "Using cutting-edge development tools and technologies for optimal performance and developer experience.",
    accent: "#FFD700",
    gradientFrom: "#1c1a00",
    gradientTo: "#2a2500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tags: ["Vite", "TypeScript", "Tailwind CSS", "Git", "Docker"],
    stat: "10x",
    statLabel: "Faster",
  },
  {
    id: 5,
    title: "UI/UX Design",
    description:
      "Creating beautiful, responsive user interfaces with modern CSS frameworks and design principles.",
    accent: "#FF69B4",
    gradientFrom: "#1a0a1a",
    gradientTo: "#2a1028",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    tags: [
      "Responsive Design",
      "Tailwind CSS",
      "Component Design",
      "User Experience",
    ],
    stat: "100%",
    statLabel: "Responsive",
  },
];

function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);
  const springRotX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springRotY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function ExpertiseCard({ item, index }) {
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

export default function MyExpertise() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen w-full py-24 px-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <HeaderText text1="What i do" text2="My expertise" />

        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Specialized in modern React development with TypeScript, React
            Native, and full-stack solutions using PostgreSQL and cutting-edge
            tools for optimal performance and developer experience.
          </motion.p>
        </motion.div>

        {/* Grid — 3 on top, 2 centered on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {expertise.slice(0, 3).map((item, i) => (
            <ExpertiseCard key={item.id} item={item} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:px-[16.67%]">
          {expertise.slice(3).map((item, i) => (
            <ExpertiseCard key={item.id} item={item} index={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
