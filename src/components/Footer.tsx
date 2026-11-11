import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import SvgArt from "./SvgArt";

const TOP_SERVICES = [
  "Digital Marketing",
  "Graphic Design",
  "Branding & Identity",
  "Video Editing",
  "Web Design",
  "AI Automation",
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" aria-label="ZUHAYN - back to top">
              <span className="logo-chip">
                <Image src="/logo.png" alt="ZUHAYN logo" width={512} height={660} loading="lazy" />
              </span>
              <span className="brand-text">
                <span className="brand-name">
                  ZUHAYN<em>.</em>
                </span>
                <span className="brand-tag">Creative &amp; IT Solutions</span>
              </span>
            </Link>
            <p>
              Digital marketing, creative design, branding and websites for
              ambitious businesses, from Dhaka to the world.
            </p>
            <p style={{ marginTop: 10 }}>{SITE.address}</p>
            <div className="socials">
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="ZUHAYN on Facebook">
                <SvgArt index={43} />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="ZUHAYN on LinkedIn">
                <SvgArt index={44} />
              </a>
              <a href={SITE.url} target="_blank" rel="noopener noreferrer" aria-label="ZUHAYN website">
                <SvgArt index={45} />
              </a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Top Services</h4>
            <ul>
              {TOP_SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/#services">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-pay">
          <span className="pay-label">We Accept</span>
          <div className="pay-badges">
            <span className="pay-badge">Bank Transfer</span>
            <span className="pay-badge">bKash</span>
            <span className="pay-badge">Nagad</span>
          </div>
        </div>

        <div className="foot-bar">
          <span>
            © {new Date().getFullYear()} {SITE.legalName} · {SITE.address}
          </span>
          <span>
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> ·{" "}
            <a href={SITE.url}>zuhayn.com</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
