import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CODE_SNIPPETS } from "../../data/codeSnippets";

export default function LiveCodeTicker() {
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="inline-flex items-center gap-2.5 px-[18px] py-[10px] mb-10 text-[13px] text-[#e8c97e] font-['Space_Mono',monospace] bg-[rgba(232,201,126,0.06)] border border-[rgba(232,201,126,0.15)] rounded-lg"
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
