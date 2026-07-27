import type { SocialLink } from "@/types";

export const profile = {
  name: "Karim Souissi",
  firstName: "Karim",
  title: "AI Engineer",
  subtitle: "Data Science & Decision Systems",
  tagline:
    "I build production-ready AI systems that transform complex data into intelligent decisions.",
  intro:
    "Graduate AI Engineer specializing in LLMs, multi-agent systems, RAG, natural language processing, and applied machine learning — turning research into reliable, production-grade software.",
  location: "Sfax, Tunisia",
  email: "karimsouissi30@gmail.com",
  phone: "+216 28 445 955",
  availability: "Open to AI Engineer roles",
  cvPath: "/karim-souissi-cv.pdf",
  // Formspree: create a form at https://formspree.io, then paste its endpoint here,
  // e.g. "https://formspree.io/f/xxxxxxxx". Empty string = fall back to mailto:.
  formspreeEndpoint: "https://formspree.io/f/mnjelejr",
  // Real photo at public/karim.jpg
  photo: "/karim.jpg",
  initials: "KS",
  stats: [
    { label: "Industry experience", value: "6 mo" },
    { label: "Enterprise internships", value: "3" },
    { label: "AI systems shipped", value: "6+" },
    { label: "Skill domains", value: "10+" },
  ],
} as const;

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:karimsouissi30@gmail.com",
    icon: "Mail",
    handle: "karimsouissi30@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karim-souissi-867694284/",
    icon: "Linkedin",
    handle: "karim-souissi",
  },
  {
    label: "GitHub",
    href: "https://github.com/karim12348585",
    icon: "Github",
    handle: "karim12348585",
  },
  {
    label: "Kaggle",
    href: "https://www.kaggle.com/karimsouissi",
    icon: "Trophy",
    handle: "karimsouissi",
  },
];
