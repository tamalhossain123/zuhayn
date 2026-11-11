import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import SvgArt from "@/components/SvgArt";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact ZUHAYN - Get a Free Quote",
  description:
    "Contact ZUHAYN - Creative & IT Solutions, Dhaka. Call +8801917653545, message us on Facebook, or request a free quote for digital marketing, design, branding or a website.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ZUHAYN - Get a Free Quote | +8801917653545",
    description:
      "Tell us about your project, a new brand, a campaign, a website, and we'll take it from there.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ---------- Page hero ---------- */}
      <div className="hero page-hero">
        <span className="hero-glow glow-1" aria-hidden="true" />
        <span className="hero-glow glow-2" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" /> Contact
            </span>
            <h1 className="display">
              Let&apos;s Build Something{" "}
              <span className="grad-text accent-italic">Great</span> Together
            </h1>
            <p className="lede">
              Tell us about your project, a new brand, a campaign, a website,
              and we&apos;ll take it from there. Call, message, or send the
              form and we&apos;ll get back to you.
            </p>
            <div className="hero-ctas">
              <a href={SITE.phoneHref} className="btn btn-primary">
                Call {SITE.phoneDisplay}
                <SvgArt index={0} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

    <section className="contact" id="contact" aria-label="Contact Zuhayn">
      <div className="wrap">
        <div className="contact-grid">
          <Reveal>
            <p className="kicker">Get In Touch</p>
            <h2 className="display" style={{ marginBottom: 22 }}>
              Reach Us <span className="accent">Directly</span>
            </h2>
            <div className="c-rows">
              <a className="c-row" href={SITE.phoneHref}>
                <span className="ic">
                  <SvgArt index={39} />
                </span>
                <span>
                  <b>{SITE.phoneDisplay}</b>
                  <span>Call us to start your project</span>
                </span>
              </a>
              <a
                className="c-row"
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ic">
                  <SvgArt index={40} />
                </span>
                <span>
                  <b>facebook.com/zuhaynbd</b>
                  <span>Message us on Facebook</span>
                </span>
              </a>
              <div className="c-row">
                <span className="ic">
                  <SvgArt index={41} />
                </span>
                <span>
                  <b>{SITE.address}</b>
                  <span>Working with clients worldwide · zuhayn.com</span>
                </span>
              </div>
            </div>
            <div className="pay-block">
              <span className="pay-label">We Accept</span>
              <div className="pay-badges">
                <span className="pay-badge">Bank Transfer</span>
                <span className="pay-badge">bKash</span>
                <span className="pay-badge">Nagad</span>
              </div>
              <span className="pay-note">
                Pay by bank transfer or mobile banking, whichever suits you
                best.
              </span>
            </div>
          </Reveal>

          <Reveal>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
    </>
  );
}
