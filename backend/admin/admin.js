// ZUHAYN admin panel: vanilla JS SPA talking to ../api.
"use strict";
const API = "../api";
const app = document.getElementById("app");
const toastEl = document.getElementById("toast");
let CSRF = "";
let USERNAME = "";
let SERVICES = []; // cached for package editor selects

function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (CSRF && (opts.method || "GET") !== "GET") headers["X-CSRF-Token"] = CSRF;
  const res = await fetch(API + path, { credentials: "same-origin", headers, ...opts });
  let data = {};
  try { data = await res.json(); } catch (e) { /* non-JSON */ }
  if (!res.ok) throw new Error(data.error || ("Request failed (" + res.status + ")"));
  return data;
}
const get = (p) => api(p);
const send = (p, method, body) => api(p, { method, body: JSON.stringify(body || {}) });

/* ---------------- icons (inline SVG, stroke style) ---------------- */
const IC = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICONS = {
  dashboard: IC('<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>'),
  leads: IC('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7.5 12 13l8.5-5.5"/>'),
  services: IC('<path d="M12 3.5 21 8.5l-9 5-9-5 9-5z"/><path d="M3.5 13.5 12 18l8.5-4.5"/>'),
  packages: IC('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none"/>'),
  works: IC('<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17.5 9.5 13l3.5 3 3-2.5 3.5 3"/>'),
  clients: IC('<circle cx="9.5" cy="8.5" r="3.2"/><path d="M4 19.5c.6-3.1 2.8-4.6 5.5-4.6s4.9 1.5 5.5 4.6"/><path d="M16 5.7a3.2 3.2 0 0 1 0 5.7M17.6 15.2c1.8.6 3 2 3.4 4.3"/>'),
  industries: IC('<path d="M5.5 20.5v-16h9v16"/><path d="M14.5 9.5h4v11"/><path d="M3 20.5h18"/><path d="M8.3 8h1.6M8.3 11.5h1.6M8.3 15h1.6"/>'),
  faqs: IC('<rect x="3.5" y="4.5" width="17" height="12" rx="2.5"/><path d="M8 16.5v3.8l4.8-3.8"/>'),
  stats: IC('<path d="M3.5 20.5h17"/><path d="M7 20.5v-8M12 20.5V6M17 20.5v-11"/>'),
  settings: IC('<path d="M4 8h8.5M18.5 8H20"/><circle cx="15.5" cy="8" r="2.3"/><path d="M4 16h2.5M12.5 16H20"/><circle cx="9.5" cy="16" r="2.3"/>'),
  logout: IC('<path d="M13 4.5H6.5A1.5 1.5 0 0 0 5 6v12a1.5 1.5 0 0 0 1.5 1.5H13"/><path d="M10.5 12H21"/><path d="M17.5 8.5 21 12l-3.5 3.5"/>'),
  external: IC('<path d="M14 4h6v6"/><path d="M20 4 11.5 12.5"/><path d="M19 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5H11"/>'),
  search: IC('<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 20.5 20.5"/>'),
};

/* ---------------- auth screens ---------------- */
function authScreen(mode) {
  const isSetup = mode === "setup";
  app.innerHTML = `
  <div class="center"><div class="auth-card">
    <div class="auth-mark">Z<i>.</i></div>
    <h1>ZUHAYN Admin</h1>
    <p>${isSetup ? "First-time setup: create the admin account for this panel." : "Log in to manage the website content and leads."}</p>
    <form id="authForm">
      <div class="field"><label>Username</label><input name="username" autocomplete="username" required></div>
      <div class="field"><label>Password</label><input name="password" type="password" autocomplete="${isSetup ? "new-password" : "current-password"}" required ${isSetup ? 'minlength="8"' : ""}></div>
      <div class="err" id="authErr"></div>
      <button class="btn" style="width:100%">${isSetup ? "Create account and finish setup" : "Log in"}</button>
    </form>
  </div></div>`;
  document.getElementById("authForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { username: fd.get("username"), password: fd.get("password") };
    const err = document.getElementById("authErr");
    try {
      if (isSetup) {
        await send("/install.php", "POST", payload);
        toast("Setup complete. Please log in.");
        authScreen("login");
      } else {
        const r = await send("/admin/login.php", "POST", payload);
        CSRF = r.csrf; USERNAME = r.username;
        shell();
      }
    } catch (ex) { err.textContent = ex.message; }
  });
}

