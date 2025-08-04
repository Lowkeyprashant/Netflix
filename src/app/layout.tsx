// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer"; // <-- New import here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamifyy",
  description: "A Netflix clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer /> {/* <-- New component here */}
      </body>
    </html>
  );
}