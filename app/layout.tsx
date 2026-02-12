import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { FloTraceProvider } from "@/lib/flotrace/index.mjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
  creator: "Sameer Sitre",
  metadataBase: new URL("https://sameersitre.dev"),
  alternates: {
    canonical: "https://sameersitre.dev",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    url: "https://sameersitre.dev",
    siteName: "Sameer Sitre",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sameer Sitre — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://sameersitre.dev/#profilepage",
    name: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    url: "https://sameersitre.dev",
    mainEntity: {
      "@type": "Person",
      "@id": "https://sameersitre.dev/#person",
      name: "Sameer Sitre",
      url: "https://sameersitre.dev",
      jobTitle: "Senior Frontend Engineer",
      email: "mailto:sameersitre@gmail.com",
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
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sameersitre.dev/#website",
    url: "https://sameersitre.dev",
    name: "Sameer Sitre",
    description: "Portfolio of Sameer Sitre, Senior Frontend Engineer",
    publisher: {
      "@id": "https://sameersitre.dev/#person",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0a"
          media="(prefers-color-scheme: dark)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FloTraceProvider
            config={{
              appName: "Sameer Portfolio",
              enabled: process.env.NODE_ENV === "development",
            }}
          >
            <SkipToContent />
            <ScrollProgress />
            <SmoothScroll>
              <Header />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </FloTraceProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
