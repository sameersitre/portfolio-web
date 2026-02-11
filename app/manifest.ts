import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sameer Sitre — Software Engineer",
    short_name: "Sameer Sitre",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
