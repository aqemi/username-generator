import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import clsx from 'clsx';

const font = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Usernames Generator',
  description: 'Generate unique and creative usernames effortlessly with our user-friendly username generator app. Discover personalized usernames for your online accounts and enhance your digital identity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx('min-h-screen flex flex-col', font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
