# Cloudflare Worker Hit Counter

This folder contains a minimal Cloudflare Worker you can deploy to back the nostalgic hit counter on the site.

## 1. Prerequisites
- A Cloudflare account with Workers and Workers KV enabled.
- [`wrangler`](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI installed and authenticated (`wrangler login`).

## 2. Configure the Worker
1. Create a Workers KV namespace (e.g. `fklb-hit-counter`).
2. Update `wrangler.toml`:
   - Change the `name` if desired.
   - Paste the namespace IDs into the `id` and `preview_id` fields under `[[kv_namespaces]]`.
3. Optionally tweak the key or storage logic inside `src/index.js`.

## 3. Deploy
```bash
cd cloudflare-worker
wrangler deploy
```

Deployment prints a `https://<your-subdomain>.workers.dev` URL (or custom domain if configured). The worker responds to both `/` and `/api/hit`, so you can paste either into the front-end configuration. By default the worker increments the counter on `POST` requests and returns the current value for both `GET` and `POST`.

## 4. Wire up the front end
1. Open `index.html` and find the `<script>` tag near the bottom of the page.
2. Replace the placeholder `data-endpoint` value with the URL of your deployed worker (for example `https://fklb-hit-counter.workers.dev/`).
3. Commit and redeploy the static site.

### API contract
- **POST** increments the counter and returns JSON: `{ "count": <number> }`.
- **GET** returns the current count without incrementing.
- CORS headers are included so the static site can call it directly from the browser.

That’s it—every page load now ticks the counter stored in Workers KV.
