import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import { FAQS } from "@/components/Faqs";
import {
  AboutShowcase,
  ContactBlock,
  FaqList,
  FounderBlock,
  PageHead,
  PartnerStrip,
  ROMAN,
  SecHead2,
} from "@/components/Sections";

export const metadata: Metadata = {
  title: "About ZUHAYN - Creative & IT Solutions, Dhaka",
  description:
    "Founded in 2020 in Dhaka, ZUHAYN helps small and growing businesses get big-brand quality design and marketing, digital marketing, branding, video editing and web design.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ZUHAYN - Creative & IT Solutions, Dhaka",
    description:
      "The agency behind ambitious brands. One Dhaka team for your design and your growth, since 2020.",
    url: "/about",
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

const WHY = [
  {
    title: "Creative + marketing under one roof",
    text: "Your designs and your campaigns are planned together, so your brand looks consistent and your ads hit harder.",
  },
  {
    title: "Fast turnaround",
    text: "Business moves quickly, so do we. Clear timelines, quick delivery, and designs ready when your campaign needs them.",
  },
  {
    title: "Honest reporting",
    text: "Straightforward updates on what was done and what it achieved. No jargon, no inflated claims, just clear work you can check.",
  },
  {
    title: "Dhaka-based, serving the world",
    text: "A local team that understands Bangladeshi businesses, and delivers to the standard international clients expect.",
  },
];

const PROCESS = [
  {
    icon: 10,
    title: "Discover",
    text: "We learn your business, your customers and your competitors before a single design is made or a single taka is spent on ads.",
  },
  {
    icon: 6,
    title: "Create",
    text: "Designs, campaigns and content built around one clear goal: work that looks premium and turns viewers into customers.",
  },
  {
    icon: 5,
    title: "Grow",
    text: "We launch, measure honestly, and keep improving what works, so growth compounds month after month.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumb="About Us"
        title={
          <>
            The Agency Behind <span className="it">Ambitious</span> Brands
          </>
        }
        lede="A Dhaka creative and IT team helping ambitious businesses grow with bold design and honest marketing, since 2020."
      />

      {/* ---------- story + funfacts ---------- */}
      <section aria-label="Our story">
        <div className="wrap">
          <AboutShowcase />
        </div>
      </section>

      {/* ---------- why us (numbered rows) ---------- */}
      <section aria-label="Why Zuhayn" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="Why Us"
            title={
              <>
                Built On <span className="it">Trust</span>, Run On Results
              </>
            }
          />
          <div className="numrows">
            {WHY.map((w, i) => (
              <Reveal className="numrow" key={w.title}>
                <span className="rn">{ROMAN[i]}.</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
                <span className="nr-side">Since 2020</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section aria-label="Our process" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="Our Process"
            title={
              <>
                How Every Project <span className="it">Moves</span>
              </>
            }
          />
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <Reveal className="process-box" key={p.title}>
                <span className="rn">{ROMAN[i]}.</span>
                <span className="ic">
                  <SvgArt index={p.icon} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section aria-label="Frequently asked questions" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="FAQ"
            title={
              <>
                Questions, <span className="it">Answered</span>
              </>
            }
          />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* ---------- founder ---------- */}
      <section aria-label="Meet the founder" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead2
            kicker="The Team"
            title={
              <>
                Meet The <span className="it">Founder</span>
              </>
            }
          />
          <FounderBlock />
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section aria-label="Contact Zuhayn" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ContactBlock />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
