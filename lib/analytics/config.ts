// Server-safe analytics constants. No `"use client"` and no imports from
// `@next/third-parties/google` so app/layout.tsx (a server component) can read
// these without dragging the GA runtime into the root client bundle.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Gating prod-only keeps developer clicks out of the live property. To smoke
// test GA locally: `npm run build && npm run start`.
export const ANALYTICS_ENABLED =
  Boolean(GA_ID) && process.env.NODE_ENV === "production";
