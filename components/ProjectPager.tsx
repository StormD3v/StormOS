import { projects } from '@/content/projects';
import Link from 'next/link';

interface ProjectPagerProps {
  currentSlug: string;
}

export function ProjectPager({ currentSlug }: ProjectPagerProps) {
  // Filter projects that have dedicated pages
  const projectsWithPages = projects.filter((p) => p.route);

  // If fewer than 2 projects have pages, render nothing
  if (projectsWithPages.length < 2) {
    return null;
  }

  // Find current project index
  const currentIndex = projectsWithPages.findIndex((p) => p.id === currentSlug);

  // If current project not found, render nothing
  if (currentIndex === -1) {
    return null;
  }

  // Calculate previous and next indices with wrap-around
  const prevIndex = currentIndex === 0 ? projectsWithPages.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projectsWithPages.length - 1 ? 0 : currentIndex + 1;

  const prevProject = projectsWithPages[prevIndex];
  const nextProject = projectsWithPages[nextIndex];

  return (
    <div className="flex items-center justify-between gap-4 pt-8 border-t border-neutral-800/60 max-sm:pb-10">
      <Link
        href={prevProject.route!}
        className="flex-1 text-left group"
      >
        <div className="text-sm font-semibold text-neutral-200 text-readable mb-1 group-hover:text-neutral-100 transition-colors whitespace-nowrap">
          ← Previous
        </div>
        <div className="text-base font-bold text-white text-readable group-hover:text-accent-purple transition-colors">
          {prevProject.displayName}
        </div>
      </Link>

      <Link
        href={nextProject.route!}
        className="flex-1 text-right group"
      >
        <div className="text-sm font-semibold text-neutral-200 text-readable mb-1 group-hover:text-neutral-100 transition-colors whitespace-nowrap">
          Next →
        </div>
        <div className="text-base font-bold text-white text-readable group-hover:text-accent-purple transition-colors">
          {nextProject.displayName}
        </div>
      </Link>
    </div>
  );
}
