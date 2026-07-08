import { Project } from '@/types';

/**
 * Projects content.
 *
 * This is the single source of truth for factual project data.
 * Descriptions are concise and factual — suitable for cards, metadata,
 * and future API surfaces. Narrative and emotional framing belong in
 * the components that render this data.
 *
 * Flagship detection: the Building Section computes the visually dominant
 * item at render time as the entry where featured === true and
 * status === 'in-progress'. When that changes here, the layout adapts
 * automatically without any component modification.
 *
 * route: only set when a dedicated page exists. Items without a route
 * are displayed but not navigable.
 */
export const projects: Project[] = [
  {
    id: 'worldforge',
    title: 'WorldForge',
    displayName: 'WorldForge',
    description: 'A persistent digital world where identity, history, and consequence are permanent.',
    tags: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'PyTorch'],
    technologies: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'PyTorch'],
    links: {},
    featured: true,
    status: 'in-progress',
    route: '/worldforge',
    startDate: '2024-01-01',
  },
  {
    id: 'real-weather',
    title: 'Real Weather',
    displayName: 'Real Weather',
    description: 'Weather forecasts presented as actionable daily decisions.',
    tags: [],
    technologies: [],
    links: {},
    featured: true,
    status: 'completed',
    // No route — LumiCast does not yet have a dedicated page
  },
];
