"use client";

import { useContent, type Faq } from "@/lib/content";
import { FaqList } from "./Sections";

/** FAQ list driven by the CMS, with the page's built-in FAQs as fallback. */
export default function LiveFaqs({
  page,
  fallback,
}: {
  page: "site" | "pricing";
  fallback: Faq[];
}) {
  const c = useContent();
  const live = page === "pricing" ? c?.pricing_faqs : c?.faqs;
  return <FaqList faqs={live?.length ? live : fallback} />;
}
