import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
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
