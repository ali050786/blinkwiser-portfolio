import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study";

const accents: Record<string, string> = {
  automation: "#6d3fd1",
  blinkwiser: "#b84500",
  platform: "#1d5fa8",
  enrollment: "#157068",
  civic: "#916508",
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug)!;
  const accent = accents[c.accent] ?? "#3a3ad0";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f9f8f6", color: "#141311", borderTop: `14px solid ${accent}` }}>
        <div style={{ display: "flex", fontSize: 24, color: accent, letterSpacing: 2 }}>
          CASE {c.index} · {c.group.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.04, letterSpacing: -2.5, fontWeight: 600, maxWidth: 1000 }}>{c.title}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ fontSize: 56, color: accent, fontWeight: 600, letterSpacing: -2 }}>{c.headline.value}</span>
            <span style={{ fontSize: 26, color: "#5a5854" }}>{c.headline.label}</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5a5854" }}>
          {site.name} · {site.role}
        </div>
      </div>
    ),
    size,
  );
}