/* ---------------- shell ---------------- */
const NAV = [
  ["dashboard", "Dashboard"],
  ["leads", "Leads"],
  ["services", "Services"],
  ["packages", "Packages & Prices"],
  ["works", "Works"],
  ["clients", "Clients"],
  ["industries", "Industries"],
  ["faqs", "FAQs"],
  ["stats", "Stats"],
  ["settings", "Settings"],
];
let currentView = "dashboard";
let leadQuery = "";
function shell() {
  const initial = (USERNAME || "A").trim().charAt(0).toUpperCase();
  app.innerHTML = `
  <div class="layout">
    <aside class="rail">
      <a class="mark" href="../" target="_blank" title="Open website">Z<i>.</i></a>
      ${NAV.map(([k, l]) => `<button class="rail-btn" data-nav="${k}" aria-label="${l}">${ICONS[k] || ""}<span class="tip">${l}</span>${k === "leads" ? '<span class="rb-badge hidden" id="leadBadge"></span>' : ""}</button>`).join("")}
      <div class="sp"></div>
      <button class="rail-btn" id="logoutBtn" aria-label="Log out">${ICONS.logout}<span class="tip">Log out</span></button>
      <div class="avatar" title="${esc(USERNAME)}">${esc(initial)}</div>
    </aside>
    <div class="content">
      <header class="topbar">
        <div class="search">${ICONS.search}<input id="globalSearch" type="search" placeholder="Search leads by name, company, phone..." value="${esc(leadQuery)}"></div>
        <div class="sp"></div>
        <a class="top-link" href="../" target="_blank">${ICONS.external} View website</a>
        <div class="userchip"><div class="uc-ava">${esc(initial)}</div>
          <div class="uc-meta"><div class="uc-name">${esc(USERNAME)}</div><div class="uc-role">Administrator</div></div></div>
      </header>
      <main id="main"></main>
    </div>
  </div>`;
  app.querySelectorAll("[data-nav]").forEach((b) =>
    b.addEventListener("click", () => show(b.dataset.nav)));
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await send("/admin/logout.php", "POST", {});
    CSRF = ""; authScreen("login");
  });
  let searchTimer = null;
  document.getElementById("globalSearch").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      leadQuery = e.target.value.trim();
      if (currentView !== "leads" && leadQuery) show("leads");
      else if (currentView === "leads") viewLeads();
    }, 220);
  });
  refreshBadge();
  show("dashboard");
}
async function refreshBadge() {
  try {
    const me = await get("/admin/me.php");
    if (me.csrf) CSRF = me.csrf;
    const badge = document.getElementById("leadBadge");
    if (badge) {
      badge.textContent = me.counts.leads_new;
      badge.classList.toggle("hidden", !me.counts.leads_new);
    }
  } catch (e) { /* badge is optional */ }
}
function markNav(key) {
  app.querySelectorAll("[data-nav]").forEach((b) => b.classList.toggle("on", b.dataset.nav === key));
}
function show(key) {
  currentView = key;
  markNav(key);
  const m = main();
  m.classList.remove("enter");
  void m.offsetWidth;
  m.classList.add("enter");
  ({ dashboard: viewDashboard, leads: viewLeads, services: () => viewResource("services"),
     packages: viewPackages, works: () => viewResource("works"), clients: () => viewResource("clients"),
     industries: () => viewResource("industries"), faqs: () => viewResource("faqs"),
     stats: () => viewResource("stats"), settings: viewSettings }[key] || viewDashboard)();
}
const main = () => document.getElementById("main");

