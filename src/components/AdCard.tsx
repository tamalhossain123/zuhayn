import type { WorkSample } from "@/data/site";
import Image from "next/image";
import Reveal from "./Reveal";

/** Original-design work card: coloured ad stage with the original
 *  artwork, brand/offer row, headline, sub and pill button, plus the
 *  figcaption underneath - exactly as in the single-file design. */
export default function AdCard({ work }: { work: WorkSample }) {
  return (
    <Reveal as="figure" className="ad-card">
      <div className={`ad-stage ${work.stage}`}>
        <Image className="ad-photo" src={work.photo} alt="" width={620} height={620} />
        <div className="ad-brand">
          <span className="ad-logo">{work.logo}</span>
          <span className="ad-offer">{work.offer}</span>
        </div>
        <h3>
          {work.headlineTop} <em>{work.headlineEm}</em>
        </h3>
        <p className="ad-sub">{work.sub}</p>
        <span className="ad-btn">{work.cta}</span>
      </div>
      <figcaption>
        <span className="s-tag">{work.tag}</span>
        <b>{work.kind}</b>
        <span>{work.description}</span>
      </figcaption>
    </Reveal>
  );
}
