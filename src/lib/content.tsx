"use client";

/**
 * Live CMS content for the website.
 *
 * The site is a static export, so every page first renders with the
 * built-in data from src/data/site.ts (fast, SEO friendly). This provider
 * then fetches the CMS content from the PHP backend and swaps it in, so
 * edits made in the admin panel appear without a rebuild. If the backend
 * is unreachable, the built-in content simply stays.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { SITE, type Client, type Industry, type Service, type WorkSample } from "@/data/site";

export type PkgTier = {
  name: string;
  price: string;
  per: string;
  feats: string[];
  pop?: boolean;
};
export type Pkg = { note?: string; tiers: PkgTier[] };
export type Faq = { q: string; a: string };
export type Stat = { value: number; suffix: string; label: string; plain: boolean };

export type CmsContent = {
  settings: Record<string, string>;
  services: Service[];
  pricing: Record<string, Pkg>;
  works: WorkSample[];
  clients: Client[];
  industries: Industry[];
  faqs: Faq[];
  pricing_faqs: Faq[];
  stats: Stat[];
};

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

const Ctx = createContext<CmsContent | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CmsContent | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}/api/content.php`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && d.ok) setContent(d as CmsContent);
      })
      .catch(() => {
        /* backend offline: built-in content stays */
      });
    return () => {
      alive = false;
    };
  }, []);
  return <Ctx.Provider value={content}>{children}</Ctx.Provider>;
}

export function useContent(): CmsContent | null {
  return useContext(Ctx);
}

/** SITE-shaped object: CMS settings layered over the built-in SITE data. */
export function useSite(): typeof SITE {
  const c = useContent();
  if (!c || !c.settings) return SITE;
  const s = c.settings;
  const pick = (k: string, fallback: string) =>
    s[k] && s[k].trim() !== "" ? s[k] : fallback;
  return {
    ...SITE,
    name: pick("site_name", SITE.name),
    legalName: pick("legal_name", SITE.legalName),
    phoneDisplay: pick("phone_display", SITE.phoneDisplay),
    phoneHref: pick("phone_href", SITE.phoneHref),
    facebook: pick("facebook", SITE.facebook),
    linkedin: pick("linkedin", SITE.linkedin),
    address: pick("address", SITE.address),
    city: pick("city", SITE.city),
    country: pick("country", SITE.country),
    founded: pick("founded", SITE.founded),
    founder: pick("founder", SITE.founder),
  };
}