/* ---------------- dashboard ---------------- */
async function viewDashboard() {
  main().innerHTML = `<div class="hello"><h2>Welcome back, ${esc(USERNAME)}</h2><p>Here is what is happening on zuhayn.com.</p></div><div id="dash">Loading...</div>`;
  try {
    const me = await get("/admin/me.php");
    if (me.csrf) CSRF = me.csrf;
    refreshBadge();
    const c = me.counts;
    const leads = await get("/admin/leads.php");
    const latest = (leads.leads || []).slice(0, 5);
    document.getElementById("dash").innerHTML = `
      <div class="cards">
        <div class="stat hot"><b>${c.leads_new}</b><span>New leads waiting</span></div>
        <div class="stat"><b>${c.leads_total}</b><span>Total leads</span></div>
        <div class="stat"><b>${c.services}</b><span>Services</span></div>
        <div class="stat"><b>${c.packages}</b><span>Packages</span></div>
      </div>
      <div class="card flat"><h3>Manage content</h3>
        <div class="quick">
          <button data-go="leads">Leads inbox</button>
          <button data-go="packages">Packages &amp; prices</button>
          <button data-go="services">Services</button>
          <button data-go="works">Works</button>
          <button data-go="settings">Site settings</button>
        </div>
      </div>
      <h3 style="margin:20px 0 12px;font-size:var(--fs-h3)">Latest leads</h3>
      ${latest.length ? latest.map(leadCard).join("") : '<div class="card">No leads yet. New quote form submissions will appear here.</div>'}`;
    bindLeadCards();
    document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => show(b.dataset.go)));
  } catch (e) { document.getElementById("dash").innerHTML = `<div class="err">${esc(e.message)}</div>`; }
}

/* ---------------- leads ---------------- */
let leadFilter = "";
function leadCard(l) {
  const meta = [
    ["Mobile", l.mobile], ["Email", l.email], ["Business type", l.business_type],
    ["Service", l.service || "-"], ["Address", l.address],
  ].map(([k, v]) => `<div><span>${k}</span>${esc(v)}</div>`).join("");
  return `<div class="card lead st-${esc(l.status)}" data-lead="${l.id}">
    <div class="lead-head"><b>${esc(l.full_name)}</b><span class="co">${esc(l.company)}</span>
      <span class="pill"><i></i><em style="font-style:normal">${esc(l.status)}</em></span>
      <span class="when">${esc(l.created_at || "")}</span></div>
    <div class="lead-meta">${meta}${l.message ? `<div class="wide"><span>Message</span>${esc(l.message)}</div>` : ""}</div>
    <div class="row-actions">
      <select data-act="status" style="width:auto">
        ${["new", "contacted", "done", "spam"].map((s) => `<option ${s === l.status ? "selected" : ""}>${s}</option>`).join("")}
      </select>
      <button class="btn small ghost" data-act="save">Save status</button>
      <button class="btn small danger" data-act="del">Delete</button>
    </div>
  </div>`;
}
function bindLeadCards() {
  main().querySelectorAll("[data-lead]").forEach((card) => {
    const id = card.dataset.lead;
    card.querySelector('[data-act="save"]').addEventListener("click", async () => {
      const status = card.querySelector('[data-act="status"]').value;
      await send("/admin/leads.php", "PATCH", { id: Number(id), status });
      toast("Lead updated");
      card.className = "card lead st-" + status;
      card.querySelector(".pill em").textContent = status;
    });
    card.querySelector('[data-act="del"]').addEventListener("click", async () => {
      if (!confirm("Delete this lead permanently?")) return;
      await send("/admin/leads.php", "DELETE", { id: Number(id) });
      card.remove(); toast("Lead deleted");
    });
  });
}
async function viewLeads() {
  main().innerHTML = `<h2>Leads</h2><p class="sub">Quote form submissions from the website. Newest first.${leadQuery ? ` Showing matches for "${esc(leadQuery)}".` : ""}</p>
    <div class="tabs">${["", "new", "contacted", "done", "spam"].map((s) =>
      `<button data-f="${s}" class="${leadFilter === s ? "on" : ""}">${s === "" ? "All" : s[0].toUpperCase() + s.slice(1)}</button>`).join("")}</div>
    <div id="leadList">Loading...</div>`;
  main().querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { leadFilter = b.dataset.f; viewLeads(); }));
  try {
    const r = await get("/admin/leads.php" + (leadFilter ? "?status=" + leadFilter : ""));
    let leads = r.leads;
    if (leadQuery) {
      const q = leadQuery.toLowerCase();
      leads = leads.filter((l) => [l.full_name, l.company, l.email, l.mobile, l.service, l.message]
        .some((v) => String(v || "").toLowerCase().includes(q)));
    }
    document.getElementById("leadList").innerHTML =
      leads.length ? leads.map(leadCard).join("") : '<div class="card">No leads in this view.</div>';
    bindLeadCards();
  } catch (e) { document.getElementById("leadList").innerHTML = `<div class="err">${esc(e.message)}</div>`; }
}

