# Deployment & Production Hosting

## GitHub Pages (Recommended for current static MVP)

1. Go to your repo on GitHub: https://github.com/kwizzlesurp10-ctrl/vibe-forge-ide
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment" → **Source**, select:
   - Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.
5. Wait 1-2 minutes for the first deploy.

Your live public demo will be available at:
**https://kwizzlesurp10-ctrl.github.io/vibe-forge-ide/**

Just open `index.html` in the browser — it works immediately from GitHub Pages.

## Future Production (Phase 3+)

When we migrate to the Next.js version:
- Deploy to **Vercel** (recommended) or Netlify
- Connect the GitHub repo
- Automatic deploys on push to `main`
- Environment variables for any backend agent bridges (Supabase, etc.)

## Local Development

```bash
git clone https://github.com/kwizzlesurp10-ctrl/vibe-forge-ide.git
cd vibe-forge-ide
# Open index.html directly in your browser (no build step needed)
```

## Notes
- The current single-file `index.html` is fully self-contained (Tailwind + Font Awesome via CDN).
- For offline use, you can download the HTML and open it locally.
- Future versions will include a production build step and real backend integration.

---

*This deployment setup was added as part of immediate production polish on 2026-06-03.*