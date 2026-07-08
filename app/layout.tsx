import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ScrollProgress } from '@/components/ui/scroll-progress';
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
    'StormD3v is the studio of Friday Gift Chinecherem Azunda. Ambitious ideas, built with patience.',
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
      'StormD3v is the studio of Friday Gift Chinecherem Azunda. Ambitious ideas, built with patience.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StormD3v',
    description:
      'StormD3v is the studio of Friday Gift Chinecherem Azunda. Ambitious ideas, built with patience.',
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
