import type {Metadata} from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FinJoy Finance | Mutual Fund Clarity',
  description: 'Simple mutual fund clarity for long-term investors. Mutual fund advisory in Mumbai.',
  icons: {
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMic+PGNpcmNsZSBjeD0nMTYnIGN5PScxNicgcj0nMTYnIGZpbGw9JyNjOWEyMjcnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgdGV4dC1hbmNob3I9J21pZGRsZScgZHk9Jy4zZW0nIGZpbGw9JyMwZDFiMmUnIGZvbnQtZmFtaWx5PSdzYW5zLXNlcmlmJyBmb250LXdlaWdodD0nYm9sZCcgZm9udC1zaXplPScyMCc+RjwvdGV4dD48L3N2Zz4=',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
