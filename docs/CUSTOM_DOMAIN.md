# Custom domain: smmiri.com

## DNS (Cloudflare, zone smmiri.com)

GitHub Pages apex + www ([docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `smmiri.github.io` | DNS only |

Alternatively, Cloudflare CNAME flattening on `@` → `smmiri.github.io` if you prefer a single record.

## GitHub Pages (repo `smmiri/smmiri.github.io`)

1. **Settings → Pages → Build and deployment:** Source = **GitHub Actions**
2. **Settings → Pages → Custom domain:** `smmiri.com`
3. Wait for DNS check and TLS (minutes to 24h)
4. Enable **Enforce HTTPS**

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
