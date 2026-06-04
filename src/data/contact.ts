export const CONTACTS = [
  {
    id: 1,
    label: "Email",
    value: "amritachi58@gmail.com",
    accent: "#4F8EF7",
    iconColor: "#22C55E",
    iconBg:
      "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.05))",
    icon: "mail",
    blobColor: "rgba(79,142,247,0.25)",
    href: "mailto:amritachi58@gmail.com",
  },
  {
    id: 2,
    label: "WhatsApp",
    value: "+977 9761245154",
    accent: "#25D366",
    iconColor: "#128C3E",
    iconBg:
      "linear-gradient(135deg, rgba(18,140,62,0.25), rgba(18,140,62,0.05))",
    icon: "contact",
    blobColor: "rgba(37,211,102,0.25)",
    href: "https://wa.me/9761245154",
  },
  {
    id: 3,
    label: "LinkedIn",
    value: "linkedin.com/in/amritabhattarai",
    accent: "#BF5AF2",
    iconColor: "#0A66C2",
    iconBg:
      "linear-gradient(135deg, rgba(10,102,194,0.25), rgba(10,102,194,0.05))",
    icon: "linkedin",
    blobColor: "rgba(191,90,242,0.25)",
    href: "https://linkedin.com/in/amritabhattarai",
  },
  {
    id: 4,
    label: "Location",
    value: "Kathmandu, Nepal",
    accent: "#FF6B35",
    iconColor: "#EA4C89",
    iconBg:
      "linear-gradient(135deg, rgba(234,76,137,0.25), rgba(234,76,137,0.05))",
    icon: "location",
    blobColor: "rgba(255,107,53,0.25)",
    href: "https://maps.google.com/?q=Kathmandu,+Nepal",
  },
];

export type ContactType = (typeof CONTACTS)[0];
