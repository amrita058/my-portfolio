import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const CODE_SNIPPETS = [
  "const passion = () => buildThings();",
  "while(alive) { keepLearning(); }",
  "git commit -m 'Ship it 🚀'",
  "npm run make-magic",
  "SELECT * FROM experience;",
  "docker compose up --dreams",
];

export default function AboutSceneCard() {
  const [snippet, setSnippet] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setSnippet((p) => (p + 1) % CODE_SNIPPETS.length),
      2500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div className="text-white bg-red-500 text-2xl font-stretch-expanded font-bold uppercase"></div>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[clamp(36px,7vw,72px)] font-extrabold leading-[1.05] mb-7 tracking-[-0.02em] text-gray-300/70"
      >
        I build things
        <br />
        <GlitchText>
          <span className="bg-[linear-gradient(135deg,#a07de0_30%,#e8c97e)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            end-to-end.
          </span>
        </GlitchText>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-mono text-xl text-[#e8c97e] bg-[rgba(232,201,126,0.06)] border border-[rgba(232,201,126,0.15)] rounded-lg px-[18px] py-[10px] mb-[40px] inline-flex items-center gap-[10px]"
      >
        <span style={{ color: "#7a8394" }}>$</span>
        <motion.span
          key={snippet}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {CODE_SNIPPETS[snippet]}
        </motion.span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: "#a07de0" }}
        >
          ▋
        </motion.span>
      </motion.div>
    </div>
  );
}

const GlitchText = ({ children }: { children: ReactNode }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "2px",
              color: "#ff6b6b",
              opacity: 0.7,
              clipPath: "inset(30% 0 50% 0)",
            }}
          >
            {children}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-2px",
              color: "#00f5d4",
              opacity: 0.7,
              clipPath: "inset(60% 0 10% 0)",
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};
