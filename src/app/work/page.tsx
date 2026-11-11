import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import AdCard from "@/components/AdCard";
import SvgArt from "@/components/SvgArt";
import CtaBand from "@/components/CtaBand";
import { INDUSTRIES, WORK } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work & Industries - ZUHAYN, Dhaka",
  description:
    "Design samples and campaign creatives by ZUHAYN for fashion, food, construction and gadget brands, plus the industries we serve: clothing, restaurants, real estate and electronics.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work & Industries - ZUHAYN, Dhaka",
    description:
      "Design samples that sell, for businesses that sell products, fashion, food, construction and electronics.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* ---------- Page hero ---------- */}
      <div className="hero page-hero">
        <span className="hero-glow glow-1" aria-hidden="true" />
        <span className="hero-glow glow-2" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" /> Our Work
            </span>
            <h1 className="display">
              Design Samples That{" "}
              <span className="grad-text accent-italic">Sell</span>
            </h1>
            <p className="lede">
              Fresh ad creatives from our studio, designed for the industries
              we serve. Bold headline, clear offer, one tap to buy. This is
              the standard your brand gets too.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">
                Get a Free Quote
                <SvgArt index={0} />
              </Link>
              <Link href="/results" className="btn btn-ghost">
                See The Results
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="work" id="work" aria-label="Recent work">
        <div className="wrap">
          <SectionHead
            kicker="Recent Work"
            title={
              <>
                Fresh Creatives From <span className="accent">Our Studio</span>
              </>
            }
          />
          <div className="ad-grid">
            {WORK.map((w) => (
              <AdCard key={w.id} work={w} />
            ))}
          </div>
        </div>
      </section>

      <section className="industries" id="industries" aria-label="Industries we serve">
        <div className="wrap">
          <SectionHead
            kicker="Industries We Serve"
            title={
              <>
                Built For Businesses That <span className="accent">Sell Products</span>
              </>
            }
            intro="We specialise in marketing and design for product-based businesses. If you sell clothing, food, buildings or gadgets, we know how to make your products look irresistible and turn viewers into buyers."
          />
          <div className="ind-grid">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.title} as="article" className={`ind ind-${i + 1}`}>
                <div className="ind-top">
                  <span className="ic">
                    <SvgArt index={ind.icon} />
                  </span>
                  <span className="ind-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="ind-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.description}</p>
                  <ul className="ind-tags">
                    {ind.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want Creatives Like These For Your Products?"
        text="Send us your product or offer, we will design the campaign creative and run it where your customers are."
      />
    </>
  );
}
