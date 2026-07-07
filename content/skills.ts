import { Skill } from '@/types';

/**
 * Skills content.
 *
 * Each entry follows the Skill interface from @/types.
 * Fields marked [PLACEHOLDER] must be replaced with real data before launch.
 *
 * - proficiency: 0–100 (shown as a progress bar)
 * - years: optional, shown as secondary context
 * - category: used to group skills into columns
 */
export const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', proficiency: 90, years: 4 }, // [PLACEHOLDER: update with real values]
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', proficiency: 85, years: 3 }, // [PLACEHOLDER]
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', proficiency: 85, years: 3 }, // [PLACEHOLDER]
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, years: 3 }, // [PLACEHOLDER]

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend', proficiency: 80, years: 4 }, // [PLACEHOLDER]
  { id: 'python', name: 'Python', category: 'Backend', proficiency: 75, years: 3 }, // [PLACEHOLDER]
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend', proficiency: 70, years: 2 }, // [PLACEHOLDER]

  // Tools & DevOps
  { id: 'git', name: 'Git', category: 'Tools & DevOps', proficiency: 90, years: 5 }, // [PLACEHOLDER]
  { id: 'docker', name: 'Docker', category: 'Tools & DevOps', proficiency: 75, years: 2 }, // [PLACEHOLDER]
  { id: 'aws', name: 'AWS', category: 'Tools & DevOps', proficiency: 70, years: 2 }, // [PLACEHOLDER]
];
