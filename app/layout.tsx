import './globals.css';
import { Inter } from 'next/font/google';
import { ClientComponents } from "@/components/ClientComponents";
import { Metadata, Viewport } from 'next';
import React from 'react';

// Load Inter font with swapping to prevent FOIT (Flash of Invisible Text)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

// Metadata for the application
export const metadata: Metadata = {
  title: 'FusionPay | Crypto Payments Made Easy',
  description: 'A simple and secure way to pay with cryptocurrency',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark light',
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#4F46E5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-background">
        <ClientComponents>{children}</ClientComponents>
      </body>
    </html>
  );
}