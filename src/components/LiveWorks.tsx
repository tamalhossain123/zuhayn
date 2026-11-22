"use client";

import { WORK } from "@/data/site";
import { useContent } from "@/lib/content";
import { FeatureWork } from "./Sections";

/** Featured-work list driven by the CMS, with the built-in work as fallback. */
export default function LiveWorks({ limit }: { limit?: number }) {
  const c = useContent();
  const works = c?.works?.length ? c.works : WORK;
  const list = limit ? works.slice(0, limit) : works;
  return (
    <>
      {list.map((w) => (
        <FeatureWork key={w.id} work={w} />
      ))}
    </>
  );
}
