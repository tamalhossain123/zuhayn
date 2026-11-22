"use client";

import Link from "next/link";
import { SERVICES } from "@/data/site";
import { useContent, type Pkg } from "@/lib/content";
import Reveal from "./Reveal";
import { FaqList, SectionIntro } from "./Sections";

const PRICING: Record<string, Pkg> = {
  "Digital Marketing": {
    note: "Ad spend is paid by you directly to Facebook, Google or the platform. It is never included in a management package.",
    tiers: [
      {
        name: "Starter",
        price: "৳15,000",
        per: "per month",
        feats: [
          "Facebook Ads management",
          "2 campaigns per month",
          "Ad copy in Bangla & English",
          "Monthly performance report",
          "Email & WhatsApp support",
        ],
      },
      {
        name: "Growth",
        price: "৳25,000",
        per: "per month",
        pop: true,
        feats: [
          "Facebook + Instagram Ads",
          "4 campaigns per month",
          "Retargeting campaign setup",
          "Weekly performance report",
          "Priority WhatsApp support",
        ],
      },
      {
        name: "Scale",
        price: "৳45,000",
        per: "per month",
        feats: [
          "Facebook, Instagram, YouTube, LinkedIn & Google Ads",
          "Unlimited campaigns",
          "Full-funnel + retargeting strategy",
          "Weekly report + strategy call",
          "Dedicated account manager",
        ],
      },
    ],
  },
  "Creative Design": {
    tiers: [
      {
        name: "Starter",
        price: "৳8,000",
        per: "per month",
        feats: [
          "12 social media creatives",
          "Ad & banner design",
          "2 revisions per design",
          "Ready-to-post files (JPG, PNG)",
        ],
      },
      {
        name: "Standard",
        price: "৳15,000",
        per: "per month",
        pop: true,
        feats: [
          "25 social media creatives",
          "Ad & banner design",
          "Monthly campaign concepts",
          "3 revisions per design",
          "Source files included",
        ],
      },
      {
        name: "Premium",
        price: "৳28,000",
        per: "per month",
        feats: [
          "50 social media creatives",
          "Full campaign concepts",
          "Marketing materials (flyer, brochure)",
          "Unlimited revisions",
          "Source files + priority delivery",
        ],
      },
    ],
  },
  "Graphic Design": {
    tiers: [
      {
        name: "Basic",
        price: "৳6,000",
        per: "per month",
        feats: [
          "10 social media designs",
          "Posters & flyers",
          "2 revisions per design",
          "Print-ready files",
        ],
      },
      {
        name: "Standard",
        price: "৳12,000",
        per: "per month",
        pop: true,
        feats: [
          "20 social media designs",
          "Packaging design (1 product)",
          "Posters & flyers",
          "3 revisions per design",
          "Source files included",
        ],
      },
      {
        name: "Premium",
        price: "৳22,000",
        per: "per month",
        feats: [
          "40 social media designs",
          "Packaging design (3 products)",
          "Complete print design set",
          "Unlimited revisions",
          "Source files + priority support",
        ],
      },
    ],
  },
  "Video Editing": {
    tiers: [
      {
        name: "Starter",
        price: "৳12,000",
        per: "per month",
        feats: [
          "8 reels or short videos",
          "Captions included",
          "Music & basic transitions",
          "2 revisions per video",
        ],
      },
      {
        name: "Growth",
        price: "৳22,000",
        per: "per month",
        pop: true,
        feats: [
          "16 videos (reels, shorts, ads)",
          "Motion graphics & hooks",
          "Captions on every video",
          "3 revisions per video",
        ],
      },
      {
        name: "Premium",
        price: "৳40,000",
        per: "per month",
        feats: [
          "30 videos, ads, promos & product videos",
          "Advanced motion graphics",
          "Captions & sound design",
          "Unlimited revisions",
          "Priority delivery",
        ],
      },
    ],
  },
  "Branding & Visual Identity": {
    tiers: [
      {
        name: "Basic",
        price: "৳15,000",
        per: "one-time",
        feats: [
          "Logo design (3 concepts)",
          "Brand colors & typography",
          "Logo files (AI, PNG, JPG)",
          "2 revisions",
        ],
      },
      {
        name: "Standard",
        price: "৳30,000",
        per: "one-time",
        pop: true,
        feats: [
          "Logo design (5 concepts)",
          "Brand colors & typography",
          "Mini brand guidelines",
          "Business card & letterhead",
          "3 revisions",
        ],
      },
      {
        name: "Complete",
        price: "৳55,000",
        per: "one-time",
        feats: [
          "Complete identity system",
          "Full brand guidelines book",
          "Complete stationery set",
          "Social media starter kit",
          "Unlimited revisions",
        ],
      },
    ],
  },
  "Promotional Ad Campaigns": {
    tiers: [
      {
        name: "Starter",
        price: "৳10,000",
        per: "per campaign",
        feats: [
          "1 campaign concept",
          "5 ad creatives",
          "Sale & offer designs",
          "2 revisions",
        ],
      },
      {
        name: "Standard",
        price: "৳20,000",
        per: "per campaign",
        pop: true,
        feats: [
          "1 campaign concept",
          "12 ad creatives",
          "Product launch creatives",
          "Retargeting ad set",
          "3 revisions",
        ],
      },
      {
        name: "Premium",
        price: "৳35,000",
        per: "per campaign",
        feats: [
          "Full campaign, concept to launch",
          "25 ad creatives",
          "Seasonal & festival ad sets",
          "Retargeting ad sets",
          "Unlimited revisions",
        ],
      },
    ],
  },
  "Web Design & Development": {
    tiers: [
      {
        name: "Basic",
        price: "৳25,000",
        per: "one-time",
        feats: [
          "5-page business website",
          "Mobile-friendly design",
          "Contact form & WhatsApp button",
          "Basic SEO setup",
          "Delivery in 7 days",
        ],
      },
      {
        name: "Standard",
        price: "৳50,000",
        per: "one-time",
        pop: true,
        feats: [
          "Up to 10 pages, custom design",
          "CMS, edit the site yourself",
          "SEO-ready structure",
          "Speed optimisation",
          "Delivery in 14 days",
        ],
      },
      {
        name: "Premium",
        price: "৳95,000",
        per: "one-time",
        feats: [
          "E-commerce or custom web app",
          "Online payment setup",
          "Advanced SEO setup",
          "Speed & security optimisation",
          "Delivery in 21 days + 30 days free support",
        ],
      },
    ],
  },
  "Website & App Mockups": {
    tiers: [
      {
        name: "Basic",
        price: "৳8,000",
        per: "per project",
        feats: [
          "5 screens or pages",
          "Website UI mockups",
          "2 revisions",
          "PNG + source files",
        ],
      },
      {
        name: "Standard",
        price: "৳15,000",
        per: "per project",
        pop: true,
        feats: [
          "10 screens or pages",
          "App screen design",
          "Pitch-ready presentation",
          "3 revisions",
          "PNG + source files",
        ],
      },
      {
        name: "Premium",
        price: "৳28,000",
        per: "per project",
        feats: [
          "20 screens or pages",
          "Complete UI kit",
          "Portfolio presentation set",
          "Unlimited revisions",
          "All source files included",
        ],
      },
    ],
  },
  "AI Automation": {
    tiers: [
      {
        name: "Starter",
        price: "৳20,000",
        per: "one-time setup",
        feats: [
          "AI chatbot for your Facebook page",
          "Automatic answers to common questions",
          "Setup + staff training",
          "15 days support",
        ],
      },
      {
        name: "Growth",
        price: "৳40,000",
        per: "one-time setup",
        pop: true,
        feats: [
          "Chatbot for page + website",
          "Sales & support chat flows",
          "1 automated marketing workflow",
          "Setup + staff training",
          "30 days support",
        ],
      },
      {
        name: "Premium",
        price: "৳75,000",
        per: "one-time setup",
        feats: [
          "Multi-channel automation",
          "AI-assisted content workflow",
          "Business process automation",
          "Full team training",
          "60 days priority support",
        ],
      },
    ],
  },
};const FAQS = [
  {
    q: "Is ad spend included in the marketing packages?",
    a: "No. Ad spend is paid by you directly to Facebook, Google or the platform, so every taka of it goes into your ads. Our package price covers the strategy, setup, management and reporting.",
  },
  {
    q: "Can I combine services into one custom package?",
    a: "Yes. Most clients mix design, video and marketing into one monthly plan. Tell us what you need and we will build a custom package with a single monthly price.",
  },
  {
    q: "How do payments work?",
    a: "Monthly packages are billed monthly. Project packages start with an advance payment and the rest on delivery. We confirm the exact terms with you in writing before any work begins.",
  },
  {
    q: "Can I upgrade, downgrade or pause a package?",
    a: "Yes. Monthly packages can be changed or paused from the next month, and project packages can be extended at any point. There are no lock-in contracts.",
  },
];
/** Pricing sections + pricing FAQs, driven by the CMS with the built-in
 *  packages as fallback so the page is complete before the API answers. */