/* ---------------- generic resource editor ---------------- */
const RESCONF = {
  services: { title: "Services", sub: "The nine services shown across the website.", idKey: "id",
    fields: [["title", "Title", "text"], ["description", "Description", "area"], ["tags", "Tags (one per line)", "lines"], ["icon", "Icon index", "num"], ["sort", "Sort order", "num"], ["active", "Active (1/0)", "num"]] },
  works: { title: "Works", sub: "Featured project cards on the home and work pages.", idKey: "slug",
    fields: [["slug", "Slug (id)", "text"], ["logo", "Brand line", "text"], ["offer", "Offer badge", "text"], ["headline_top", "Headline top", "text"], ["headline_em", "Headline accent", "text"], ["sub", "Sub line", "text"], ["cta", "CTA text", "text"], ["tag", "Tag", "text"], ["kind", "Kind", "text"], ["photo", "Photo path", "text"], ["stage", "Stage style", "text"], ["art", "Art index", "num"], ["description", "Description", "area"], ["sort", "Sort order", "num"]] },
  clients: { title: "Clients", sub: "Client cards in the scrolling track.", idKey: "id",
    fields: [["name", "Name", "text"], ["sector", "Sector", "text"], ["note", "Note", "area"], ["initials", "Initials", "text"], ["icon", "Icon index", "num"], ["sort", "Sort order", "num"]] },
  industries: { title: "Industries", sub: "Industry rows on the home and about pages.", idKey: "id",
    fields: [["title", "Title", "text"], ["description", "Description", "area"], ["tags", "Tags (one per line)", "lines"], ["icon", "Icon index", "num"], ["sort", "Sort order", "num"]] },
  faqs: { title: "FAQs", sub: "Use page = site for the main FAQs, pricing for the pricing page FAQs.", idKey: "id",
    fields: [["page", "Page", "text"], ["q", "Question", "text"], ["a", "Answer", "area"], ["sort", "Sort order", "num"]] },
  stats: { title: "Stats", sub: "The count-up numbers on the home and about pages.", idKey: "id",
    fields: [["value", "Value", "num"], ["suffix", "Suffix", "text"], ["label", "Label", "text"], ["plain", "Plain (1 = no count-up)", "num"], ["sort", "Sort order", "num"]] },
};
function fieldHtml([key, label, type], val) {
  const v = type === "lines" && Array.isArray(val) ? val.join("\n") : (val ?? "");
  if (type === "area" || type === "lines")
    return `<div class="field"><label>${label}</label><textarea data-k="${key}">${esc(v)}</textarea></div>`;
  return `<div class="field"><label>${label}</label><input data-k="${key}" type="${type === "num" ? "number" : "text"}" value="${esc(v)}"></div>`;
}
function collect(card, conf) {
  const out = {};
  card.querySelectorAll("[data-k]").forEach((el) => {
    const f = conf.fields.find(([k]) => k === el.dataset.k);
    const type = f ? f[2] : "text";
    if (type === "num") out[el.dataset.k] = Number(el.value || 0);
    else if (type === "lines") out[el.dataset.k] = el.value.split("\n").map((s) => s.trim()).filter(Boolean);
    else out[el.dataset.k] = el.value;
  });
  return out;
}
async function viewResource(res) {
  const conf = RESCONF[res];
  main().innerHTML = `<h2>${conf.title}</h2><p class="sub">${conf.sub}</p><div id="rows">Loading...</div>
    <button class="btn" id="addBtn">+ Add new</button>`;
  const draw = async () => {
    const r = await get("/admin/content.php?resource=" + res);
    const box = document.getElementById("rows");
    box.innerHTML = r.rows.map((row) => `
      <div class="card" data-row="${esc(row[conf.idKey])}">
        <div class="grid2">${conf.fields.map((f) => fieldHtml(f, row[f[0]])).join("")}</div>
        <div class="row-actions"><span class="saved"></span>
          <button class="btn small" data-a="save">Save</button>
          <button class="btn small danger" data-a="del">Delete</button></div>
      </div>`).join("") || '<div class="card">Nothing here yet.</div>';
    box.querySelectorAll("[data-row]").forEach((card) => {
      const id = card.dataset.row;
      card.querySelector('[data-a="save"]').addEventListener("click", async () => {
        const body = collect(card, conf);
        body.id = conf.idKey === "slug" ? id : Number(id);
        await send("/admin/content.php?resource=" + res, "PUT", body);
        card.querySelector(".saved").textContent = "Saved";
        toast("Saved");
      });
      card.querySelector('[data-a="del"]').addEventListener("click", async () => {
        if (!confirm("Delete this item permanently?")) return;
        await send("/admin/content.php?resource=" + res, "DELETE", { id: conf.idKey === "slug" ? id : Number(id) });
        card.remove(); toast("Deleted");
      });
    });
  };
  document.getElementById("addBtn").addEventListener("click", async () => {
    const blank = {};
    conf.fields.forEach(([k, , t]) => { blank[k] = t === "num" ? 0 : t === "lines" ? [] : ""; });
    if (res === "works") blank.slug = "new-work-" + Date.now();
    if (res === "faqs") blank.page = "site";
    await send("/admin/content.php?resource=" + res, "POST", blank);
    toast("Added. Fill it in and Save.");
    draw();
  });
  try { await draw(); } catch (e) { document.getElementById("rows").innerHTML = `<div class="err">${esc(e.message)}</div>`; }
}

