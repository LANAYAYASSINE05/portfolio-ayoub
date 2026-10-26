export const profile = {
  firstName: "Ayoub",
  lastName: "Amensar",
  role: "Graphic Designer",
  location: "Casablanca, Maroc",
  email: "ayoubamensar200@gmail.com",
  phone: "+212 6 29 87 82 33",
  phoneHref: "tel:+212629878233",
  whatsapp: "https://wa.me/212629878233",
  photo: "/ayoub-amensar.jpg",
  cv: "/cv-ayoub-amensar.pdf",
  cvFileName: "CV-Ayoub-Amensar.pdf",
  tagline: "Je traduis des idées en visuels clairs, modernes et impactants.",
  summary:
    "Graphic Designer créatif et rigoureux, spécialisé dans la conception d’identités visuelles, de supports de communication et de contenus graphiques — de l’écran jusqu’à la plaque d’impression.",
  socials: [
    { label: "Behance", brand: "behance", href: "https://www.behance.net/ayoubamensar" },
    { label: "LinkedIn", brand: "linkedin", href: "https://www.linkedin.com/in/ayoub-amensar" },
    { label: "Linktree", brand: "linktree", href: "https://linktr.ee/amensar" },
  ],
} as const;

export const navItems = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "technologies", label: "Outils" },
  { id: "skills", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "education", label: "Formation" },
  { id: "methodology", label: "Méthode" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
] as const;

export const aboutText =
  "Je conçois des identités visuelles, des campagnes social media et des supports imprimés qui ont du sens. Mon parcours en agence et en imprimerie m’a appris à penser chaque visuel du concept jusqu’à la sortie CTP : un design n’est réussi que s’il fonctionne à l’écran comme sur le papier.";

export const stats = [
  { value: 5, suffix: "", label: "Agences & studios" },
  { value: 4, suffix: "+", label: "Années de pratique" },
  { value: 12, suffix: "", label: "Projets publiés sur Behance" },
  { value: 3, suffix: "", label: "Langues parlées" },
];

export const qualities = ["Créatif", "Souci du détail", "Adaptable", "Bon communicant", "Organisé & fiable"];

export const languages = ["Arabe", "Français", "Anglais"];

export type ToolIcon =
  | "photoshop"
  | "illustrator"
  | "indesign"
  | "layout"
  | "imposition"
  | "plate"
  | "printer"
  | "laser"
  | "signage";

export type Tool = {
  name: string;
  icon: ToolIcon;
  category: "Adobe" | "Prépresse" | "Production";
  /** Prépresse tile (process inks). */
  color: string;
  ink: string;
  /** Studio néon bento tile (pop colours). */
  pop: { color: string; ink: string };
};

export const tools: Tool[] = [
  { name: "Photoshop", icon: "photoshop", category: "Adobe", color: "#001e36", ink: "#31a8ff", pop: { color: "#001e36", ink: "#31a8ff" } },
  { name: "Illustrator", icon: "illustrator", category: "Adobe", color: "#330000", ink: "#ff9a00", pop: { color: "#330000", ink: "#ff9a00" } },
  { name: "InDesign", icon: "indesign", category: "Adobe", color: "#49021f", ink: "#ff3366", pop: { color: "#49021f", ink: "#ff3366" } },
  { name: "PAO", icon: "layout", category: "Prépresse", color: "#0d0d0d", ink: "#f3efe7", pop: { color: "#0b0b0b", ink: "#fff6e6" } },
  { name: "Montage offset", icon: "imposition", category: "Prépresse", color: "#00a0e3", ink: "#0d0d0d", pop: { color: "#5cb8ff", ink: "#0b0b0b" } },
  { name: "Sortie CTP", icon: "plate", category: "Prépresse", color: "#e5007d", ink: "#f3efe7", pop: { color: "#ff5fa2", ink: "#0b0b0b" } },
  { name: "Impression numérique", icon: "printer", category: "Production", color: "#ffdd00", ink: "#0d0d0d", pop: { color: "#fff6e6", ink: "#0b0b0b" } },
  { name: "Découpe laser", icon: "laser", category: "Production", color: "#f3efe7", ink: "#0d0d0d", pop: { color: "#9be15d", ink: "#0b0b0b" } },
  { name: "Signalétique", icon: "signage", category: "Production", color: "#2a2826", ink: "#ffdd00", pop: { color: "#2c2a26", ink: "#ffd43b" } },
];

