import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to StormD3v. For conversations about ambitious ideas.',
};

export default function ContactPage() {
  return (
    <PageWrapper mobileBackgrounds={[
      '/images/wallpaper-contact.webp',
      '/images/wallpaper-identity.webp',
      '/images/inner-code.webp',
      '/images/wallpaper-lumicast.webp',
    ]}>
      <ContactPageContent />
    </PageWrapper>
  );
}
