export interface PortfolioItem {
  id: string;
  title: string;
  category: "AI Video" | "AI Image" | "Creative Direction" | "Technical Consulting";
  thumbnail: string;
  description: string;
  videoUrl?: string;
  fullDescription: string;
  technologies: string[];
  client?: string;
  year: string;
  layout?: "default" | "video-split";
  duration?: string;
  budget?: string;
  deliverables?: string;
  sections?: {
    title: string;
    subtitle?: string;
    items?: string[];
    content?: string;
  }[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "project-1",
    title: "AI Short Film",
    category: "AI Video",
    thumbnail: "https://placehold.co/400x280/0a0a0a/98F4F9?text=AI+Short+Film",
    description: "Cinematic AI-generated short film",
    videoUrl: "/assets/portfolio/ai-short-film.mp4",
    fullDescription: "<p>A 3-minute cinematic AI-generated short film exploring the boundaries between human creativity and machine imagination. Every frame crafted through iterative AI generation with precise art direction.</p><p>Selected for 2 digital film festivals. 1.8M organic views across platforms.</p>",
    technologies: ["Runway Gen-3", "Kling", "After Effects", "DaVinci Resolve"],
    client: "Internal Project",
    year: "2026",
    layout: "video-split",
    duration: "3 min",
    budget: "$4,500",
    deliverables: "Final film + BTS + Social cuts",
    sections: [
      {
        title: "What We Delivered",
        items: [
          "3-minute cinematic short film",
          "Behind-the-scenes documentary",
          "12 social media cuts",
          "Film festival submission package"
        ]
      },
      {
        title: "Creative Process",
        content: "Combined Runway Gen-3 and Kling AI for primary generation, with extensive post-production in DaVinci Resolve. Each shot went through 15-20 iterations to achieve the exact mood and visual consistency needed for a cohesive narrative."
      }
    ]
  },
  {
    id: "project-game-trailer",
    title: "Game Trailer",
    category: "AI Video",
    thumbnail: "https://placehold.co/400x280/0a0a0a/98F4F9?text=Game+Trailer",
    description: "AI-powered cinematic game trailer",
    videoUrl: "/assets/portfolio/game-trailer.mp4",
    fullDescription: "<p>A high-impact cinematic game trailer produced entirely with AI video generation tools. Blending epic world-building with intense action sequences to create a trailer that rivals traditional CGI production at a fraction of the cost and timeline.</p>",
    technologies: ["Runway Gen-3", "Kling", "Midjourney", "After Effects", "Unreal Engine"],
    client: "Indie Game Studio",
    year: "2026",
    layout: "video-split",
    duration: "1.5 min",
    budget: "$3,000",
    deliverables: "Trailer + Teaser + Key art",
    sections: [
      {
        title: "What The Package Delivers",
        items: [
          "90-second cinematic trailer",
          "30-second teaser cut",
          "Key art & thumbnail assets",
          "Steam page visual package",
          "Social media promo kit"
        ]
      },
      {
        title: "Production Pipeline",
        subtitle: "End-to-end AI-native workflow",
        content: "World-building and concept art generated through Midjourney with custom style references. Hero shots produced with Runway Gen-3 and Kling AI, composited and graded in After Effects. Final environment extensions done in Unreal Engine for seamless CG-AI integration."
      },
      {
        title: "Results",
        items: [
          "85% cost reduction vs traditional CGI",
          "3-week delivery (vs 3-month industry standard)",
          "Steam wishlist conversion +40%",
          "2.1M trailer views in first month"
        ]
      }
    ]
  },
  {
    id: "project-2",
    title: "Ethereal Product Launch",
    category: "AI Image",
    thumbnail: "https://placehold.co/400x280/0a0a0a/a78bfa?text=Ethereal+Launch",
    description: "Complete visual identity generated through AI",
    fullDescription: "<p>Developed a cohesive visual language for a luxury wellness brand using Midjourney and custom LoRA training. Generated 300+ product shots, lifestyle imagery, and brand assets maintaining perfect stylistic consistency.</p><p>The AI-generated imagery reduced photography costs by 85% while delivering unique, on-brand visuals impossible to achieve through traditional means.</p>",
    technologies: ["Midjourney", "Stable Diffusion", "Photoshop"],
    client: "Ethereal Wellness",
    year: "2026"
  },
  {
    id: "project-3",
    title: "Kinetic Brand Identity",
    category: "Creative Direction",
    thumbnail: "https://placehold.co/400x280/0a0a0a/f97316?text=Kinetic+Brand",
    description: "Motion-first brand system with AI-powered assets",
    fullDescription: "<p>Comprehensive brand identity built around motion and transformation. Directed the creation of an adaptive logo system with 50+ AI-generated variations that respond to context and user interaction.</p><p>Delivered brand guidelines, motion toolkit, and 20+ animated brand expressions. The system won a Webby honoree award for innovative brand design.</p>",
    technologies: ["Spline", "Three.js", "GSAP", "Runway"],
    client: "Kinetic Studios",
    year: "2025"
  },
  {
    id: "project-4",
    title: "Real-time Video Pipeline",
    category: "Technical Consulting",
    thumbnail: "https://placehold.co/400x280/0a0a0a/06b6d4?text=Video+Pipeline",
    description: "Custom AI video generation infrastructure",
    fullDescription: "<p>Built production-ready infrastructure for a media company to generate personalized video content at scale. Integrated Runway API, custom ML models, and rendering pipeline processing 1000+ videos daily.</p><p>System architecture includes queue management, error handling, webhook callbacks, and S3 storage integration. Reduced video production time from 2 hours to 8 minutes per asset.</p>",
    technologies: ["Runway API", "Node.js", "AWS Lambda", "FFmpeg"],
    client: "MediaFlow",
    year: "2026"
  },
  {
    id: "project-5",
    title: "Immersive Exhibition",
    category: "AI Video",
    thumbnail: "https://placehold.co/400x280/0a0a0a/98F4F9?text=Immersive+Exhibition",
    description: "Multi-screen AI video installation",
    fullDescription: "<p>Created a 12-minute generative video experience for an art gallery installation. Six synchronized screens displaying evolving AI-generated landscapes that respond to ambient sound and visitor presence.</p><p>Combined Runway Gen-3, Pika Labs, and custom TouchDesigner programming for real-time manipulation. Exhibited for 3 months with 15,000+ visitors.</p>",
    technologies: ["Runway Gen-3", "Pika Labs", "TouchDesigner", "Max/MSP"],
    client: "Contemporary Arts Center",
    year: "2025"
  },
  {
    id: "project-6",
    title: "Fashion Week Visuals",
    category: "AI Image",
    thumbnail: "https://placehold.co/400x280/0a0a0a/a78bfa?text=Fashion+Week",
    description: "Real-time AI fashion visualization",
    fullDescription: "<p>Generated 500+ unique fashion looks and runway environments for digital fashion week. Used custom-trained Stable Diffusion models on designer's previous collections to create new, on-brand designs.</p><p>Live-generated visuals during the show responded to music and pacing. The show reached 100K+ live viewers and was featured in Vogue and WWD.</p>",
    technologies: ["Stable Diffusion", "LoRA Training", "ComfyUI", "Resolume"],
    client: "DigitalFW",
    year: "2025"
  }
];

