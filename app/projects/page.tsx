// Server component — static header rendered on the server; interactive grid is client-only
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { ProjectsGrid } from '@/components/sections/projects-grid';

export default function ProjectsPage() {
  return (
    <PageWrapper enableDesktopBackground mobileBackgrounds={[
      '/images/wallpaper-identity.webp',
      '/images/inner-code.webp',
      '/images/wallpaper-stormcash.webp',
      '/images/wallpaper-contact.webp',
    ]}>
      <Container className="py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-12">Projects</h1>
        <ProjectsGrid />
      </Container>
    </PageWrapper>
  );
}
