import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { CONTACTS, type ContactType } from "../data/contact";
import FooterText from "./components/FooterText";
import HeaderText from "./components/HeaderText";
import { SvgComponent } from "../components/Svg";

function TiltCard({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style: Record<string, unknown>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [5, -5]);
  const rotateY = useTransform(x, [-60, 60], [-5, 5]);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 22 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={(e) => {
        const r = ref?.current?.getBoundingClientRect();
        if (r) {
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }
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

function ContactCard({
  contact,
  index,
}: {
  contact: ContactType;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <TiltCard style={{ height: "100%" }}>
        <motion.a
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: hovered
              ? `1px solid ${contact.accent}40`
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: hovered
              ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${contact.accent}25, inset 0 1px 0 rgba(255,255,255,0.06)`
              : "0 4px 20px rgba(0,0,0,0.25)",
            transition: "border 0.3s, box-shadow 0.4s",
            textDecoration: "none",
            display: "flex",
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blob top-right */}
          <motion.div
            className="absolute top-2 right-3 rounded-full pointer-events-none"
            style={{
              width: 14,
              height: 14,
              background: contact.blobColor,
              filter: "blur(4px)",
            }}
            animate={{ scale: hovered ? 3.5 : 1, opacity: hovered ? 0.6 : 0.9 }}
            transition={{ duration: 0.5 }}
          />

          {/* Glow sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(ellipse at 10% 50%, ${contact.accent}12 0%, transparent 65%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Icon */}
          <motion.div
            className="relative flex items-center justify-center rounded-2xl shrink-0"
            style={{
              width: 52,
              height: 52,
              background: contact.iconBg,
              color: "#fff",
              boxShadow: hovered ? `0 8px 24px ${contact.accent}50` : "none",
              transition: "box-shadow 0.3s",
            }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <SvgComponent name={contact.icon} color={contact.accent} />
          </motion.div>

          {/* Text */}
          <div className="relative flex flex-col gap-0.5">
            <motion.span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: hovered ? contact.accent : "rgba(255,255,255,0.35)",
                transition: "color 0.3s",
              }}
            >
              {contact.label}
            </motion.span>
            <span
              className="text-base font-semibold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {contact.value}
            </span>
          </div>

          {/* Arrow */}
          <motion.div
            className="ml-auto shrink-0 relative"
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: contact.accent }}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              style={{ width: 18, height: 18 }}
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.a>
      </TiltCard>
    </motion.div>
  );
}

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div className=" w-full">
      <div className="relative  mx-auto flex flex-col">
        {/* Header text */}

        <HeaderText text1="get in touch" />

        {/* Headline — word by word */}

        {/* Subtext */}
        <motion.p
          className="text-center mb-16 max-w-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          Ready to bring your vision to life? Let's discuss your project and
          make something extraordinary together.
        </motion.p>

        {/* Contact cards grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {CONTACTS.map((c, i) => (
            <ContactCard key={c.id} contact={c} index={i} />
          ))}
        </div>

        {/* Available for Projects banner */}
      </div>
      <FooterText
        title="Available for projects"
        description=" We're currently accepting new projects and would love to hear about your ideas. Let's create something amazing together!"
      />
    </div>
  );
}
