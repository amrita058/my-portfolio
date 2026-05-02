import { motion } from "framer-motion";

export default function HeaderText({
  text1,
  text2,
}: {
  text1: string;
  text2?: string;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-9"
      >
        <div className="w-8 h-0.5 bg-[#7c5cbf]" />
        <span className="font-['Space_Mono',monospace] text-[13px] text-[#967ad1] tracking-[0.2em] uppercase">
          {text1}
        </span>
        {Boolean(text2) && (
          <>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
            />
            <span className="font-['Space_Mono',monospace] text-[12px] text-[#7a8394]">
              {text2}
            </span>
          </>
        )}
      </motion.div>
    </div>
  );
}
