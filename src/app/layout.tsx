// src/app/layout.tsx

'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePathname } from 'next/navigation';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Hide header on auth pages
  const hideHeader = pathname?.startsWith('/auth/') || pathname === '/profiles';
  
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>Netflix</title>
        <meta name="description" content="Watch TV shows and movies anytime, anywhere. Only on Netflix." />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://api.themoviedb.org" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen flex flex-col">
          {!hideHeader && <Header />}
          <main className={hideHeader ? "flex-1" : "flex-1"}>
            {children}
          </main>
          {!hideHeader && <Footer />}
        </div>
      </body>
    </html>
  );
}