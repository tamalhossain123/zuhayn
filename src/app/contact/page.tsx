import type { Metadata } from "next";
import { FAQS } from "@/components/Faqs";
import {
  ContactBlock,
  FaqList,
  PageHead,
  PartnerStrip,
  SectionIntro,
} from "@/components/Sections";

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

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumb="Contact"
        title={
          <>
            Get A Free <span className="it">Quote</span>
          </>
        }
        lede="Tell us about your project, a new brand, a campaign, a website, and we'll take it from there."
      />

      <section aria-label="Contact form">
        <div className="wrap">
          <ContactBlock withInfo />
        </div>
      </section>

      <section aria-label="Frequently asked questions" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionIntro
            label="FAQ"
            text="Everything you might want to know before starting a project with us, answered plainly and honestly."
          />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <PartnerStrip />
    </>
  );
}