/* ---------------- packages ---------------- */
async function viewPackages() {
  main().innerHTML = `<h2>Packages &amp; Prices</h2><p class="sub">Pricing page packages, grouped by service. Prices include the ৳ sign as shown on the site (for example ৳15,000).</p><div id="pkgBox">Loading...</div>`;
  try {
    const svc = await get("/admin/content.php?resource=services");
    SERVICES = svc.rows;
    const pk = await get("/admin/content.php?resource=packages");
    const st = await get("/admin/content.php?resource=settings");
    const box = document.getElementById("pkgBox");
    box.innerHTML = SERVICES.map((s) => {
      const rows = pk.rows.filter((p) => Number(p.service_id) === Number(s.id));
      return `<div class="card"><h3>${esc(s.title)}</h3>
        <div class="field"><label>Note under this service (optional)</label>
          <input data-note="${s.id}" value="${esc(st.settings["pkg_note_" + s.id] || "")}" placeholder="e.g. Ad spend is paid by you directly...">
          <div class="row-actions"><button class="btn small ghost" data-notebtn="${s.id}">Save note</button></div></div>
        ${rows.map((p) => pkgCard(p)).join("")}
        <button class="btn small" data-addpkg="${s.id}">+ Add package to ${esc(s.title)}</button>
      </div>`;
    }).join("");
    box.querySelectorAll("[data-notebtn]").forEach((b) => b.addEventListener("click", async () => {
      const id = b.dataset.notebtn;
      const val = box.querySelector(`[data-note="${id}"]`).value;
      const settings = {}; settings["pkg_note_" + id] = val;
      await send("/admin/content.php?resource=settings", "POST", { settings });
      toast("Note saved");
    }));
    box.querySelectorAll("[data-addpkg]").forEach((b) => b.addEventListener("click", async () => {
      await send("/admin/content.php?resource=packages", "POST",
        { service_id: Number(b.dataset.addpkg), name: "New Package", price: "৳0", per: "per month", feats: [], popular: 0, sort: 99 });
      toast("Package added"); viewPackages();
    }));
    bindPkgCards();
  } catch (e) { document.getElementById("pkgBox").innerHTML = `<div class="err">${esc(e.message)}</div>`; }
}
function pkgCard(p) {
  return `<div class="card flat" style="background:var(--inset)" data-pkg="${p.id}">
    <div class="grid3">
      <div class="field"><label>Tier name</label><input data-k="name" value="${esc(p.name)}"></div>
      <div class="field"><label>Price</label><input data-k="price" value="${esc(p.price)}"></div>
      <div class="field"><label>Period</label><input data-k="per" value="${esc(p.per)}"></div>
    </div>
    <div class="grid2">
      <div class="field"><label>Features (one per line)</label><textarea data-k="feats">${esc((p.feats || []).join("\n"))}</textarea></div>
      <div>
        <div class="field"><label>Sort order</label><input data-k="sort" type="number" value="${esc(p.sort)}"></div>
        <div class="check"><input type="checkbox" data-k="popular" ${Number(p.popular) ? "checked" : ""}><label>Most Popular badge</label></div>
      </div>
    </div>
    <div class="row-actions"><span class="saved"></span>
      <button class="btn small" data-a="save">Save</button>
      <button class="btn small danger" data-a="del">Delete</button></div>
  </div>`;
}
function bindPkgCards() {
  main().querySelectorAll("[data-pkg]").forEach((card) => {
    const id = Number(card.dataset.pkg);
    card.querySelector('[data-a="save"]').addEventListener("click", async () => {
      const body = { id };
      card.querySelectorAll("[data-k]").forEach((el) => {
        if (el.dataset.k === "popular") body.popular = el.checked ? 1 : 0;
        else if (el.dataset.k === "feats") body.feats = el.value.split("\n").map((s) => s.trim()).filter(Boolean);
        else if (el.dataset.k === "sort") body.sort = Number(el.value || 0);
        else body[el.dataset.k] = el.value;
      });
      await send("/admin/content.php?resource=packages", "PUT", body);
      card.querySelector(".saved").textContent = "Saved"; toast("Package saved");
    });
    card.querySelector('[data-a="del"]').addEventListener("click", async () => {
      if (!confirm("Delete this package permanently?")) return;
      await send("/admin/content.php?resource=packages", "DELETE", { id });
      card.remove(); toast("Package deleted");
    });
  });
}

