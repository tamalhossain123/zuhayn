import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import {
  ClientTrack,
  ContactBlock,
  FounderBlock,
  FunFacts,
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
      {/* ---------- Hero (reference layout) ---------- */}
      <div className="hero-sec" id="home">
        <div className="wrap">
          <div className="hero-top-row">
            <div>
              <p className="hero-quote">
                At ZUHAYN, we believe creativity and honest marketing grow any
                business. As a full-service creative and IT team, we turn bold
                ideas into brands, campaigns and websites that bring real
                customers.
              </p>
              <div className="author-info">
                <Image
                  src="/founder.jpg"
                  alt="Mohammad Forhad"
                  width={108}
                  height={108}
                />
                <span>
                  <b>{SITE.founder}</b>
                  <span>Founder &amp; Chief Executive Officer</span>
                </span>
              </div>
            </div>
            <p className="hero-top-desc">
              Founded in 2020 in Dhaka on a simple idea: small and growing
              businesses deserve the same quality of design and marketing as
              the big brands, without the big-agency complexity.
            </p>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span>Digital Marketing</span>
            </span>
            <span className="line">
              <span>
                That <span className="it">Grows</span> Brands
              </span>
            </span>
          </h1>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s Connect
              <SvgArt index={0} />
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About Us
            </Link>
          </div>
        </div>

        <div className="wrap">
          <div className="hero-media">
            <Image
              src="/hero-bg.jpg"
              alt="The Zuhayn team planning a campaign in Dhaka"
              width={1600}
              height={900}
              priority
            />
            <span className="media-badge">
              <span className="dot" /> Digital Marketing Agency, Dhaka
            </span>
          </div>
          <div className="hero-bottom">
            <span className="hb-left">Scroll to explore ↓</span>
            <div className="hb-right">
              <span>
                <b>100+</b> Happy clients
              </span>
              <span>
                <b>9+</b> Services, one roof
              </span>
              <span>
                <b>Since 2020</b> Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- About + funfacts ---------- */}
      <section aria-label="About Zuhayn">
        <div className="wrap">
          <SecHead2
            kicker="About Us"
            title={
              <>
                A Small Team With <span className="it">Big-Brand</span> Standards
              </>
            }
            right="Your designs and your campaigns are planned together, so your brand looks consistent everywhere and your ads hit harder."
          />
          <FunFacts />
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
