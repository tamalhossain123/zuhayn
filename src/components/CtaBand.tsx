import Link from "next/link";
import SvgArt from "./SvgArt";
import Reveal from "./Reveal";

/** Original-design CTA banner (home page bottom, reused on inner pages). */
export default function CtaBand({
  title = "Ready To Grow Your Brand?",
  text = "Tell us about your project, a campaign, a new brand, a website, and get a clear plan and price, free.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="cta-banner">
      <div className="wrap">
        <Reveal className="cta-in">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link href="/contact" className="btn btn-primary">
            Get a Free Quote
            <SvgArt index={0} />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