export const skills = [
  {
    title: "Identité visuelle & branding",
    description: "Logos, chartes graphiques et systèmes visuels cohérents qui donnent une voix à la marque.",
  },
  {
    title: "Communication visuelle",
    description: "Campagnes, affiches et contenus social media pensés pour capter l’attention et convertir.",
  },
  {
    title: "Maîtrise des logiciels de design",
    description: "Photoshop, Illustrator, InDesign : retouche, illustration, mise en page et exécution.",
  },
  {
    title: "Créativité & sens artistique",
    description: "Recherche, palettes, typographie : chaque projet part d’une idée forte et d’un regard.",
  },
  {
    title: "Gestion du temps & organisation",
    description: "Suivi de projets, priorisation et respect des délais d’impression comme de publication.",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  tasks: string[];
};

export const experiences: Experience[] = [
  {
    company: "Creaphics",
    role: "Graphiste prépresse",
    period: "Nov. 2024 — En cours",
    current: true,
    tasks: [
      "Préparation des fichiers de montage pour impression offset avec précision.",
      "Sortie des plaques CTP (Computer to Plate) avec des outils numériques adaptés.",
      "Adaptation numérique des fichiers aux exigences d’impression.",
    ],
  },
  {
    company: "GAM PUB",
    role: "Graphic Designer",
    period: "Mars 2024",
    tasks: [
      "Création de chartes graphiques.",
      "Conception de supports infographiques : cartes de visite, flyers, panneaux publicitaires.",
    ],
  },
  {
    company: "Graphito",
    role: "Graphiste PAO & signalétique",
    period: "Mars 2023 — Mai 2023",
    tasks: [
      "Traitement et création d’images (Photoshop, Illustrator, InDesign).",
      "Enseignes lumineuses, habillage de véhicules, palissades et panneaux de chantier.",
      "Impression numérique, découpe laser et conception de stands d’exposition.",
    ],
  },
  {
    company: "Ahla Media",
    role: "Graphic Designer",
    period: "Nov. 2022 — Janv. 2023",
    tasks: [
      "Conception graphique pour supports de communication, retouche et illustrations.",
      "Mise en page et choix des palettes de couleurs.",
      "Travail collaboratif, veille des tendances, gestion et suivi de projets.",
    ],
  },
  {
    company: "BrainBow Agency",
    role: "Graphic Designer — Social Media",
    period: "Mars 2022 — Avril 2022",
    tasks: [
      "Création de contenus visuels pour les réseaux sociaux.",
      "Participation au spot publicitaire Cash Plus.",
      "Publications publicitaires pour Aïn Ifrane et campagnes pour MAGIX / MOLFIX.",
    ],
  },
];

export const education = [
  {
    degree: "Licence professionnelle — Communication visuelle",
    school: "Artcom Sup",
    period: "2024 — 2025",
    note: "Stratégie de marque, direction artistique et communication visuelle.",
  },
  {
    degree: "Technicien spécialisé en infographie",
    school: "ISAG, Casablanca",
    period: "2023 — 2024",
    note: "Diplômé · PAO, prépresse, traitement d’image et mise en page.",
  },
  {
    degree: "Baccalauréat — Sciences de la vie et de la terre",
    school: "Lycée Mohammed VI, Casablanca",
    period: "2020 — 2021",
    note: "Option SVT.",
  },
];

export const methodology = [
  {
    step: "01",
    title: "Brief & écoute",
    description: "Comprendre la marque, sa cible et l’objectif réel du support avant de dessiner quoi que ce soit.",
    ink: "cyan",
  },
  {
    step: "02",
    title: "Recherche & moodboard",
    description: "Veille, références, palettes et typographies pour fixer une direction claire et partagée.",
    ink: "magenta",
  },
  {
    step: "03",
    title: "Esquisses & concept",
    description: "Pistes graphiques rapides, puis sélection et affinage du concept le plus fort.",
    ink: "yellow",
  },
  {
    step: "04",
    title: "Design & déclinaisons",
    description: "Exécution soignée et déclinaison sur tous les formats : réseaux sociaux, print, signalétique.",
    ink: "key",
  },
  {
    step: "05",
    title: "Prépresse & livraison",
    description: "Vérification, ajustement et correction des fichiers, export print-ready ou web-ready.",
    ink: "magenta",
  },
] as const;

export type ProjectCategory = "Branding" | "Social media" | "Print & édition";

export type Project = {
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  image: string;
  href: string;
};

export const projectCategories: Array<"Tous" | ProjectCategory> = ["Tous", "Branding", "Social media", "Print & édition"];

export const projects: Project[] = [
  {
    title: "Mise en page éditoriale",
    client: "Support pédagogique",
    category: "Print & édition",
    year: "2025",
    image: "/projects/mise-en-page.jpg",
    href: "https://www.behance.net/gallery/243334847/mise-en-page",
  },
  {
    title: "Campagne social media",
    client: "Série de posts",
    category: "Social media",
    year: "2025",
    image: "/projects/posts-social-media-1.jpg",
    href: "https://www.behance.net/gallery/243334535/posts-social-media",
  },
  {
    title: "Posts social media",
    client: "Série de posts",
    category: "Social media",
    year: "2025",
    image: "/projects/posts-social-media-2.jpg",
    href: "https://www.behance.net/gallery/243334425/posts-social-media",
  },
  {
    title: "Marine",
    client: "Sardines Marine",
    category: "Social media",
    year: "2024",
    image: "/projects/marine.jpg",
    href: "https://www.behance.net/gallery/207742279/MARINE",
  },
  {
    title: "Healthy Food",
    client: "Restauration",
    category: "Social media",
    year: "2024",
    image: "/projects/healthy-food.jpg",
    href: "https://www.behance.net/gallery/207742021/healthy-food",
  },
  {
    title: "Branding & social media",
    client: "Identité de marque",
    category: "Branding",
    year: "2024",
    image: "/projects/branding-social.jpg",
    href: "https://www.behance.net/gallery/203092687/branding-and-post-social-media",
  },
  {
    title: "MAGIX",
    client: "MAGIX / MOLFIX",
    category: "Social media",
    year: "2024",
    image: "/projects/magix.jpg",
    href: "https://www.behance.net/gallery/203092369/poste-social-media-MAGIX",
  },
  {
    title: "Aïn Ifrane",
    client: "Aïn Ifrane",
    category: "Social media",
    year: "2024",
    image: "/projects/ain-ifrane.jpg",
    href: "https://www.behance.net/gallery/197708817/poste-social-media-ain-ifrane",
  },
  {
    title: "Versalya",
    client: "Versalya",
    category: "Social media",
    year: "2024",
    image: "/projects/versalya.jpg",
    href: "https://www.behance.net/gallery/195916837/poste-social-media-versalya",
  },
  {
    title: "Nike — concept",
    client: "Projet personnel",
    category: "Social media",
    year: "2024",
    image: "/projects/nike.jpg",
    href: "https://www.behance.net/gallery/194902313/NIKE-poste-social-media",
  },
  {
    title: "Moroccan Jamal Cosmetics",
    client: "Logo presentation",
    category: "Branding",
    year: "2024",
    image: "/projects/logo-moroccan.jpg",
    href: "https://www.behance.net/gallery/195070831/LOGO-MOROCCAN-",
  },
];