/* ---------------- settings ---------------- */
const SETTING_FIELDS = [
  ["site_name", "Site name"], ["legal_name", "Legal name"], ["phone_display", "Phone (display)"],
  ["phone_href", "Phone link (tel:...)"], ["facebook", "Facebook URL"], ["linkedin", "LinkedIn URL"],
  ["address", "Address"], ["city", "City"], ["country", "Country"], ["founded", "Founded text"],
  ["founder", "Founder line"], ["notify_email", "Lead notification email"], ["notify_from", "Notification from address"],
];
async function viewSettings() {
  main().innerHTML = `<h2>Settings</h2><p class="sub">Site information and lead notifications.</p><div id="setBox">Loading...</div>
    <div class="card"><h3>Change password</h3>
      <div class="grid2">
        <div class="field"><label>Current password</label><input type="password" id="pwCur"></div>
        <div class="field"><label>New password (min 8)</label><input type="password" id="pwNew"></div>
      </div>
      <div class="row-actions"><button class="btn small" id="pwBtn">Change password</button></div>
    </div>`;
  try {
    const r = await get("/admin/content.php?resource=settings");
    document.getElementById("setBox").innerHTML = `<div class="card">
      ${SETTING_FIELDS.map(([k, l]) => `<div class="field"><label>${l}</label><input data-s="${k}" value="${esc(r.settings[k] || "")}"></div>`).join("")}
      <div class="row-actions"><button class="btn small" id="setSave">Save settings</button></div></div>`;
    document.getElementById("setSave").addEventListener("click", async () => {
      const settings = {};
      main().querySelectorAll("[data-s]").forEach((el) => { settings[el.dataset.s] = el.value; });
      await send("/admin/content.php?resource=settings", "POST", { settings });
      toast("Settings saved");
    });
    document.getElementById("pwBtn").addEventListener("click", async () => {
      await send("/admin/content.php?resource=password", "POST",
        { current: document.getElementById("pwCur").value, new: document.getElementById("pwNew").value });
      toast("Password changed");
      document.getElementById("pwCur").value = ""; document.getElementById("pwNew").value = "";
    });
  } catch (e) { document.getElementById("setBox").innerHTML = `<div class="err">${esc(e.message)}</div>`; }
}

/* ---------------- boot ---------------- */
(async function boot() {
  try {
    const me = await get("/admin/me.php");
    CSRF = me.csrf; USERNAME = me.username;
    shell();
    return;
  } catch (e) { /* not logged in */ }
  try {
    const inst = await get("/install.php");
    if (inst && inst.ready) { authScreen("setup"); return; }
  } catch (e) { /* installer locked: normal */ }
  authScreen("login");
})();
