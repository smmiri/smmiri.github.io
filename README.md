# smmiri.com

Personal CV site for [Mohammad Miri](https://smmiri.com). Static Vite + React, deployed to GitHub Pages.

**Live:** https://smmiri.com (after DNS + Pages setup)

## Local dev

```bash
npm install
npm run dev
```

## Content

- [`content/cv.md`](content/cv.md) — readable source
- [`content/cv.json`](content/cv.json) — structured data rendered by the site (keep in sync)

## Deploy

Push to `main` on `github.com/smmiri/smmiri.github.io`. See [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) and [`docs/CUSTOM_DOMAIN.md`](docs/CUSTOM_DOMAIN.md).

## License

MIT
