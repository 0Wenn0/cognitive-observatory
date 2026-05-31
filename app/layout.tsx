import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cognitive Observatory — Wendy Ramírez Burgos',
  description: 'Estratega interdisciplinaria en el cruce de inteligencia artificial, neurociencia y diseño humano. Diseño puentes cognitivos donde tecnología, neurociencia y humanidad convergen.',
  keywords: ['AI Strategy', 'Neuroscience', 'Instructional Design', 'Systems Thinking', 'Human-Centered Innovation'],
  authors: [{ name: 'Wendy Ramírez Burgos' }],
  openGraph: {
    title: 'Cognitive Observatory — Wendy Ramírez Burgos',
    description: 'Building cognitive bridges across systems, learning and human transformation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}