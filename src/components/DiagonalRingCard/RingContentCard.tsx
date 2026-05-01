import { motion } from "framer-motion";

export default function RingContentCard({
  data,
  positionStyle,
}: {
  data: { title: string; stack: string[] };
  positionStyle: string;
}) {
  return (
    <motion.div
      className={`absolute w-52 bg-[#252a41]/80 border border-white/10 rounded-2xl p-4 text-white rotate-40 ${positionStyle}`}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
      <div className="flex flex-wrap gap-2 text-xs opacity-80">
        {data.stack.map((t) => (
          <span key={t} className="px-2 py-1 bg-white/10 rounded-md">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
