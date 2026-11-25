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
  location: "Tunis, Tunisia",
  utcOffset: "UTC+1",
  email: "karimsouissi30@gmail.com",
  phone: "+216 93 945 955",
  availability: "Open to Data Scientist / AI Engineer roles",
  cvPath: "/assets/aistudio/cv_karim_souissi_206401a7.pdf",
  // Formspree: create a form at https://formspree.io, then paste its endpoint here,
  // e.g. "https://formspree.io/f/xxxxxxxx". Empty string = fall back to mailto:.
  formspreeEndpoint: "https://formspree.io/f/mnjelejr",
  // Real photo at public/karim.jpg
  photo: "/karim.jpg",
  initials: "KS",
  stats: [
    { label: "Enterprise internships", value: "3" },
    { label: "AI systems shipped", value: "6+" },
    { label: "Freelance projects", value: "2" },
    { label: "Industry experience", value: "9 mo" },
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
