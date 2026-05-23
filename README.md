# smmiri.com

Personal CV site for [Mohammad Miri](https://smmiri.com).

## Deploy

Push to `main` on `github.com/smmiri/smmiri.github.io`. **Pages → Settings → Source: GitHub Actions** (not “Deploy from a branch”).

### Blank page?

Title loads but body empty = `/assets/*.js` returned 404. Re-run **Actions → Deploy to GitHub Pages → Run workflow** and confirm the build job’s “Verify build output” step lists files in `dist/assets/`.
