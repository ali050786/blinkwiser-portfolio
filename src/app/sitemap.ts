import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/colophon`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
