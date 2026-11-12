import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import SvgArt from "@/components/SvgArt";
import CtaBand from "@/components/CtaBand";
import { SITE } from "@/data/site";

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
    icon: 24,
    title: "Creative + marketing under one roof",
    text: "Your designs and your campaigns are planned together, so your brand looks consistent and your ads hit harder.",
  },
  {
    icon: 25,
    title: "Fast turnaround",
    text: "Business moves quickly, so do we. Clear timelines, quick delivery, and designs ready when your campaign needs them.",
  },
  {
    icon: 26,
    title: "Honest reporting",
    text: "Straightforward updates on what was done and what it achieved. No jargon, no inflated claims, just clear work you can check.",
  },
  {
    icon: 27,
    title: "Dhaka-based, serving the world",
    text: "A local team that understands Bangladeshi businesses, and delivers to the standard international clients expect.",
  },
];

const MINI_STATS = [
  { b: "Since 2020", s: "Creative & IT solutions from Dhaka" },
  { b: "BD + Worldwide", s: "Serving clients at home and abroad" },
  { b: "9 Services", s: "Marketing, design, video, web & AI" },
  { b: "1 Point of Contact", s: "No agencies-between-agencies" },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- Page hero ---------- */}
      <div className="hero page-hero">
        <span className="hero-glow glow-1" aria-hidden="true" />
        <span className="hero-glow glow-2" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" /> About Us
            </span>
            <h1 className="display">
              The Agency Behind{" "}
              <span className="grad-text accent-italic">Ambitious</span> Brands
            </h1>
            <p className="lede">
              A Dhaka creative and IT team helping ambitious businesses grow
              with bold design and honest marketing, since 2020.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">
                Get a Free Quote
                <SvgArt index={0} />
              </Link>
              <Link href="/work" className="btn btn-ghost">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="about" id="about" aria-label="About Zuhayn">
        <div className="wrap about-grid">
          <Reveal className="about-copy">
            <p className="kicker">Our Story</p>
            <h2 className="display" style={{ marginBottom: 22 }}>
              A Small Team With <span className="accent">Big-Brand</span>{" "}
              Standards
            </h2>
            <p>
              <strong>ZUHAYN - Creative &amp; IT Solutions</strong> was founded
              in <strong>2020</strong> in Dhaka, Bangladesh, with a simple
              idea: small and growing businesses deserve the same quality of
              design and marketing as the big brands, without the big-agency
              complexity.
            </p>
            <p>
              Today we help entrepreneurs and businesses present themselves
              professionally and grow online through digital marketing,
              creative and graphic design, branding, video editing and web
              design, working with clients in Bangladesh and abroad.
            </p>
          </Reveal>

          <Reveal className="about-visual">
            <div className="about-card">
              <SvgArt index={23} />
              <h3>
                Zuhayn
                <br />
                At A Glance
              </h3>
              <dl className="about-rows">
                <div>
                  <dt>Founded</dt>
                  <dd>{SITE.founded}</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd className="addr">{SITE.address}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Marketing · Design · Web</dd>
                </div>
                <div>
                  <dt>Clients</dt>
                  <dd>Bangladesh &amp; Worldwide</dd>
                </div>
                <div>
                  <dt>Website</dt>
                  <dd>zuhayn.com</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Founder (separate section) ---------- */}
      <section className="founder-sec" aria-label="Meet the founder">
        <div className="wrap">
          <SectionHead
            kicker="Meet The Founder"
            title={
              <>
                The Face Behind <span className="accent">Zuhayn</span>
              </>
            }
            intro="Every project at Zuhayn is led personally by its founder, from the first idea to the final delivery."
          />
          <Reveal className="founder-card">
            <div className="founder-side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="founder-photo"
                src="/founder.jpg"
                alt="Mohammad Forhad, Founder and CEO of Zuhayn, speaking at an event"
                width={900}
                height={806}
              />
            </div>
            <div className="founder-main">
              <h3>Mohammad Forhad</h3>
              <p className="founder-role">Founder &amp; CEO</p>
              <p>
                A digital marketing and creative design professional, the name
                and face behind Zuhayn&apos;s work for clients in Bangladesh
                and abroad.
              </p>
              <p>
                He leads every project personally, from the first design
                sketch to the campaign that brings in customers, so clients
                always speak directly with the person doing their work.
              </p>
              <dl className="founder-facts">
                <div>
                  <dt>Role</dt>
                  <dd>Founder &amp; CEO</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Digital Marketing, Creative Design</dd>
                </div>
                <div>
                  <dt>Leading Zuhayn since</dt>
                  <dd>2020</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Dhaka, Bangladesh</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="why" id="why" aria-label="Why Zuhayn">
        <div className="wrap">
          <Reveal className="sec-head why-head">
            <p className="kicker">Why Zuhayn</p>
            <h2 className="display">
              One Team For Your <span className="accent">Design</span> And Your{" "}
              <span className="accent">Growth</span>
            </h2>
            <p>
              Most businesses juggle a designer here and a marketer there,
              and the brand suffers in between. At Zuhayn,{" "}
              <strong>
                the same team that designs your brand also runs your marketing
              </strong>
              , so every post, ad and page speaks with one strong voice.
            </p>
          </Reveal>

          <div className="why-list">
            {WHY.map((w) => (
              <Reveal key={w.title} className="why-item">
                <span className="ic">
                  <SvgArt index={w.icon} />
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mini-stats">
            {MINI_STATS.map((m) => (
              <div className="mini-stat" key={m.b}>
                <b>{m.b}</b>
                <span>{m.s}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
