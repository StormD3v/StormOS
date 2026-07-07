import { Project } from '@/types';

/**
 * Projects content.
 *
 * Each entry follows the Project interface from @/types.
 * Fields marked [PLACEHOLDER] must be replaced with real data before launch.
 *
 * Status values: 'completed' | 'in-progress' | 'planned'
 * - featured: true  → shown on the homepage section
 * - featured: false → shown only on /projects
 */
export const projects: Project[] = [
  {
    id: 'stormos', // [PLACEHOLDER: replace id with a real slug]
    title: 'StormOS', // [PLACEHOLDER: replace with real project title]
    description: 'A premium portfolio operating system built with Next.js, TypeScript, and Tailwind CSS.', // [PLACEHOLDER]
    longDescription: 'StormOS is the portfolio itself — a demonstration of design system thinking, component architecture, and motion design applied to a personal brand.', // [PLACEHOLDER]
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: {
      github: 'https://github.com', // [PLACEHOLDER: replace with real GitHub URL]
    },
    featured: true,
    status: 'in-progress',
    startDate: '2024-01-01', // [PLACEHOLDER]
  },
];
