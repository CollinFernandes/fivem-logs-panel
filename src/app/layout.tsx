import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import SessionWrapper from '@/components/session-wrapper';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Masora Logs',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <NuqsAdapter>
        <html lang="de-DE">
          <body className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden dark`}>{children}</body>
        </html>
      </NuqsAdapter>
    </SessionWrapper>
  );
}
