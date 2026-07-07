/**
 * Project type definition
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
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
  proficiency: number; // 0-100
  years?: number;
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
  url: string;
  icon: string;
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
