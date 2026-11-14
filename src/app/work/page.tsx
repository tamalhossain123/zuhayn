import type { Metadata } from "next";
import {
  ClientTrack,
  ContactBlock,
  FeatureWork,
  IndustryRows,
  PageHead,
  PartnerStrip,
  SectionIntro,
} from "@/components/Sections";
import { WORK } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work & Industries - ZUHAYN, Dhaka",
  description:
    "Design samples and campaign creatives by ZUHAYN for fashion, food, construction and gadget brands, plus the industries we serve: clothing, restaurants, real estate and electronics.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work & Industries - ZUHAYN, Dhaka",
    description:
      "Design samples that sell, for businesses that sell products, fashion, food, construction and electronics.",
    url: "/work",
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

export default function WorkPage() {
  return (
    <>
      <PageHead
        crumb="Our Work"
        title={
          <>
            Work That <span className="it">Sells</span>
          </>
        }
        lede="Design samples that sell, for businesses that sell products: fashion, food, construction and electronics."
      />

      <section aria-label="Featured projects">
        <div className="wrap">
          <SectionIntro
            label="Projects"
            text="Every sample below was built around one goal: turning viewers into buyers, callers and customers for the business behind it."
          />
          {WORK.map((w) => (
            <FeatureWork key={w.id} work={w} />
          ))}
        </div>
      </section>

      <section aria-label="Industries we serve" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Industries"
            text="Industries we know well, because we design and market for them every week."
          />
          <IndustryRows />
        </div>
      </section>

      <section className="track-sec" aria-label="Our clients" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="Our Clients"
            text="Real companies across Bangladesh and worldwide have trusted Zuhayn with their design, their campaigns and their growth."
          />
        </div>
        <ClientTrack />
      </section>

      <section aria-label="Contact Zuhayn" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ContactBlock />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
