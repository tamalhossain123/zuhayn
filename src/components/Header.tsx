"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/data/site";
import SvgArt from "./SvgArt";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site">
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label="ZUHAYN - home">
          <span className="logo-float">
            <span className="logo-chip">
              <Image src="/logo.png" alt="ZUHAYN logo" width={512} height={660} priority />
            </span>
          </span>
          <span className="brand-text">
            <span className="brand-name">
              ZUHAYN<em>.</em>
            </span>
          </span>
        </Link>

        <nav className="main" aria-label="Main navigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "active" : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <Link href="/contact" className="nav-cta">
            <span className="cta-text">Get a Free Quote</span>
            <SvgArt index={0} />
          </Link>
        </div>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="mobileMenu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <SvgArt index={1} />
        </button>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>
          Get a Free Quote
        </Link>
        <a href={SITE.phoneHref} style={{ justifyContent: "center", fontWeight: 800, color: "var(--sky)" }}>
          {SITE.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
