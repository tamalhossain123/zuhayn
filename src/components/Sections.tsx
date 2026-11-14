"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  CLIENTS,
  INDUSTRIES,
  SERVICES,
  SITE,
  STATS,
  WORK,
  type WorkSample,
} from "@/data/site";
import CountUp from "./CountUp";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";
import SvgArt from "./SvgArt";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/* ---------- section header: title left, paragraph right ---------- */
export function SecHead2({
  kicker,
  title,
  right,
}: {
  kicker: string;
  title: ReactNode;
  right?: string;
}) {
  return (
    <Reveal className="sec-head2">
      <div>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {right ? <p className="sh-right">{right}</p> : <span />}
    </Reveal>
  );
}

/* ---------- funfact boxes ---------- */
const FF_DESC: Record<string, string> = {
  "Founded in Dhaka, Bangladesh": "One founder-led team for design and growth.",
  "Happy clients served": "Businesses that trusted us with their brand.",
  "Core services under one roof": "Marketing, design, video, web and AI together.",
  "Key industries we design & market for": "Fashion, food, construction and electronics.",
};

export function FunFacts() {
  return (
    <Reveal className="funfacts" >
      {STATS.map((s) => (
        <div className="funfact" key={s.label}>
          <span className="ff-label">{s.label}</span>
          <span className="ff-num">
            {s.plain ? (
              <>{s.value}</>
            ) : (
              <>
                <CountUp value={s.value} />
                <span className="suffix">{s.suffix}</span>
              </>
            )}
          </span>
          <span className="ff-desc">{FF_DESC[s.label] ?? ""}</span>
        </div>
      ))}
    </Reveal>
  );
}

