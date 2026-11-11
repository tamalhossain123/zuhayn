import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/work/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/results/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
