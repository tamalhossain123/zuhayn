import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import {
  AboutShowcase,
  ClientTrack,
  ContactBlock,
  FounderBlock,
  HeroHome,
  FeatureWork,
  IndustryRows,
  PartnerStrip,
  SectionIntro,
  ServiceList,
} from "@/components/Sections";
import { SITE, WORK } from "@/data/site";

export const metadata: Metadata = {
  title: "ZUHAYN - Creative & IT Solutions | Digital Marketing & Design Agency, Dhaka",
  description:
    "ZUHAYN - Creative & IT Solutions in Dhaka, Bangladesh. Digital marketing, creative design, branding, video editing and web design that helps brands grow. Call +8801917653545.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ZUHAYN - Creative & IT Solutions | Digital Marketing & Design Agency, Dhaka",
    description:
      "We grow brands with bold digital marketing, creative design, branding and websites. ZUHAYN is a Dhaka-based creative & IT solutions agency serving clients worldwide.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZUHAYN - Creative & IT Solutions, Dhaka",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroHome />

      {/* ---------- About + funfacts ---------- */}
      <section aria-label="About Zuhayn">
        <div className="wrap">
          <AboutShowcase />
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" aria-label="Our services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Our Service"
            text="From the first logo sketch to the ad campaign that brings in customers, we build everything your brand needs to look professional and grow online, all under one roof."
          />
          <ServiceList />
        </div>
      </section>

      {/* ---------- Featured work ---------- */}
      <section aria-label="Featured work" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Featured Work"
            text="Scroll-stopping creative for real businesses: sale campaigns, offer ads and brand visuals that turn viewers into buyers, callers and customers."
          />
          {WORK.slice(0, 3).map((w) => (
            <FeatureWork key={w.id} work={w} />
          ))}
          <div className="more-wrap">
            <Link href="/work" className="btn btn-ghost">
              See All Work
              <SvgArt index={0} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Industries (numbered rows) ---------- */}
      <section aria-label="Industries we serve" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Industries"
            text="We design and market for clothing brands, restaurants, builders and electronics businesses that sell products and want more customers."
          />
          <IndustryRows />
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <section aria-label="Meet the founder" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="The Team"
            text="No agencies between agencies: every project at Zuhayn is led personally by the founder, from the first idea to the final delivery."
          />
          <FounderBlock />
        </div>
      </section>

      {/* ---------- Clients track ---------- */}
      <section className="track-sec" aria-label="Our clients" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Our Clients"
            text="Real companies across Bangladesh and worldwide have trusted Zuhayn with their design, their campaigns and their growth."
          />
        </div>
        <ClientTrack />
      </section>

      {/* ---------- Contact ---------- */}
      <section aria-label="Contact Zuhayn" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ContactBlock />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
