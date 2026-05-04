import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { homepageJsonLd } from "@/lib/seo/jsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
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
            <ErrorBoundary>
              <main>{children}</main>
            </ErrorBoundary>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
