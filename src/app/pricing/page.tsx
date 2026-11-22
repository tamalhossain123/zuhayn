import type { Metadata } from "next";
import {
  ContactBlock,
  PageHead,
  PartnerStrip,
  SectionIntro,
} from "@/components/Sections";
import PricingBody from "@/components/PricingBody";

export const metadata: Metadata = {
  title: "Pricing & Packages - ZUHAYN Creative & IT Solutions, Dhaka",
  description:
    "Clear package pricing for every ZUHAYN service: digital marketing, design, video editing, branding, web development and AI automation. No hidden costs.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing & Packages - ZUHAYN Creative & IT Solutions, Dhaka",
    description:
      "Package pricing for all nine ZUHAYN services, monthly plans and one-time projects, with everything listed up front.",
    url: "/pricing",
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

export default function PricingPage() {
  return (
    <>
      <PageHead
        crumb="Pricing"
        title={
          <>
            Simple, Honest <span className="it">Pricing</span>
          </>
        }
        lede="Every service, packaged with the price up front. No hidden costs, no lock-in contracts, and a custom package whenever your needs do not fit a box."
      />

      <section aria-label="How pricing works">
        <div className="wrap">
          <SectionIntro
            label="Our Packages"
            text="Pick a package per service, or combine services into one monthly plan. Every package lists exactly what you get, and anything extra is agreed with you before we start."
          />
        </div>
      </section>

      <PricingBody />

      <section aria-label="Contact Zuhayn">
        <div className="wrap">
          <SectionIntro
            label="Custom Package"
            text="Need a mix of services, or a bigger scope than any package here? Tell us your goal and budget, and we will build the package around it."
          />
          <ContactBlock />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
