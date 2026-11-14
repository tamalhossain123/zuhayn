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
  SecHead2,
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
          <SecHead2
            kicker="What We Do"
            title={
              <>
                Services That Make Your Brand <span className="it">Impossible</span> To Ignore
              </>
            }
            right="From the first logo sketch to the ad campaign that brings in customers, everything your business needs to look professional and grow online, in one place."
          />
          <ServiceList />
        </div>
      </section>

      {/* ---------- Featured work ---------- */}
      <section aria-label="Featured work" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="Featured Work"
            title={
              <>
                Recent Projects, <span className="it">Real</span> Businesses
              </>
            }
            right="Design samples that sell, for businesses that sell products: fashion, food, construction and electronics."
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
          <SecHead2
            kicker="Industries"
            title={
              <>
                Who We <span className="it">Design &amp; Market</span> For
              </>
            }
          />
          <IndustryRows />
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <section aria-label="Meet the founder" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="The Team"
            title={
              <>
                Led By The <span className="it">Founder</span>, Personally
              </>
            }
            right="No agencies-between-agencies. The person you meet is the person who leads your project."
          />
          <FounderBlock />
        </div>
      </section>

      {/* ---------- Clients track ---------- */}
      <section className="track-sec" aria-label="Our clients" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="Our Clients"
            title={
              <>
                Brands We&apos;ve <span className="it">Worked</span> With
              </>
            }
            right="Real companies that trusted Zuhayn with their design and marketing."
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
