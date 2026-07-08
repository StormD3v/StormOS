/**
 * Project type definition
 */
export interface Project {
  id: string;
  title: string;
  displayName?: string;         // Public-facing name shown in UI
  description: string;          // Concise factual description — suitable for cards, metadata, APIs
  image?: string;
  tags: string[];
  technologies: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  route?: string;               // Optional navigation route — only set when a dedicated page exists
  startDate?: string;
  endDate?: string;
}

/**
 * Skill type definition
 */
export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: number; // 0–100, optional — not displayed in current UI
  years?: number;       // optional — not displayed in current UI
}

/**
 * Talk type definition
 */
export interface Talk {
  id: string;
  title: string;
  description: string;
  event: string;
  date: string;
  location: string;
  videoUrl?: string;
  slidesUrl?: string;
  tags: string[];
}

/**
 * Blog post type definition
 */
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  coverImage?: string;
}

/**
 * Social link type definition
 */
export interface SocialLink {
  platform: string;
  url: string | null;   // null when no public URL exists (e.g. Discord username-only)
  icon: string;
  username?: string;    // Display name for platforms without a linkable URL
}

/**
 * Contact form type definition
 */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Waitlist form type definition
 */
export interface WaitlistForm {
  email: string;
  name?: string;
  company?: string;
  interest?: string;
}
