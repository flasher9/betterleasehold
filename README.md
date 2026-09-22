# betterleasehold.co.uk

Static guidance site built with Astro. No database, no server-side code, no PHP. The build
produces plain HTML, CSS and a few kilobytes of JavaScript, which is why it can sit on the
Krystal shared plan you already pay for and still be very hard to attack.

## Running it locally

You need Node 20 or later.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the finished site to dist/
npm run preview  # serve dist/ locally to check before deploying
```

## Writing content

Guidance pages are Markdown files in `src/content/guides/`. The front matter is validated by
`src/content.config.ts` **the build will fail** if a page is missing `sources` or
`lawStatedAt`. That is deliberate. It makes it impossible to publish an unreferenced page or
one with no review date.

```yaml
---
title: Does your block qualify?
summary: One sentence, under 200 characters, used for the meta description.
step: 1          # position in the statutory sequence, 0 if not part of it
order: 1         # position in the sidebar
lawStatedAt: 2026-09-04
reviewedBy: Jane Smith, solicitor    # optional
sources:
  - title: Right to Manage Leasehold Advisory Service
    url: https://www.lease-advice.org/building-management/right-to-manage/
    licence: ogl-v3        # ogl-v3 | legislation | other
draft: false
---
```

Setting `licence: ogl-v3` or `legislation` on any source automatically prints the Open
Government Licence attribution at the foot of that page. Use `other` for anything you are
citing but not reusing the RICS Code, for example, which is cited and linked but never
reproduced.

A new page appears in the sidebar, on the Right to Manage index and in the sitemap
automatically. The only place with hard-coded content is the statutory sequence in
`src/components/ProcessRail.astro`.

## Deploying to Krystal

Krystal's shared cPanel plan serves static files perfectly well. There is no Node runtime
involved: you build locally or in CI, and upload the contents of `dist/`.

### Option A manual, to start with

1. `npm run build`
2. Upload everything **inside** `dist/` (not the folder itself) to `public_html/` via SFTP or
   cPanel's File Manager. Include the hidden `.htaccess`.
3. Force HTTPS and enable the free SSL certificate in cPanel if it is not already on.

### Option B automatic, once you are past the first few edits

Push to GitHub and let the included workflow build and upload on every commit to `main`.
Add three repository secrets: `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`. See
`.github/workflows/deploy.yml`.

### WordPress

If WordPress is currently at the domain root, move it to a subdirectory or remove it before
pointing the domain at this site. Do not run both in `public_html/`. If you want to keep
WordPress for anything, put it on a subdomain.

## Security posture

- Nothing executes on the server. There is no login, no database and no PHP, so the usual
  WordPress attack surface does not exist here.
- `public/.htaccess` sets HSTS, a strict Content-Security-Policy, `X-Content-Type-Options`,
  `X-Frame-Options` and a restrictive `Permissions-Policy`.
- Fonts are self-hosted through `@fontsource`, so no request goes to Google and the CSP can
  stay at `'self'` throughout.
- Put Cloudflare in front for DDoS protection, caching and bot filtering. The site is static,
  so caching can be aggressive.

## Not yet done

- `src/pages/[page].astro` holds placeholder shells for About, Privacy, Terms, Accessibility
  and Contact. These need real content before launch.
- **Every guidance page in `src/content/guides/` is a first draft and has not been checked by
  a lawyer.** Do not publish them as they stand.
- No analytics. When you add some, use a cookieless product (Plausible, Fathom) and add its
  domain explicitly to the CSP.
