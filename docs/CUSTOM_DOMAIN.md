# Custom domain: smmiri.com

This repo (`smmiri/smmiri.github.io`) serves the **apex** CV site at `https://smmiri.com`.

The rent vs buy calculator stays on **`rentorbuy.smmiri.com`** (repo `smmiri/mortgage-vs-invest`). Both use the same Cloudflare zone; only the records below point the apex/www to this user site.

## DNS (Cloudflare, zone smmiri.com)

GitHub Pages apex + www ([docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| A | `@` | `185.199.108.153` | DNS only (grey cloud) |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `smmiri.github.io` | DNS only |

Alternatively, Cloudflare CNAME flattening on `@` → `smmiri.github.io` if you prefer a single record.

**Do not change** the existing `rentorbuy` CNAME (points at the calculator repo’s Pages URL).

## GitHub Pages (repo `smmiri/smmiri.github.io`)

1. **Settings → Pages → Build and deployment:** Source = **GitHub Actions**
2. **Settings → Pages → Custom domain:** `smmiri.com`
3. Wait for DNS check and TLS (minutes to 24h)
4. Enable **Enforce HTTPS**
5. Optional: redirect `www.smmiri.com` → `smmiri.com` in Cloudflare (Page rule or redirect rule) if you want a single canonical host. GitHub may also issue a cert for `www` when the CNAME is present.

## Verify (after DNS + GitHub)

```bash
dig +short smmiri.com A
dig +short www.smmiri.com CNAME
curl -sI https://smmiri.com/ | head -5
```

Expect four GitHub Pages A records on the apex, `www` CNAME to `smmiri.github.io`, and `200`/`301` with a valid TLS cert on `https://smmiri.com/`.

Smoke test in a browser: hard refresh, toggle light/dark, open ElectrifiedGrid link, check publication DOI links.

## Google Search Console

- **Sitemap (apex):** `https://smmiri.com/sitemap.xml` — lists the CV (`smmiri.com`) and calculator (`rentorbuy.smmiri.com`). `robots.txt` on the apex points crawlers to this file.
- **Property type:** use a **Domain** property for `smmiri.com` if you want one Search Console setup for the apex and subdomains. Submit the apex sitemap there after deploy.
- **rentorbuy** also ships its own `https://rentorbuy.smmiri.com/sitemap.xml` (optional second submit on a URL-prefix property, or rely on the apex sitemap only).

## Build (this repo)

Deploy workflow sets:

- `VITE_BASE=/`
- `VITE_SITE_URL=https://smmiri.com`

Local production build:

```bash
VITE_BASE=/ VITE_SITE_URL=https://smmiri.com npm run build
npm run preview
```

## Content

Edit [`content/cv.md`](content/cv.md) (narrative source) and sync [`content/cv.json`](content/cv.json) (site data) when you change copy.
