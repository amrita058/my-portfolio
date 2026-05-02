import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import HeaderText from "./components/HeaderText";
import LiveCodeTicker from "./components/LiveCodeTicker";
import { ABOUT } from "../data/about";
import FooterText from "./components/FooterText";

// ── Animated counter ────────────────────────────────────────────────────────
const Counter = ({ from = 0, to = 0, suffix = "", duration = 2.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ── Skill tag pill ──────────────────────────────────────────────────────────
type TagProps = {
  children: ReactNode;
  delay?: number;
};

const Tag: React.FC<TagProps> = ({ children, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "backOut" }}
      className="inline-block px-[14px] py-[4px] border border-[rgba(124,92,191,0.4)] rounded-[20px] text-xs text-[#a07de0] bg-[rgba(124,92,191,0.08)] font-mono m-1 tracking-[0.05em]"
    >
      {children}
    </motion.span>
  );
};

// ── Stat card with animated counter ────────────────────────────────────────
type StatCardProps = {
  number: number;
  suffix?: string;
  label: string;
  delay?: number;
};

const StatCard: React.FC<StatCardProps> = ({
  number,
  suffix = "",
  label,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.04, borderColor: "rgba(124,92,191,0.7)" }}
      className="bg-[rgba(124,92,191,0.07)] border border-[rgba(124,92,191,0.2)] rounded-2xl px-5 py-6 text-center backdrop-blur-md cursor-default transition-colors"
    >
      <div className="font-extrabold leading-none mb-2 text-[clamp(32px,5vw,48px)] font-mono bg-gradient-to-br from-[#a07de0] to-[#e8c97e] bg-clip-text text-transparent">
        <Counter to={number} suffix={suffix} duration={2.2} />
      </div>

      <div className="text-xs text-[#7a8394] font-mono tracking-[0.1em] uppercase">
        {label}
      </div>
    </motion.div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const AboutSection = () => {
  return (
    <div>
      {/* ── Top label bar ── */}
      <HeaderText text1="About me" text2="Available for hire" />
      {/* ── Headline ── */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[#e8e4dc]/80 text-[clamp(36px,7vw,72px)] font-extrabold leading-[1.05] tracking-[-0.02em] mb-7"
      >
        I build things
        <br />
        <span className="bg-[linear-gradient(135deg,#a07de0_30%,#e8c97e)] bg-clip-text text-transparent">
          end-to-end.
        </span>
      </motion.h1>

      {/* ── Live code ticker ── */}
      <LiveCodeTicker />

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        {/* Left — body text + skill tags */}
        <div>
          {ABOUT.PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: i === 0 ? "#e8e4dc" : "#7a8394",
                marginBottom: "20px",
              }}
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ marginTop: "8px" }}
          >
            {ABOUT.SKILLS.map((t, i) => (
              <Tag key={t} delay={1 + i * 0.07}>
                {t}
              </Tag>
            ))}
          </motion.div>

          <div className="flex gap-6 mt-6">
            {ABOUT.LINKS.map((link) => (
              <motion.span
                key={link}
                whileHover={{ color: "#a07de0", x: 2 }}
                className="text-[12px] text-[#7a8394] font-['Space_Mono',monospace] cursor-pointer"
              >
                {link} →
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right — stat cards */}
        <div className="flex flex-col gap-4 justify-center">
          <StatCard
            number={5}
            suffix="+"
            label="Years Experience"
            delay={0.6}
          />
          <StatCard
            number={40}
            suffix="+"
            label="Projects Shipped"
            delay={0.75}
          />
          <StatCard number={12} suffix="+" label="Happy Clients" delay={0.9} />
        </div>
      </div>

      {/* Footer text */}
      <FooterText
        title="philosophy"
        description="Clean code is not written for machines — it's written for the next developer, who is usually me at 2am."
      />
    </div>
  );
};

export default AboutSection;
