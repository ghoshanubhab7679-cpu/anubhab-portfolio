export type Project = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  tools: string[];
};

export const projects: Project[] = [
  {
    slug: "neon-commerce-launch",
    title: "Neon Commerce Launch",
    category: "AI Ads",
    tag: "Brand Film",
    description: "A premium launch film for a next-generation product brand, blending cinematic visuals and sharp storytelling.",
    overview: "The project centered on creating a launch experience that felt futuristic, bold, and emotionally magnetic while remaining grounded in product clarity.",
    challenge: "The client needed a campaign that could feel like a world-class cinematic launch without spending months in post-production.",
    solution: "I built a hybrid workflow combining AI-assisted motion, stylized graphic systems, and refined editing to create a sleek, high-impact narrative.",
    result: "The final film delivered a premium launch asset that felt polished, modern, and instantly attention-grabbing across paid and social channels.",
    tools: ["Midjourney", "Runway", "Premiere Pro", "After Effects"],
  },
  {
    slug: "lumen-short-story",
    title: "Lumen Short Story",
    category: "AI Short Films",
    tag: "Narrative",
    description: "A short-form cinematic story centered on mood, contrast, and emotionally driven visual language.",
    overview: "This piece focused on human drama translated into neon-lit visuals with a futuristic but intimate tone.",
    challenge: "The brief demanded a strong emotional arc while keeping the aesthetic visually ambitious and highly stylized.",
    solution: "I designed the story around a concise narrative structure, then layered color, pacing, and motion graphics to create a tactile emotional experience.",
    result: "The film became a memorable short-form story that balanced atmosphere, clarity, and premium production value.",
    tools: ["Runway", "Photoshop", "Premiere Pro", "Illustrator"],
  },
  {
    slug: "pulse-motion-reel",
    title: "Pulse Motion Reel",
    category: "Motion Graphics",
    tag: "Reel",
    description: "A kinetic reel designed to feel like a high-end brand manifesto with sharp motion and luminous contrast.",
    overview: "The reel translates brand energy into an elegant motion language built around timing, rhythm, and layered abstraction.",
    challenge: "The brief required something stylish and memorable without drifting into visual noise.",
    solution: "I created a modular motion system with bold typography, liquid transitions, and a restrained color story to keep the composition elevated.",
    result: "The reel became a compact, high-impact visual identity piece that instantly heightened the client’s perception of quality.",
    tools: ["After Effects", "Illustrator", "Photoshop", "Cinema 4D"],
  },
  {
    slug: "drift-cartoon-series",
    title: "Drift Cartoon Series",
    category: "AI Cartoons",
    tag: "Animation",
    description: "A stylized cartoon series concept with modern character design and fluid motion storytelling.",
    overview: "The project focused on making a playful concept feel premium, polished, and cinematic rather than generic or simplistic.",
    challenge: "The series needed to feel distinctive and emotionally readable while staying visually efficient for repeat production.",
    solution: "I paired AI-assisted character generation with careful design refinement, strong composition, and a consistent motion language.",
    result: "The concept evolved into a clean, memorable animated identity with strong potential for wider rollout and brand extension.",
    tools: ["Midjourney", "Runway", "After Effects", "Illustrator"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
