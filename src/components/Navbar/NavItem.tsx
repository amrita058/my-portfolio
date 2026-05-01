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
    <div
      className={`relative flex items-center justify-center ${
        isTopBar ? "px-4 py-2" : "w-20 h-20"
      }`}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-slate-400/30"
        style={{ filter: "blur(40px)" }}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1.2 : 0.6,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-slate-500/60"
        style={{ filter: "blur(12px)" }}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1.1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Content */}
      <motion.div
        className={`
          relative flex items-center justify-center gap-2
          border text-white
          shadow-[inset_0_10px_30px_rgba(168,85,247,0.35)]
          border-purple-400/35
          ${isTopBar ? "px-4 py-2 rounded-full" : "w-12 h-12 rounded-full"}
        `}
        animate={{ scale: selected ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <SvgComponent name={iconName} color={color ?? "#ddd6fe"} />

        {isTopBar && (
          <span className="text-sm font-medium text-purple-100 capitalize">
            {iconName}
          </span>
        )}
      </motion.div>
    </div>
  );
}
