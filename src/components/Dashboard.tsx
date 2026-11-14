import CountUp from "./CountUp";
import SvgArt from "./SvgArt";

const CHIPS = [
  { cls: "pchip-1", color: "#FFFFFF", label: "Facebook Ads" },
  { cls: "pchip-2", color: "#D8D8D8", label: "Instagram" },
  { cls: "pchip-3", color: "#B5B5B5", label: "YouTube" },
  { cls: "pchip-4", color: "#929292", label: "Google Ads" },
  { cls: "pchip-5", color: "#6E6E6E", label: "LinkedIn" },
  { cls: "pchip-6", color: "#4A4A4A", label: "TikTok" },
];

const KPIS = [
  { label: "Impressions", value: 3, suffix: "M+", decimals: 0, up: "Total ad views" },
  { label: "Reach", value: 1, suffix: "M+", decimals: 0, up: "Crossed 1 million" },
  { label: "Leads", value: 100, suffix: "K+", decimals: 0, up: "Crossed 100K leads" },
  { label: "Monthly CTR", value: 0.06, suffix: "", decimals: 2, up: "Monthly CTR" },
];

/** The original design's hero dashboard card, with the platform chips
 *  floating around it and the KPI counters from the original file. */
export default function Dashboard() {
  return (
    <div className="dash-wrap">
      {CHIPS.map((c) => (
        <span key={c.label} className={`pchip ${c.cls}`} aria-hidden="true">
          <i style={{ background: c.color }} />
          {c.label}
        </span>
      ))}
      <div
        className="dash"
        role="img"
        aria-label="Sample marketing dashboard: 3 million plus impressions, reach over 1 million, over 100 thousand leads, monthly CTR 0.06, with a rising six-month growth chart"
      >
        <div className="dash-top" aria-hidden="true">
          <span className="dash-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="dash-title">Campaign Performance</span>
          <span className="dash-live">
            <i />
            Live
          </span>
        </div>
        <div className="kpis" aria-hidden="true">
          {KPIS.map((k) => (
            <div className="kpi" key={k.label}>
              <span className="kpi-label">{k.label}</span>
              <b>
                <CountUp value={k.value} decimals={k.decimals} />
                {k.suffix ? <span className="suffix">{k.suffix}</span> : null}
              </b>
              <span className="kpi-up">▲ {k.up}</span>
            </div>
          ))}
        </div>
        <div className="dash-chart" aria-hidden="true">
          <SvgArt index={4} as="div" />
        </div>
      </div>
    </div>
  );
}
