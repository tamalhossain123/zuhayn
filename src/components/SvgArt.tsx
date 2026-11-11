import { SVG_ART } from "@/data/svgart";

/**
 * Renders one of the original design's inline SVGs, verbatim.
 * The SVG markup (including its original CSS classes, e.g. .ad-art,
 * .line-anim) is injected as-is so the ported original stylesheet
 * styles it exactly like the single-file design did.
 */
export default function SvgArt({
  index,
  className,
  as: Tag = "span",
  style,
}: {
  index: number;
  className?: string;
  as?: "span" | "div";
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      className={className}
      style={style}
      aria-hidden={undefined}
      dangerouslySetInnerHTML={{ __html: SVG_ART[index] ?? "" }}
    />
  );
}
