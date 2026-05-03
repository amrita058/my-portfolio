export const SKILLS = [
  {
    id: 1,
    title: "React Development",
    description:
      "Building modern, scalable web applications with React, TypeScript, and Vite for optimal performance.",
    accent: "#00D4FF",
    gradientFrom: "#0f2027",
    gradientTo: "#1a2f3f",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Component Architecture",
    ],
    stat: "50+",
    statLabel: "Projects",
  },
  {
    id: 2,
    title: "React Native",
    description:
      "Creating cross-platform mobile applications with React Native for iOS and Android platforms.",
    accent: "#FF6B6B",
    gradientFrom: "#1a0533",
    gradientTo: "#2a1545",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    tags: [
      "React Native",
      "TypeScript",
      "Native Modules",
      "Mobile UI/UX",
      "App Store Deployment",
    ],
    stat: "15+",
    statLabel: "Apps",
  },
  {
    id: 3,
    title: "Full-Stack Development",
    description:
      "End-to-end web solutions with modern frontend and robust PostgreSQL backend architectures.",
    accent: "#00FF94",
    gradientFrom: "#0a1628",
    gradientTo: "#0e2418",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <rect x="2" y="3" width="20" height="4" rx="1" />
        <rect x="2" y="10" width="20" height="4" rx="1" />
        <rect x="2" y="17" width="20" height="4" rx="1" />
      </svg>
    ),
    tags: [
      "PostgreSQL",
      "REST APIs",
      "Node.js",
      "TypeScript",
      "Database Design",
    ],
    stat: "99%",
    statLabel: "Uptime",
  },
  {
    id: 4,
    title: "Modern Tools",
    description:
      "Using cutting-edge development tools and technologies for optimal performance and developer experience.",
    accent: "#FFD700",
    gradientFrom: "#1c1a00",
    gradientTo: "#2a2500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tags: ["Vite", "TypeScript", "Tailwind CSS", "Git", "Docker"],
    stat: "10x",
    statLabel: "Faster",
  },
  {
    id: 5,
    title: "UI/UX Design",
    description:
      "Creating beautiful, responsive user interfaces with modern CSS frameworks and design principles.",
    accent: "#FF69B4",
    gradientFrom: "#1a0a1a",
    gradientTo: "#2a1028",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    tags: [
      "Responsive Design",
      "Tailwind CSS",
      "Component Design",
      "User Experience",
    ],
    stat: "100%",
    statLabel: "Responsive",
  },
];

export type SkillType = (typeof SKILLS)[0];