export default function PricingBody() {
  const c = useContent();
  const services = c?.services?.length ? c.services : SERVICES;
  const pricing = c?.pricing && Object.keys(c.pricing).length ? c.pricing : PRICING;
  const faqs = c?.pricing_faqs?.length ? c.pricing_faqs : FAQS;
  return (
    <>
      {services.map((s) => {
        const pkg = pricing[s.title];
        if (!pkg) return null;
        return (
          <section key={s.title} aria-label={`${s.title} pricing`}>
            <div className="wrap">
              <div className="price-head">
                <h2>{s.title}</h2>
                <p>{s.description}</p>
              </div>
              <Reveal className="price-grid">
                {pkg.tiers.map((t) => (
                  <article key={t.name} className={`price-card${t.pop ? " pop" : ""}`}>
                    {t.pop && <span className="pop-badge">Most Popular</span>}
                    <span className="price-tier">{t.name}</span>
                    <span className="price-amt">{t.price}</span>
                    <span className="price-per">{t.per}</span>
                    <ul className="price-feats">
                      {t.feats.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className="btn btn-primary price-cta">
                      Get This Package
                    </Link>
                  </article>
                ))}
              </Reveal>
              {pkg.note && <p className="price-note">{pkg.note}</p>}
            </div>
          </section>
        );
      })}

      <section aria-label="Pricing questions">
        <div className="wrap">
          <SectionIntro
            label="Good To Know"
            text="The questions every client asks before starting, answered straight."
          />
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
