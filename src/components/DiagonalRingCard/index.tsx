import Button from "../Button";
import RingContentCard from "./RingContentCard";

const techData = [
  {
    title: "Frontend",
    stack: ["React", "React Native", "TypeScript"],
  },
  {
    title: "Backend",
    stack: ["Node.js", "NestJS", "PostgreSQL"],
  },
  {
    title: "DevOps",
    stack: ["Docker", "AWS", "CI/CD"],
  },
];

export default function DiagonalRingTech({
  onClick,
}: {
  onClick: (page: string) => void;
}) {
  return (
    <div className="flex flex-row items-center">
      <div className="w-full flex items-center justify-center">
        {/* Egg-shaped slanted ring container */}
        <div className="relative w-90 h-70 rotate-[-40deg] translate-x-10 -translate-y-6">
          {/* Egg ring (elliptical shape) */}
          <div className="absolute inset-0 rounded-[50%] border border-purple-800/30 shadow-[0_0_30px_rgba(168,85,247,0.35)] scale-y-[0.85]" />
          <div className="absolute inset-2 rounded-[50%] border shadow-[0_0_30px_rgba(168,85,247,0.35)] border-purple-400/60 scale-y-[0.85]" />
          <div className="absolute inset-3 rounded-[50%] border border-purple-800/30 shadow-[inset_0_0_80px_rgba(168,85,247,0.35)] scale-y-[0.85]" />

          {/* Soft glow center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-20 bg-purple-500/30 blur-2xl rounded-full" />
          </div>

          {/* Card 1 - top right */}
          <RingContentCard data={techData[0]} positionStyle="top-4 -right-25" />

          {/* Card 2 - bottom right */}
          <RingContentCard
            data={techData[1]}
            positionStyle="-bottom-8 right-30"
          />

          {/* Card 3 - left middle */}
          <RingContentCard
            data={techData[2]}
            positionStyle="top-10 left-3 -translate-y-1/2"
          />
        </div>
      </div>
      <Button
        onClick={() => {
          console.log("ghghgh");
          onClick("skills");
        }}
      />
    </div>
  );
}
