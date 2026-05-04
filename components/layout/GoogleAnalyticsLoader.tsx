"use client";

// Lazy-mount the GA gtag.js loader. Loaded via next/dynamic so
// @next/third-parties/google stays out of the root client bundle and only
// hydrates when ANALYTICS_ENABLED resolves true at runtime.

import dynamic from "next/dynamic";
import { ANALYTICS_ENABLED, GA_ID } from "@/lib/analytics/config";

const GoogleAnalytics = dynamic(
  () =>
    import("@next/third-parties/google").then((m) => ({
      default: m.GoogleAnalytics,
    })),
  { ssr: false },
);

export function GoogleAnalyticsLoader() {
  if (!ANALYTICS_ENABLED || !GA_ID) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