export interface Capability {
  id: string;
  title: string;
  icon: "Video" | "Image" | "Sparkles" | "Code";
  description: string;
  features: string[];
  glowColor: "purple" | "cyan" | "orange" | "blue";
  size: "large" | "medium" | "wide";
}

export const capabilities: Capability[] = [
  {
    id: "video",
    title: "AI Video Production",
    icon: "Video",
    description: "From concept to final cut, AI-powered video production that pushes creative boundaries",
    features: [
      "Runway Gen-3 & Sora integration",
      "Custom motion control",
      "Style-consistent generation",
      "Post-production & editing"
    ],
    glowColor: "purple",
    size: "large"
  },
  {
    id: "image",
    title: "AI Image Generation",
    icon: "Image",
    description: "Photorealistic imagery and artistic visuals powered by cutting-edge AI models",
    features: [
      "Midjourney & Stable Diffusion",
      "Custom model training",
      "Brand-consistent assets",
      "High-resolution output"
    ],
    glowColor: "cyan",
    size: "medium"
  },
  {
    id: "creative",
    title: "Creative Direction",
    icon: "Sparkles",
    description: "Strategic vision and art direction for AI-powered campaigns and experiences",
    features: [
      "Concept development",
      "Brand identity systems",
      "Campaign strategy",
      "Experience design"
    ],
    glowColor: "orange",
    size: "medium"
  },
  {
    id: "technical",
    title: "Technical Consulting",
    icon: "Code",
    description: "Custom AI infrastructure, API integrations, and production pipelines",
    features: [
      "API integration (Runway, Replicate)",
      "Custom ML pipelines",
      "Automation & scaling",
      "Technical strategy"
    ],
    glowColor: "blue",
    size: "wide"
  }
];

export interface TechStackItem {
  name: string;
  category: string;
}

export const techStack: TechStackItem[] = [
  { name: "Runway ML", category: "Video Generation" },
  { name: "Midjourney", category: "Image AI" },
  { name: "Stable Diffusion", category: "Image AI" },
  { name: "GSAP", category: "Animation" },
  { name: "Three.js", category: "3D" },
  { name: "Spline", category: "3D Design" },
  { name: "After Effects", category: "Post Production" },
  { name: "Figma", category: "Design" }
];
