import './globals.css';
import Providers from './providers';
import PublicLayoutWrapper from '@/components/layout/PublicLayoutWrapper';

export const metadata = {
  title: 'Savana Tailor Boutique — Premium Tailor Jakarta',
  description: 'Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring. Exclusive • Elegant • Timeless.',
  keywords: 'savana tailor, baju dinas, formal wear, custom tailor, jas premium, jakarta',
  openGraph: {
    title: 'Savana Tailor Boutique',
    description: 'Premium custom tailor boutique — baju dinas, formal wear, custom jas.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
