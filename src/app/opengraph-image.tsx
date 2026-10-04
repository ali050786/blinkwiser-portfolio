import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f7f9fa", color: "#0b0d0d" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#0b0d0d", color: "#f7f9fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>SA</div>
          {site.name} · {site.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -3, fontWeight: 600, maxWidth: 980 }}>The brief is usually a symptom.</div>
          <div style={{ fontSize: 28, color: "#5a5854", maxWidth: 900 }}>Regulated enterprise SaaS · health insurance · government · AI</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["#6d3fd1", "#b84500", "#1d5fa8", "#157068", "#916508"].map((c) => (
            <div key={c} style={{ width: 120, height: 10, borderRadius: 5, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
