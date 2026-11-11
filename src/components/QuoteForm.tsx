"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";
import SvgArt from "./SvgArt";

/**
 * Quote request form in the original design's .quote styling.
 * Static-site behaviour, same as the original file: validates the
 * required fields in the browser and points the visitor to the fastest
 * direct channels (call / Facebook) - nothing is stored by the form.
 */
export default function QuoteForm() {
  const [note, setNote] = useState<{ html: string } | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const required: [string, string][] = [
      ["fullName", "full name"],
      ["company", "company name"],
      ["mobile", "mobile number"],
      ["email", "email"],
      ["address", "address"],
      ["businessType", "business type"],
    ];
    const missing = required.filter(([k]) => !get(k));
    if (missing.length) {
      setNote({
        html: `Please fill in all required fields, <strong>${missing
          .map(([, l]) => l)
          .join(", ")}</strong>, so we can prepare your quote.`,
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
      setNote({
        html: "Please enter a valid <strong>email address</strong> so we can send your quote.",
      });
      return;
    }
    const name = get("fullName").replace(/</g, "&lt;");
    setNote({
      html: `Thanks, ${name}! For the fastest reply, send these details to us directly: call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> or message us on <a href="${SITE.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a> and our team will contact you.`,
    });
  };

  return (
    <form className="quote" onSubmit={onSubmit} noValidate>
      <h3>Request A Free Quote</h3>
      <p>
        Fill this in and we&apos;ll reply with next steps and a clear price for
        your project. Fields marked <span style={{ color: "var(--sky)" }}>*</span>{" "}
        are required.
      </p>
      <div className="f-grid">
        <div className="f-field">
          <label htmlFor="f-name">
            Full Name <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="f-name" name="fullName" type="text" placeholder="e.g. Rahim Uddin" autoComplete="name" required />
        </div>
        <div className="f-field">
          <label htmlFor="f-company">
            Company Name <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="f-company" name="company" type="text" placeholder="e.g. Rahim Fashion Ltd." autoComplete="organization" required />
        </div>
        <div className="f-field">
          <label htmlFor="f-mobile">
            Mobile Number <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="f-mobile" name="mobile" type="tel" placeholder="e.g. 01XXX-XXXXXX" autoComplete="tel" required />
        </div>
        <div className="f-field">
          <label htmlFor="f-email">
            Email Address <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="f-email" name="email" type="email" placeholder="e.g. you@company.com" autoComplete="email" required />
        </div>
        <div className="f-field full">
          <label htmlFor="f-address">
            Address <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="f-address" name="address" type="text" placeholder="e.g. House, Road, Area, City" autoComplete="street-address" required />
        </div>
        <div className="f-field full">
          <label htmlFor="f-btype">
            Business Type / Category <span className="req" aria-hidden="true">*</span>
          </label>
          <select id="f-btype" name="businessType" className="f-select" defaultValue="" required>
            <option value="">Select your business type</option>
            <option>Clothing &amp; Fashion</option>
            <option>Food &amp; Restaurant</option>
            <option>Construction &amp; Real Estate</option>
            <option>Electronics &amp; Gadgets</option>
            <option>Other</option>
          </select>
        </div>
        <div className="f-field full">
          <label htmlFor="f-service">Service Interested In</label>
          <select id="f-service" name="service" className="f-select" defaultValue="Digital Marketing">
            <option>Digital Marketing</option>
            <option>Creative / Graphic Design</option>
            <option>Branding &amp; Visual Identity</option>
            <option>Video Editing</option>
            <option>Web Design &amp; Development</option>
            <option>AI Automation</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="f-field full">
          <label htmlFor="f-msg">Message</label>
          <textarea id="f-msg" name="message" placeholder="What do you want to achieve? Any deadline we should know about?" />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Send Request
        <SvgArt index={0} />
      </button>
      {note ? (
        <p
          className="form-note show"
          role="status"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      ) : null}
      <p className="form-privacy">
        Your details are saved securely and our team will contact you.
      </p>
    </form>
  );
}
