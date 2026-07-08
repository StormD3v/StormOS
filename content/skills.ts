import { Skill } from '@/types';

/**
 * Technology stack content.
 *
 * This is the single source of truth for the technologies shown on the site.
 * These are the tools Friday Gift Chinecherem Azunda actually builds with,
 * not the technologies used to build this website.
 *
 * Components read from this array. Adding, removing, or renaming an entry
 * here automatically updates every consumer without code changes.
 *
 * proficiency and years are intentionally omitted — they require constant
 * maintenance and add noise rather than signal.
 */
export const skills: Skill[] = [
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'django', name: 'Django', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend' },
  { id: 'pytorch', name: 'PyTorch', category: 'AI/ML' },
  { id: 'huggingface', name: 'HuggingFace', category: 'AI/ML' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend' },
];
