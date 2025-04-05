import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import SessionChecker from '@/components/auth/SessionChecker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Salomon-CAN 2025 Registration - Morocco',
  description: 'Official registration platform for the Africa Cup of Nations 2025 in Morocco',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionChecker />
        {children}
        <Toaster />
      </body>
    </html>
  );
}