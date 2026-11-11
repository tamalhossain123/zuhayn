import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Original-design section head: kicker, big Sora display title with a
 *  sky accent span, and an intro paragraph - same markup as the
 *  single-file design's .sec-head. */
export default function SectionHead({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <Reveal className="sec-head">
      <p className="kicker">{kicker}</p>
      <h2 className="display">{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </Reveal>
  );
}
