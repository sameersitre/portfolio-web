import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipToContent } from "@/components/ui/SkipToContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sameer Sitre — Software Engineer",
  description:
    "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications. React, Next.js, React Native, TypeScript.",
  keywords: [
    "Sameer Sitre",
    "Frontend Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Sameer Sitre" }],
  metadataBase: new URL("https://sameersitre.dev"),
  openGraph: {
    title: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    url: "https://sameersitre.dev",
    siteName: "Sameer Sitre",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sameer Sitre",
  url: "https://sameersitre.dev",
  jobTitle: "Senior Frontend Engineer",
  worksFor: {
    "@type": "Organization",
    name: "The Real Brokerage",
  },
  sameAs: [
    "https://github.com/sameersitre",
    "https://www.linkedin.com/in/sameersitre",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Frontend Development",
    "Mobile Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SkipToContent />
          <ScrollProgress />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
