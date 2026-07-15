# swordistudios-web

Landing page for **swordi.studios** — the independent game studio behind
[Delikta](https://www.delikta.app), the daily detective game.

Live at **https://swordistudios.com** (GitHub Pages).

## Stack

Plain static HTML/CSS/JS — no build step, no dependencies, no external requests
(system fonts only, GDPR-friendly). Bilingual EN/DE via a small JS dictionary
(`js/main.js`), preference stored in `localStorage`.

## Structure

```
index.html            landing page (hero → Delikta showcase → studio → footer)
impressum.html        Impressum (§5 ECG / §25 MedienG) — placeholders to fill in
privacy.html          privacy policy DE + EN — placeholders to fill in
css/style.css         all styling
js/main.js            i18n, scroll reveals, feather parallax
assets/img/           optimized logos, feature graphic, screenshots (webp)
CNAME                 custom domain for GitHub Pages
.github/workflows/    deploy workflow (push to main → GitHub Pages)
```

## Deployment

Every push to `main` deploys via GitHub Actions (`deploy.yml`) using the
official `actions/deploy-pages` flow.

One-time repo setup:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. **Settings → Pages → Custom domain:** `swordistudios.com` (+ enforce HTTPS once the certificate is issued)

DNS at world4you for `swordistudios.com`:

| Type  | Host | Value                 |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | mgursch.github.io.    |

## Local preview

Open `index.html` directly, or:

```
python3 -m http.server 8000
```
