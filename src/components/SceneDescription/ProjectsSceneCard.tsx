import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../Button";

export type Project = {
  id: number;
  title: string;
  color: string;
  imagePath: string;
  description: string;
};

const cards = [
  {
    id: 1,
    title: "Full-Stack Social Media",
    color: "#1f2937",
    imagePath: "/public/images/project1.png",
    description:
      "Complete social media platform with MERN stack and real-time features.",
  },
  {
    id: 2,
    title: "Inventory FullStack",
    color: "#1f2937",
    imagePath: "/public/images/project2.png",
    description:
      "Complete social media platform with MERN stack and real-time features.",
  },
  {
    id: 3,
    title: "React Native Inflancer",
    color: "#1f2937",
    imagePath: "/public/images/project3.png",
    description:
      "Complete social media platform with MERN stack and real-time features.",
  },
];

export default function ProjectsSceneCard({
  onClick,
}: {
  onClick: (page: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row gap-20 items-end ">
      <div className="flex items-center justify-center">
        <div
          className="relative top-10 left-20 w-55 h-75 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="absolute w-full h-full rounded-2xl text-white font-bold shadow-xl flex overflow-hidden border border-white/10"
              style={{
                background: card.color,
                zIndex: 10 - i,
                transformOrigin: "top left",
              }}
              initial={false}
              animate={{
                x: -i * 35, // spread right
                y: i * 1.2, // spread down
                rotate: -i * 4,
                scale: 1 - i * 0.07,
                opacity: 1 - i * 0.12,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectCardItem item={card} />
            </motion.div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          onClick("projects");
        }}
      />
    </div>
  );
}

function ProjectCardItem({ item }: { item: Project }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#1f2937] text-white shadow-xl border border-white/10">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.imagePath}
          alt="project"
          className="w-full h-full object-cover"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-700/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-sm font-semibold">{item.title}</h2>

        <p className="text-xs text-gray-300 leading-relaxed">
          {item.description}
        </p>

        {/* tech stack */}
        <div className="flex flex-wrap gap-1">
          {["React", "TypeScript", "Node"].map((t) => (
            <span
              key={t}
              className="text-xs px-1 py-1 rounded-full bg-white/10 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
