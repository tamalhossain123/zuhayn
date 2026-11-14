"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import SvgArt from "./SvgArt";

/** Slim fixed bar + slide-in side menu, following the reference
 *  layout: logo left, phone + quote + MENU right, big-link panel. */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site">
        <div className="wrap header-in">
          <Link href="/" className="brand" aria-label="ZUHAYN - home">
            <span className="logo-chip">
              <Image src="/logo.png" alt="ZUHAYN logo" width={512} height={660} priority />
            </span>
            <span className="brand-name">
              ZUHAYN<em>.</em>
            </span>
          </Link>

          <div className="header-right">
            <a href={SITE.phoneHref} className="header-phone">
              <SvgArt index={3} />
              {SITE.phoneDisplay}
            </a>
            <Link href="/contact" className="nav-cta">
              <span className="cta-text">Get a Free Quote</span>
              <SvgArt index={0} />
            </Link>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              Menu
              <SvgArt index={1} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`side-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside className={`side-panel${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="side-top">
          <span className="brand-name">
            ZUHAYN<em>.</em>
          </span>
          <button
            className="side-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="side-nav" aria-label="Menu">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="side-info">
          <p className="s-label">Reach out to us</p>
          <a className="big" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          <p>{SITE.address}</p>
          <div className="side-socials">
            <a href={SITE.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
