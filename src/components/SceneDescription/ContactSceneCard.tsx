import { SvgComponent } from "../Svg";
import { motion } from "framer-motion";

const socials = [
  { icon: "facebook", label: "Facebook", href: "#", iconColor: "#1877F2" },
  { icon: "linkedin", label: "LinkedIn", href: "#", iconColor: "#0A66C2" },
  { icon: "github", label: "GitHub", href: "#", iconColor: "#ffffff" },
  { icon: "insta", label: "Instagram", href: "#", iconColor: "#E1306C" },
  { icon: "mail", label: "Message", href: "#", iconColor: "#22C55E" },
  { icon: "contact", label: "Dribbble", href: "#", iconColor: "#EA4C89" },
];

export default function ContactSceneCard() {
  return (
    <div className=" border border-white/6 rounded-2xl p-10 w-80 shadow-2xl">
      <div className="grid grid-cols-3 gap-6">
        {socials.map(({ icon, label, href, iconColor }, i) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            className="
          aspect-square bg-[#1e2130] border border-white/[0.07] rounded-2xl mt-4
          flex items-center justify-center
          group
        "
            // Floating idle animation
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            // Hover "air crash + bounce"
            whileHover={{
              scale: 1.15,
              y: -20,
              rotate: [0, -8, 8, -4, 0], // wobble crash
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 12,
              },
            }}
            // Tap gives quick "impact"
            whileTap={{
              scale: 0.9,
              y: 2,
            }}
          >
            <motion.div
              // Inner bounce feel
              whileHover={{
                y: [0, -10, 5, 0],
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <SvgComponent color={iconColor} name={icon} />
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
