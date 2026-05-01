import { AboutSvg } from "./AboutSvg";
import { ContactSvg } from "./ContactSvg";
import { HomeSvg } from "./HomeSvg";
import { ProjectSvg } from "./ProjectSvg";
import { SkillSvg } from "./SkillSvg";

export const SvgComponent = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
  switch (name) {
    case "home":
      return <HomeSvg color={color} />;

    case "about":
      return <AboutSvg color={color} />;

    case "skills":
      return <SkillSvg color={color} />;

    case "projects":
      return <ProjectSvg color={color} />;

    case "contact":
      return <ContactSvg color={color} />;
  }
};
