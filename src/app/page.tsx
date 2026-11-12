import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Dashboard from "@/components/Dashboard";
import CountUp from "@/components/CountUp";
import SvgArt from "@/components/SvgArt";
import CtaBand from "@/components/CtaBand";
import { CLIENTS, SERVICES, SITE } from "@/data/site";

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

const STRIP_TEXT =
  "Digital Marketing ✦ Creative Design ✦ Video Editing ✦ Branding ✦ AI Automation ✦ Web Design ✦ ";

const HOME_STATS = [
  { value: 2020, suffix: "", label: "Founded in Dhaka, Bangladesh", count: false },
  { value: 100, suffix: "+", label: "Happy clients served", count: true },
  { value: 9, suffix: "+", label: "Core services under one roof", count: true },
  { value: 4, suffix: "+", label: "Key industries we design & market for", count: true },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero (original design) ---------- */}
      <div className="hero" id="home">
        <span className="hero-glow glow-1" aria-hidden="true" />
        <span className="hero-glow glow-2" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" /> Digital Marketing Agency, Dhaka
            </span>
            <h1 className="display">
              <span className="hline">
                <span className="w grad-text">Digital</span>
              </span>
              <span className="hline">
                <span className="w grad-text">Marketing</span>
              </span>
              <span className="hline">
                <span className="w">That</span>{" "}
                <span className="w grad-text accent-italic">Grows</span>
              </span>
              <span className="hline">
                <span className="w">Your</span> <span className="w">Brand</span>
              </span>
            </h1>
            <p className="lede">
              Ads, design &amp; content that turn scrollers into customers.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary hero-pulse">
                Get a Free Quote
                <SvgArt index={0} />
              </Link>
              <a href={SITE.phoneHref} className="btn btn-ghost">
                <SvgArt index={3} />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Dashboard />
          </div>
        </div>
      </div>

      {/* ---------- Marquee strip ---------- */}
      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          <span>{STRIP_TEXT}</span>
          <span>{STRIP_TEXT}</span>
        </div>
      </div>

      {/* ---------- Services ---------- */}
      <section className="services" id="services" aria-label="Our services">
        <div className="wrap">
          <SectionHead
            kicker="What We Do"
            title={
              <>
                Services That Make Your Brand{" "}
                <span className="accent">Impossible To Ignore</span>
              </>
            }
            intro="From the first logo sketch to the ad campaign that brings in customers, everything your business needs to look professional and grow online, in one place."
          />
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                as="article"
                className={`svc${s.title === "AI Automation" ? " svc-new" : ""}`}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ic">
                  <SvgArt index={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                {s.tags.length ? (
                  <ul>
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Clients ---------- */}
      <section className="clients" id="clients" aria-label="Our clients">
        <div className="wrap">
          <SectionHead
            kicker="Our Clients"
            title={
              <>
                Brands We&apos;ve <span className="accent">Worked With</span>
              </>
            }
            intro="Real companies that trusted Zuhayn with their design and marketing, from construction and apparel to food, education and more."
          />
          <div className="client-grid">
            {CLIENTS.map((c) => (
              <Reveal key={c.name} as="article" className="client-tile">
                <span className="client-mark">
                  <span className="ic">
                    <SvgArt index={c.icon} />
                  </span>
                  {c.name}
                </span>
                <span className="client-type">{c.sector}</span>
                <p>{c.note}</p>
              </Reveal>
            ))}
            <Link href="/contact" className="client-cta">
              <b>Your Brand Could Be Next</b>
              <span>
                Join the businesses growing with Zuhayn&apos;s design &amp;
                marketing.
              </span>
              <span className="go">Start a project →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <div className="stats" role="region" aria-label="Zuhayn in numbers">
        <div className="wrap stats-grid">
          {HOME_STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b>
                {s.count ? (
                  <CountUp value={s.value} suffix={s.suffix} />
                ) : (
                  <>
                    {s.value}
                    {s.suffix}
                  </>
                )}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
