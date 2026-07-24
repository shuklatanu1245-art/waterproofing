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
  keywords: [
    "Best waterproofing services",
    "Roof waterproofing contractors",
    "Water leakage solution",
    "Basement waterproofing experts",
    "Terrace waterproofing company",
    "Crack filling and repair services",
    "Industrial waterproofing contractors",
    "Swimming pool waterproofing",
    "Damp proofing treatments",
    "Chemical waterproofing solutions",
    "Waterproofing experts near me",
    "Professional waterproofing company",
    "Syon Enterprises",
    "Syon Enterprises Waterproofing",
    "Syon Enterprises contact number"
  ],
  openGraph: {
    title: "Syon Enterprises | Professional Waterproofing Services",
    description: "Professional waterproofing solutions for homes, apartments, offices & commercial buildings. Stop water leakage today.",
    type: "website",
    locale: "en_US",
    siteName: "Syon Enterprises",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syon Enterprises | Professional Waterproofing Services",
    description: "Professional waterproofing solutions for homes, apartments, offices & commercial buildings.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
