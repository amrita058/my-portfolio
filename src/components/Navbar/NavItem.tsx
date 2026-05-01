import { motion } from "framer-motion";
import { SvgComponent } from "../Svg";

export default function NavItem({
  selected,
  iconName,
  isTopBar = false,
  color,
}: {
  selected: boolean;
  iconName: string;
  isTopBar: boolean;
  color?: string;
}) {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Outer soft glow — large and faint */}
      <motion.div
        className="absolute rounded-full bg-slate-400/30"
        style={{ width: 120, height: 120, filter: "blur(40px)" }}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1.2 : 0.6,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Inner sharp glow — small and bright */}
      <motion.div
        className="absolute rounded-full bg-slate-500/60"
        style={{ width: 70, height: 70, filter: "blur(12px)" }}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1.1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-12 h-12 rounded-full flex items-center justify-center border shadow-[inset_0_10px_30px_rgba(168,85,247,0.35)] border-purple-400/35 text-white"
        animate={{ scale: selected ? 1.1 : 1 }}
      >
        <SvgComponent name={iconName} color={color ?? "#ddd6fe"} />
      </motion.div>
    </div>
  );
}