/* ---------- services list (reference layout) ---------- */
export function ServiceList() {
  return (
    <div>
      <div className="svc-head-row" aria-hidden="true">
        <span>Service</span>
        <span>Features</span>
        <span />
      </div>
      <div className="svc-list">
        {SERVICES.map((s, i) => (
          <Reveal as="article" className="svc-row" key={s.title}>
            <div className="svc-name">
              <span className="rn">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              {s.title === "AI Automation" ? <span className="newtag">NEW</span> : null}
            </div>
            <ul className="svc-feats">
              {s.tags.map((t, j) => (
                <li key={t}>
                  <i>{ROMAN[j]}.</i> {t}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="svc-arrow" aria-label={`Ask about ${s.title}`}>
              <SvgArt index={0} />
            </Link>
            <p className="svc-desc">{s.description}</p>
            <span className="svc-img" aria-hidden="true">
              <SvgArt index={s.icon} />
              <span className="big-z">Z</span>
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- featured project (reference layout) ---------- */
export function FeatureWork({ work }: { work: WorkSample }) {
  return (
    <Reveal as="article" className="feat">
      <div className="feat-visual">
        <SvgArt index={work.art} />
        <span className="fv-brand">{work.logo}</span>
        <div className="fv-in">
          <span className="fv-offer">{work.offer}</span>
          <h3>
            {work.headlineTop} <em>{work.headlineEm}</em>
          </h3>
          <p>{work.sub}</p>
        </div>
        <Link href="/contact" className="fv-cta" aria-label="Start a project like this">
          ↗
        </Link>
      </div>
      <div className="feat-infos">
        <div className="feat-info">
          <p className="fi-label">Project Name</p>
          <p className="fi-value">{work.kind}</p>
        </div>
        <div className="feat-info">
          <p className="fi-label">Description</p>
          <p className="fi-value">{work.description}</p>
        </div>
        <div className="feat-info">
          <p className="fi-label">Industry</p>
          <p className="fi-value">{work.tag}</p>
        </div>
        <div className="feat-info">
          <p className="fi-label">Made For</p>
          <p className="fi-value">{work.logo}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- numbered rows (industries) ---------- */
export function IndustryRows() {
  return (
    <div className="numrows">
      {INDUSTRIES.map((ind, i) => (
        <Reveal className="numrow" key={ind.title}>
          <span className="rn">{ROMAN[i]}.</span>
          <div>
            <h3>{ind.title}</h3>
            <p>{ind.description}</p>
          </div>
          <span className="nr-side">{ind.tags[0]}</span>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- founder block (team layout) ---------- */
export function FounderBlock() {
  return (
    <div className="team-grid">
      <Reveal as="article" className="member">
        <div className="m-img">
          <Image
            src="/founder.jpg"
            alt="Mohammad Forhad, Founder and CEO of ZUHAYN"
            width={800}
            height={800}
          />
        </div>
        <div className="m-body">
          <h3>{SITE.founder}</h3>
          <p className="m-role">Founder &amp; CEO</p>
          <p>
            Every project at Zuhayn is led personally by its founder, from the
            first idea to the final delivery.
          </p>
        </div>
      </Reveal>
      <Reveal className="cv-box">
        <span className="kicker">Work With Us</span>
        <h3 style={{ marginTop: 16 }}>
          No Agencies Between <span className="it">Agencies</span>
        </h3>
        <p>
          When you start a project with Zuhayn, you talk to the person who
          leads it. Clear timelines, honest reporting, and one point of
          contact from brief to launch.
        </p>
        <ul>
          <li>Creative and marketing planned under one roof</li>
          <li>Fast turnaround, designs ready when campaigns need them</li>
          <li>Dhaka-based team, serving clients worldwide</li>
        </ul>
        <Link href="/contact" className="btn btn-primary">
          Start Your Project
          <SvgArt index={0} />
        </Link>
      </Reveal>
    </div>
  );
}

/* ---------- scrolling client track ---------- */
export function ClientTrack() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="track" aria-label="Our clients">
      {items.map((c, i) => (
        <article className="track-card" key={`${c.name}-${i}`} aria-hidden={i >= CLIENTS.length}>
          <span className="tc-stars" aria-hidden="true">
            ★★★★★
          </span>
          <p className="tc-note">{c.note}</p>
          <div className="tc-who">
            <span className="tc-ava">{c.initials}</span>
            <span>
              <b>{c.name}</b>
              <span>{c.sector}</span>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------- partner strip ---------- */
export function PartnerStrip() {
  const names = [...CLIENTS.map((c) => c.name), "ZUHAYN Studio"];
  const row = [...names, ...names];
  return (
    <div className="partner-strip" aria-hidden="true">
      <div className="partner-track">
        {row.map((n, i) => (
          <span key={i}>
            {n} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- contact split section ---------- */
export function ContactBlock({ withInfo = false }: { withInfo?: boolean }) {
  return (
    <div className="contact-grid2">
      <Reveal className="contact-left">
        <h2 className="contact-title">
          Let&apos;s <span className="it">Connect</span>
        </h2>
        <p className="sub">
          Whether you have a question, or want to discuss a potential project,
          our team at Zuhayn is here to help. Please fill out the form below.
        </p>
        {withInfo ? (
          <div className="info-rows">
            <div className="info-row">
              <span className="il">Phone</span>
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            </div>
            <div className="info-row">
              <span className="il">Studio</span>
              <span>{SITE.address}</span>
            </div>
            <div className="info-row">
              <span className="il">Hours</span>
              <span>Sat - Thu, 10am - 8pm (Dhaka)</span>
            </div>
          </div>
        ) : null}
        <QuoteForm />
      </Reveal>
      <Reveal className="contact-img">
        <Image
          src="/hero-bg.jpg"
          alt="The Zuhayn team at work in Dhaka"
          width={1200}
          height={1000}
        />
      </Reveal>
    </div>
  );
}

/* ---------- FAQ accordion ---------- */
export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <div className={`faq-item${open === i ? " open" : ""}`} key={f.q}>
          <button
            className="faq-q"
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {f.q}
            <span className="fx">+</span>
          </button>
          <div className="faq-a">
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- sub-page head ---------- */
export function PageHead({
  crumb,
  title,
  lede,
}: {
  crumb: string;
  title: ReactNode;
  lede: string;
}) {
  return (
    <div className="page-hero">
      <div className="wrap">
        <p className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>{crumb}</span>
        </p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </div>
  );
}

export { WORK };
