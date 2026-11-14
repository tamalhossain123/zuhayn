import type { Metadata } from "next";
import ChartAnimator from "@/components/ChartAnimator";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import {
  ContactBlock,
  PageHead,
  PartnerStrip,
  SectionIntro,
} from "@/components/Sections";

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
  { b: "3M+", s: "Impressions across campaigns", d: "Total ad views across sample campaigns." },
  { b: "1M+", s: "Reach, crossed one million", d: "People reached by consistent creative." },
  { b: "100K+", s: "Leads generated for clients", d: "Qualified leads, tracked per channel." },
  { b: "0.06", s: "Monthly CTR", d: "Click-through rate on the sample campaign." },
];

const DONUT_LEGEND = [
  { color: "#FFFFFF", label: "Facebook", pct: "46%" },
  { color: "#C9C9C9", label: "Instagram", pct: "24%" },
  { color: "#939393", label: "Google", pct: "18%" },
  { color: "#5C5C5C", label: "YouTube", pct: "12%" },
];

export default function ResultsPage() {
  return (
    <>
      <PageHead
        crumb="Results"
        title={
          <>
            Results That <span className="it">Speak</span>
          </>
        }
        lede="Good marketing is measurable. Run a campaign with us, and we report your real numbers in exactly the format you see below."
      />

      <section aria-label="Marketing results">
        <div className="wrap">
          <SectionIntro
            label="Marketing Results"
            text="Good marketing is measurable: consistent creative, testing and weekly optimisation, reported in real numbers you can check yourself."
          />

          <Reveal className="funfacts" >
            {KPI_STATS.map((k) => (
              <div className="funfact" key={k.s}>
                <span className="ff-label">{k.s}</span>
                <span className="ff-num">{k.b}</span>
                <span className="ff-desc">{k.d}</span>
              </div>
            ))}
          </Reveal>

          <div style={{ height: 26 }} />

          <ChartAnimator>
            <div className="results-grid">
              <Reveal as="article" className="chart-card">
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
                        <li className="legend" key={d.label}>
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

              <Reveal as="article" className="chart-card">
                <div data-chart>
                  <h3>Leads: Before Ads vs With Zuhayn</h3>
                  <p className="c-sub">
                    Qualified leads per month - first 3 months of a sample campaign
                  </p>
                  <ul className="donut-legend" style={{ margin: "12px 0" }}>
                    <li className="legend">
                      <span className="sw" style={{ background: "#8A8A8A" }} />
                      Before ads
                    </li>
                    <li className="legend">
                      <span className="sw" style={{ background: "#FFFFFF" }} />
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

          <p className="results-note" style={{ marginTop: 22 }}>
            Sample campaign figures, shown to illustrate how campaign
            performance is reported. Your campaign report will carry your own
            real numbers.
          </p>
        </div>
      </section>

      <section aria-label="Contact Zuhayn">
        <div className="wrap">
          <SectionIntro
            label="Your Turn"
            text="Start a campaign with Zuhayn and get clear weekly reporting on what ran, what it reached and what it brought in."
          />
          <ContactBlock />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
