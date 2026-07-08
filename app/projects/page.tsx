// Server component — static header rendered on the server; interactive grid is client-only
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { ProjectsGrid } from '@/components/sections/projects-grid';

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <Container className="py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6">Projects</h1>
        <p className="text-xl text-neutral-400 mb-12 max-w-3xl">
          Projects active within Storm-OS.
        </p>
        <ProjectsGrid />
      </Container>
    </PageWrapper>
  );
}
