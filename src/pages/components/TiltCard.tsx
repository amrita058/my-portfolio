import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function TiltCard({
  children,
  style,
  className = "",
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
