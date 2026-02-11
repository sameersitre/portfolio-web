import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sameer Sitre — Software Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(245,158,11,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
          }}
        >
          {/* Initials badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "#f59e0b",
              fontSize: "36px",
              fontWeight: 700,
              color: "#0a0a0a",
            }}
          >
            SS
          </div>

          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Sameer Sitre
          </h1>

          <p
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              margin: 0,
            }}
          >
            Senior Frontend Engineer
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {["React", "Next.js", "React Native", "TypeScript"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 18,
                  color: "#f59e0b",
                  backgroundColor: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p
            style={{
              fontSize: 18,
              color: "#71717a",
              margin: 0,
              marginTop: "4px",
            }}
          >
            sameersitre.dev
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
