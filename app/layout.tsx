import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ANALYTICS_ENABLED, GA_ID } from "@/lib/analytics/config";
import { siteConfig, siteTitle } from "@/lib/site-config";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: siteTitle,
  description: `${siteConfig.description} React, Next.js, React Native, Node.js, TypeScript.`,
  keywords: [
    siteConfig.name,
    siteConfig.title,
    "Software Engineer",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: siteTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteTitle} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.description,
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
        {ANALYTICS_ENABLED && GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
