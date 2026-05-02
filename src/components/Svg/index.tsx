import { AboutSvg } from "./AboutSvg";
import { ContactSvg } from "./ContactSvg";
import { FacebookSvg } from "./FacebookSvg";
import { GithubSvg } from "./GithubSvg";
import { HomeSvg } from "./HomeSvg";
import { InstaSvg } from "./InstaSvg";
import { LinkedinSvg } from "./LinkedinSvg";
import { LocationSvg } from "./LocationSvg";
import { MailSvg } from "./MailSvg";
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

    case "facebook":
      return <FacebookSvg color={color} />;

    case "insta":
      return <InstaSvg color={color} />;

    case "mail":
      return <MailSvg color={color} />;

    case "github":
      return <GithubSvg color={color} />;

    case "linkedin":
      return <LinkedinSvg color={color} />;

    case "location":
      return <LocationSvg color={color} />;
  }
};
