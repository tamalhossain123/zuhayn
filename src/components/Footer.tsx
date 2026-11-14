import Image from "next/image";
import Link from "next/link";
import { NAV, SERVICES, SITE } from "@/data/site";
import Reveal from "./Reveal";

/** Footer in the reference layout: four widget columns, then a
 *  giant wordmark across the full width and a bottom bar. */
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand" aria-label="ZUHAYN - home">
              <span className="logo-chip">
                <Image src="/logo.png" alt="ZUHAYN logo" width={512} height={660} />
              </span>
              <span className="brand-name">
                ZUHAYN<em>.</em>
              </span>
            </Link>
            <p>
              Creative &amp; IT solutions from Dhaka: digital marketing,
              design, branding, video and web that help brands grow.
            </p>
            <p className="foot-copy">
              © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Company">
            <h4>Company</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link href="/#services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Reach Out To Us</h4>
            <ul>
              <li>
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>{SITE.address}</li>
              <li>
                <a href={SITE.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                {" · "}
                <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="socials">
              <Link href="/contact">Let&apos;s Connect</Link>
            </div>
          </div>
        </div>
      </div>

      <Reveal>
        <div className="giant-word" aria-hidden="true">
          {"ZUHAYN".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
      </Reveal>

      <div className="wrap">
        <div className="foot-bar">
          <span>
            {SITE.name} - Creative &amp; IT Solutions, {SITE.city}, {SITE.country}
          </span>
          <span>Founded {SITE.founded} · Founder-led, always</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
