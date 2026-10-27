import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { ScrollController } from '@/components/ui/scroll-controller';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'StormD3v',
    template: '%s | StormD3v',
  },
  description:
    'StormD3v is the public identity of Friday Gift Chinechenum Azunda. Long-term ideas, designed and built inside Storm-OS.',
  keywords: [
    'StormD3v',
    'WorldForge',
    'Friday Gift Azunda',
    'software engineer',
    'developer',
    'indie projects',
    'React',
    'Django',
    'FastAPI',
  ],
  authors: [{ name: 'Friday Gift Chinecherem Azunda' }],
  openGraph: {
    title: 'StormD3v',
    description:
      'StormD3v is the public identity of Friday Gift Chinechenum Azunda. Long-term ideas, designed and built inside Storm-OS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StormD3v',
    description:
      'StormD3v is the public identity of Friday Gift Chinechenum Azunda. Long-term ideas, designed and built inside Storm-OS.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ overscrollBehaviorY: 'none', backgroundColor: '#0a0a0a', overflowX: 'clip', maxWidth: '100%' }}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`} style={{ overscrollBehaviorY: 'none', backgroundColor: '#0a0a0a', overflowX: 'clip', maxWidth: '100%' }}>
        <ScrollProgress />
        <ScrollController />
        {children}
      </body>
    </html>
  );
}
