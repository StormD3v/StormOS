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
  description: 'StormOS is the long-term home of everything I build. Ambitious ideas, serious execution, no shortcuts.',
  keywords: ['StormD3v', 'StormOS', 'WorldForge', 'software engineer', 'developer', 'indie projects'],
  authors: [{ name: 'Storm' }],
  openGraph: {
    title: 'StormD3v',
    description: 'StormOS is the long-term home of everything I build. Ambitious ideas, serious execution, no shortcuts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StormD3v',
    description: 'StormOS is the long-term home of everything I build. Ambitious ideas, serious execution, no shortcuts.',
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
