# ZUHAYN - Website (React / Next.js)

Official website of **ZUHAYN - Creative & IT Solutions**, Dhaka.
Rebuilt from the original single-file HTML design into a proper
React project with Next.js. The visual design is the ORIGINAL one,
same dark navy theme, hero dashboard, service cards, ad stages and
charts (the original CSS and inline SVG artwork were ported verbatim).
The only deliberate changes are global fixes: one spacing rhythm
token for all sections, and anchors that clear the sticky header.

## Pages

| Route       | Page    | Contents                                   |
| ----------- | ------- | ------------------------------------------ |
| `/`         | Home    | Hero, client strip, services, work preview, clients, stats, CTA |
| `/about`    | About   | Story, founder, at-a-glance, why Zuhayn    |
| `/work`     | Work    | Work samples + industries we serve         |
| `/results`  | Results | Sample campaign charts & KPIs              |
| `/contact`  | Contact | Contact details, payment, quote form       |

## Run it

```bash
npm install     # once
npm run dev     # local dev at http://localhost:3000
npm run build   # production build -> static site in /out
npm run preview # serve the built /out folder locally
```

## SEO (already built in)

- Every route is **pre-rendered to real HTML** at build time
  (`output: "export"` in `next.config.mjs`), search engines get the
  full content without running JavaScript.
- Per-page `title`, `description`, keywords, canonical URL,
  Open Graph and Twitter cards (`src/app/layout.tsx` + each `page.tsx`).
- **Structured data**: `ProfessionalService` + `WebSite` JSON-LD with
  address, phone, founder, founding year and service offers.
- `sitemap.xml` and `robots.txt` are generated at build time
  (`src/app/sitemap.ts`, `src/app/robots.ts`).
- Semantic HTML (one `h1` per page, header/nav/main/footer, alt and
  ARIA labels), `manifest.webmanifest`, favicon and a 1200×630
  `og-image.jpg` in `/public`.
- Before going live on a different domain, update `SITE.url` in
  `src/data/site.ts`, metadata, sitemap and schema all read from it.

## Design system

All layout decisions live in **one file**: `src/app/globals.css`.

- Container: `1200px`, side padding `24px` (18px mobile)
- Section rhythm: `--section-y` (92px desktop / 64px mobile) everywhere
- Type: Sora (headings), Inter (body), the original pairing
- Brand: navy `#0A2540` / `#071A2E`, sky `#2FB9EC` / `#1273B8`
- Breakpoints: 1020px and 640px, as in the original design
- Original CSS lives in `src/app/globals.css` (ported, with a marked
  GLOBAL FIXES block at the end); original SVG artwork lives in
  `src/data/svgart.ts` and renders through `SvgArt`.

## Content

All text, services, clients, work samples and stats live in
`src/data/site.ts`, edit there, not inside components.
The quote form is a static-site form: it validates in the browser and
directs visitors to call / Facebook, exactly like the original.
Connect it to an email/CRM endpoint later if needed.

## Original file

The original single-file design is kept at the project root of the
workspace copy as `original-design.html` for reference.
