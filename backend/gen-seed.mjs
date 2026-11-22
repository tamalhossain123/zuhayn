// Generates api/seed.json from the live site's own data files, so the CMS
// starts out with exactly the content the website shows today.
// Run: node gen-seed.mjs   (from ~/workspace/zuhayn/backend)
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.join(here, "..", "project-v2");
const require = createRequire(path.join(proj, "package.json"));
const ts = require("typescript");

function loadTsModule(file) {
  const src = readFileSync(file, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  const sandbox = { module, exports: module.exports, require: () => ({}) , console };
  vm.runInNewContext(js, sandbox, { filename: file });
  return module.exports;
}

const site = loadTsModule(path.join(proj, "src/data/site.ts"));
const faqsMod = loadTsModule(path.join(proj, "src/components/Faqs.ts"));

// PRICING lives inside the pricing page component file; lift the object literal.
const pageSrc = readFileSync(path.join(proj, "src/components/PricingBody.tsx"), "utf8");
const start = pageSrc.indexOf("const PRICING");
const open = pageSrc.indexOf("{", start);
let depth = 0, end = -1;
for (let i = open; i < pageSrc.length; i++) {
  if (pageSrc[i] === "{") depth++;
  else if (pageSrc[i] === "}") { depth--; if (depth === 0) { end = i; break; } }
}
const pricing = vm.runInNewContext("(" + pageSrc.slice(open, end + 1) + ")");

const faqStart = pageSrc.indexOf("const FAQS");
const faqOpen = pageSrc.indexOf("[", faqStart);
let d2 = 0, faqEnd = -1;
for (let i = faqOpen; i < pageSrc.length; i++) {
  if (pageSrc[i] === "[") d2++;
  else if (pageSrc[i] === "]") { d2--; if (d2 === 0) { faqEnd = i; break; } }
}
const pricingFaqs = vm.runInNewContext("(" + pageSrc.slice(faqOpen, faqEnd + 1) + ")");

const S = site.SITE;
const seed = {
  settings: {
    site_name: S.name,
    legal_name: S.legalName,
    phone_display: S.phoneDisplay,
    phone_href: S.phoneHref,
    facebook: S.facebook,
    linkedin: S.linkedin,
    address: S.address,
    city: S.city,
    country: S.country,
    founded: S.founded,
    founder: S.founder,
    notify_email: "",
    notify_from: "no-reply@zuhayn.com",
  },
  services: site.SERVICES,
  pricing,
  works: site.WORK,
  clients: site.CLIENTS,
  industries: site.INDUSTRIES,
  faqs: faqsMod.FAQS,
  pricing_faqs: pricingFaqs,
  stats: site.STATS,
};

writeFileSync(path.join(here, "api/seed.json"), JSON.stringify(seed, null, 1));
console.log("seed.json written:",
  seed.services.length, "services,",
  Object.keys(seed.pricing).length, "priced,",
  seed.works.length, "works,",
  seed.clients.length, "clients,",
  seed.industries.length, "industries,",
  seed.faqs.length + seed.pricing_faqs.length, "faqs,",
  seed.stats.length, "stats");
