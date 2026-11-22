"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";
import { API_BASE } from "@/lib/content";
import SvgArt from "./SvgArt";

/**
 * Quote request form in the original design's .quote styling.
 * Validates the required fields in the browser, then sends the request
 * to the backend (/api/lead.php), which stores it as a lead in the admin
 * panel and emails a notification. If the backend is unreachable, the
 * visitor is pointed to the fastest direct channels (call / Facebook),
 * exactly like the original static behaviour.
 */
export default function QuoteForm() {
  const [note, setNote] = useState<{ html: string } | null>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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
    const fallbackNote = {
      html: `Thanks, ${name}! For the fastest reply, send these details to us directly: call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> or message us on <a href="${SITE.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a> and our team will contact you.`,
    };
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/lead.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: get("fullName"),
          company: get("company"),
          mobile: get("mobile"),
          email: get("email"),
          address: get("address"),
          businessType: get("businessType"),
          service: get("service"),
          message: get("message"),
          website: get("website"),
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok) {
        form.reset();
        setNote({
          html: `Thanks, ${name}! Your request has been received. Our team will contact you shortly. For anything urgent, call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>.`,
        });
      } else if (data && data.error) {
        setNote({ html: String(data.error).replace(/</g, "&lt;") });
      } else {
        setNote(fallbackNote);
      }
    } catch {
      setNote(fallbackNote);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="quote" onSubmit={onSubmit} noValidate>
      <h3>Request A Free Quote</h3>
      <p className="q-intro">
        Fill this in and we&apos;ll reply with next steps and a clear price for
        your project. Fields marked <span style={{ color: "var(--sky)" }}>*</span>{" "}
        are required.
      </p>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
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
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send Request"}
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
