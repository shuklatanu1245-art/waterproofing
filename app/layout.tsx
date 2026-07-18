import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { HiddenAdminButton } from "@/components/ui/HiddenAdminButton";
import { getLogo } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Syon Enterprises | Professional Waterproofing Services",
  description: "Stop water leakage before it causes serious damage. Professional waterproofing solutions for homes, apartments, offices & commercial buildings.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logo = await getLogo();
  
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar logo={logo} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer logo={logo} />
        <FloatingWhatsApp />
        <HiddenAdminButton />
      </body>
    </html>
  );
}
