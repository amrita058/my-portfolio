import { motion } from "framer-motion";

export default function FooterText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="relative rounded-2xl p-8 border border-[rgba(124,92,191,0.25)]  bg-[rgba(255,255,255,0.03)]"
      >
        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 16,
          }}
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ✦
        </motion.div>
        <div className="text-[11px] font-['Space_Mono',monospace] text-[#e0de7d] tracking-[0.15em] uppercase mb-2">
          // {title}
        </div>
        <p className="text-[13px] text-[#7a8394] leading-[1.7] italic">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
