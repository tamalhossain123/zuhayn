import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import ChartAnimator from "@/components/ChartAnimator";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Results That Speak - ZUHAYN Campaign Performance",
  description:
    "How ZUHAYN reports campaign performance: reach growth, traffic sources and lead growth, 3M+ impressions, 1M+ reach and 100K+ leads across sample campaigns.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Results That Speak - ZUHAYN Campaign Performance",
    description:
      "Measurable marketing, reported clearly: reach, traffic sources and leads, exactly as our clients see them.",
    url: "/results",
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

const KPI_STATS = [
  { b: "3M+", s: "Impressions across campaigns" },
  { b: "1M+", s: "Reach - crossed one million" },
  { b: "100K+", s: "Leads generated for clients" },
  { b: "0.06", s: "Monthly CTR" },
];

const DONUT_LEGEND = [
  { color: "#2FB9EC", label: "Facebook", pct: "46%" },
  { color: "#1BB5A6", label: "Instagram", pct: "24%" },
  { color: "#1273B8", label: "Google", pct: "18%" },
  { color: "#8AD8F8", label: "YouTube", pct: "12%" },
];

export default function ResultsPage() {
  return (
    <>
      {/* ---------- Page hero ---------- */}
      <div className="hero page-hero">
        <span className="hero-glow glow-1" aria-hidden="true" />
        <span className="hero-glow glow-2" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" /> Marketing Results
            </span>
            <h1 className="display">
              Results That{" "}
              <span className="grad-text accent-italic">Speak</span>
            </h1>
            <p className="lede">
              Good marketing is measurable. Run a campaign with us, and we
              report your real numbers in exactly the format you see below.
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

      <section className="results" id="results" aria-label="Marketing results">
        <div className="wrap">
          <SectionHead
            kicker="Marketing Results"
            title={
              <>
                Sample Campaign <span className="accent">Performance</span>
              </>
            }
            intro="The charts below show a sample campaign performance, the pattern we build toward with consistent creative, testing and weekly optimisation."
          />

          <ChartAnimator>
            <div className="results-grid">
              <Reveal as="article" className="chart-card" >
                <div data-chart>
                  <h3>Reach Growth - 6-Month Campaign</h3>
                  <p className="c-sub">People reached per month (sample campaign)</p>
                  <SvgArt index={36} as="div" />
                  <p className="chart-note">
                    Reach climbed from <b>120K to over 1M</b> in six months,
                    steady, compounding growth rather than a one-off spike.
                  </p>
                </div>
              </Reveal>

              <Reveal as="article" className="chart-card">
                <div data-chart>
                  <h3>Where The Clicks Come From</h3>
                  <p className="c-sub">Traffic sources - sample campaign split</p>
                  <div className="donut-flex">
                    <SvgArt index={37} />
                    <ul className="donut-legend">
                      {DONUT_LEGEND.map((d) => (
                        <li key={d.label}>
                          <span className="sw" style={{ background: d.color }} />
                          {d.label} <span>· {d.pct}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="chart-note">
                    Every channel is tracked, so budget moves to{" "}
                    <b>what actually brings customers</b>.
                  </p>
                </div>
              </Reveal>

              <Reveal as="article" className="chart-card wide">
                <div data-chart>
                  <h3>Leads: Before Ads vs With Zuhayn</h3>
                  <p className="c-sub">
                    Qualified leads per month - first 3 months of a sample campaign
                  </p>
                  <ul className="legend">
                    <li>
                      <span className="sw" style={{ background: "#5F82A0" }} />
                      Before ads
                    </li>
                    <li>
                      <span className="sw" style={{ background: "#2FB9EC" }} />
                      With Zuhayn ads
                    </li>
                  </ul>
                  <SvgArt index={38} as="div" />
                  <p className="chart-note">
                    By month 3, monthly leads rose from <b>2.6K to 8.7K, about
                    3.3×</b> the pre-ads level, and total leads generated crossed{" "}
                    <b>100K+</b>.
                  </p>
                </div>
              </Reveal>
            </div>
          </ChartAnimator>

          <div
            className="stats stats-in-card"
            role="region"
            aria-label="Campaign performance in numbers"
          >
            <div className="stats-grid">
              {KPI_STATS.map((k) => (
                <div className="stat" key={k.s}>
                  <b>{k.b}</b>
                  <span>{k.s}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="results-note">
            Sample campaign figures, shown to illustrate how campaign
            performance is reported. Your campaign report will carry your own
            real numbers.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want Numbers Like These, Reported Honestly?"
        text="Start a campaign with Zuhayn and get clear weekly reporting, what ran, what it reached, and what it brought in."
      />
    </>
  );
}
