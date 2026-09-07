const SITE_URL = "https://smmiri.com";

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function orgHtml(org, orgLink) {
  if (!orgLink?.label || !orgLink?.url) return escapeHtml(org);
  const idx = org.indexOf(orgLink.label);
  if (idx === -1) return escapeHtml(org);
  const before = escapeHtml(org.slice(0, idx));
  const label = escapeHtml(orgLink.label);
  const after = escapeHtml(org.slice(idx + orgLink.label.length));
  return `${before}<a href="${escapeHtml(orgLink.url)}" target="_blank" rel="noreferrer noopener">${label}</a>${after}`;
}

/** Static CV markup so first-wave crawlers see real content (avoids soft-404 on the empty React shell). */
export function prerenderCv(cv) {
  const year = new Date().getFullYear();
  const experience = cv.experience
    .map((role) => {
      const bullets = role.bullets
        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
        .join("");
      return `<li>
          <div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 class="text-base font-semibold text-heading">${escapeHtml(role.title)}<span class="font-normal text-body"> · ${orgHtml(role.org, role.orgLink)}</span></h3>
            <p class="shrink-0 text-sm text-muted">${escapeHtml(role.dates)}</p>
          </div>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted">${bullets}</ul>
        </li>`;
    })
    .join("");

  const education = cv.education
    .map(
      (row) =>
        `<li><span class="font-medium text-heading">${escapeHtml(row.year)}</span> · ${escapeHtml(row.degree)}, ${escapeHtml(row.institution)}</li>`,
    )
    .join("");

  const publications = cv.publications
    .map(
      (item) =>
        `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.title)}</a></li>`,
    )
    .join("");

  const skills = cv.skills
    .map(
      (group) =>
        `<li><span class="font-medium text-heading">${escapeHtml(group.label)}:</span> ${escapeHtml(group.items)}</li>`,
    )
    .join("");

  const repos = cv.repos
    .map(
      (repo) =>
        `<li><a href="${escapeHtml(repo.url)}" target="_blank" rel="noreferrer noopener" class="font-medium">${escapeHtml(repo.name)}</a><span class="text-muted"> — ${escapeHtml(repo.description)}</span></li>`,
    )
    .join("");

  const playground = (cv.playground || [])
    .map(
      (item) =>
        `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.label)}</a>${item.description ? ` — ${escapeHtml(item.description)}` : ""}</li>`,
    )
    .join("");

  return `<div class="min-h-screen bg-surface text-body">
      <header class="border-b border-default bg-surface-card">
        <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 class="text-2xl font-semibold tracking-tight text-heading sm:text-3xl">${escapeHtml(cv.name)}</h1>
          <p class="mt-1 text-sm text-muted">${escapeHtml(cv.location)}</p>
          <p class="mt-4 max-w-prose text-sm leading-relaxed sm:text-base">${escapeHtml(cv.summary)}</p>
        </div>
      </header>
      <main class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav aria-label="Contact" class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href="mailto:${escapeHtml(cv.email)}">${escapeHtml(cv.email)}</a>
          <a href="${escapeHtml(cv.linkedin)}" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <a href="${escapeHtml(cv.github)}" target="_blank" rel="noreferrer noopener">GitHub</a>
        </nav>
        <section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Experience</h2>
          <ul class="space-y-8">${experience}</ul>
        </section>
        <section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Education</h2>
          <ul class="space-y-2 text-sm leading-relaxed">${education}</ul>
        </section>
        <section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Selected publications</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted">${publications}</ul>
        </section>
        <section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Skills</h2>
          <ul class="space-y-3 text-sm leading-relaxed">${skills}</ul>
        </section>
        <section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Open work &amp; code</h2>
          <div class="space-y-4 text-sm leading-relaxed">
            <p>${escapeHtml(cv.openWorkIntro)}</p>
            <ul class="space-y-2">${repos}</ul>
          </div>
        </section>
        ${
          playground
            ? `<section class="mt-10">
          <h2 class="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">Playground</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm leading-relaxed">${playground}</ul>
        </section>`
            : ""
        }
      </main>
      <footer class="border-t border-default py-6 text-center text-xs text-muted">© ${year} ${escapeHtml(cv.name)}</footer>
    </div>`;
}

export function jsonLdGraph(cv, siteUrl = SITE_URL) {
  const origin = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "smmiri.com",
        description: cv.summary,
        inLanguage: "en-CA",
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#profile`,
        url: `${origin}/`,
        name: `${cv.name}, Ph.D. · Energy systems engineer`,
        description: cv.summary,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/#person` },
        about: { "@id": `${origin}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: cv.name,
        url: `${origin}/`,
        email: `mailto:${cv.email}`,
        jobTitle: "Energy systems engineer",
        description: cv.summary,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vancouver",
          addressRegion: "BC",
          addressCountry: "CA",
        },
        sameAs: [cv.linkedin, cv.github].filter(Boolean),
      },
    ],
  };
}

export function sitemapXml(cv, siteUrl = SITE_URL, lastmod = new Date().toISOString().slice(0, 10)) {
  const origin = siteUrl.replace(/\/$/, "");
  const extra = (cv.playground || []).map((item) => item.url).filter(Boolean);
  const locs = [`${origin}/`, ...new Set(extra)];
  const urls = locs
    .map(
      (loc, i) => `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${i === 0 ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function injectPrerender(html, { body, jsonLd }) {
  const withLd = html.includes("application/ld+json")
    ? html
    : html.replace(
        "</head>",
        `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
      );

  if (!withLd.includes('id="root"')) {
    throw new Error("index.html is missing #root; cannot prerender CV");
  }

  return withLd.replace(
    /<div id="root">[\s\S]*?(?=\s*<script\b)/,
    `<div id="root">${body}</div>\n    `,
  );
}
