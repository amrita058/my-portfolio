import { SvgComponent } from "../Svg";

const socials = [
  { icon: "Facebook", label: "Facebook", href: "#" },
  { icon: "Linkedin", label: "LinkedIn", href: "#" },
  { icon: "Github", label: "GitHub", href: "#" },
  { icon: "Instagram", label: "Instagram", href: "#" },
  { icon: "MessageCircle", label: "Message", href: "#" },
  { icon: "Dribbble", label: "Dribbble", href: "#" },
];

export default function ContactSceneCard() {
  return (
    <div className="bg-[#181b25] border border-white/6 rounded-2xl p-9 w-72 shadow-2xl">
      <h2 className="text-[#f0f0f0] text-sm font-normal tracking-wide mb-6">
        Connect With me
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {socials.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="
              aspect-square bg-[#1e2130] border border-white/[0.07] rounded-2xl
              flex items-center justify-center
              transition-all duration-200
              hover:bg-[#252a3a] hover:border-white/[0.14] hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
              active:translate-y-0 active:shadow-none
              group
            "
          >
            <SvgComponent color={icon} name="home" />
          </a>
        ))}
      </div>
    </div>
  );
}
