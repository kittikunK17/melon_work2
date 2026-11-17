# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

One-page static site for Tawan Farm (Nong Khai melons, Baan Tawan Resort). Plain HTML/CSS/JS: no build step, no package.json, no tests, no backend. Thai is the default language; English is a toggle. Supports dark mode and phones.

Hosted on GitHub Pages from `main` (root): repo `github.com/kittikunK17/melon_work2`, live at `kittikunk17.github.io/melon_work2`. Pushing to `main` deploys.

The owner is not a developer and edits `js/content.js` directly on GitHub's web editor. README.md is the owner's Thai how-to guide; keep it accurate if a workflow changes.

## Every change

1. If `css/style.css`, `js/main.js` or `js/motion.js` changed, bump the version in `index.html` (see "Cache busting" below).
2. Test at phone width (~390px) and on desktop before calling it done.
3. Keep phones light: no moving blurs, `backdrop-filter`, or always-running repaint animations on touch screens. Put phone overrides in the `@media (hover:none),(max-width:860px)` block at the end of style.css.
4. Commit and push only when the user asks.

## Running locally

```
python -m http.server 8765      # then open http://localhost:8765/
```
The phone layout breakpoint is `max-width: 860px` (nav collapses at 820px). Syntax check: `node -e "new Function(require('fs').readFileSync('js/main.js','utf8'))"`.

## Architecture

- **`js/content.js`** sets `window.SITE`: phone, address, map, farm photo, `gallery[]`, `melons[]` (each with `th`/`en` objects), and every UI string in `text.th` / `text.en`. It is the only file the owner edits. Empty strings `''` mean "hide this field". `en` falls back to `th`.
- **`index.html`** is the static skeleton. Text nodes carry `data-i18n="key"` and are filled from `SITE.text[lang]`. The variety panels, gallery, marquee, map and farm photo are rendered into empty containers by main.js.
- **Script loading** is an ordered loader at the end of `<body>` (`async = false`): GSAP → ScrollTrigger → Lenis (CDN) → `content.js?t=Date.now()` → `main.js?v=…` → `motion.js?v=…`.
- **`js/main.js`** is the core. It must work without the CDN libraries. It handles rendering, the language toggle (stored in localStorage `tawan-lang`), the variety panels and detail `<dialog id="sheet">`, the gallery and `<dialog id="lightbox">` viewer (it pushes a history entry so the phone's Back button closes it), the hide-on-scroll header, the scroll-driven melon-cut section, and in-page anchor jumps.
- **`js/motion.js`** adds optional extras only (GSAP reveals, Lenis smooth scroll, progress bar, marquee skew, mouse effects). It exits early if GSAP is missing or reduced motion is on. Lenis is **desktop only** (`window.__lenis`); phones use native scrolling.
- **`css/style.css`**: colour tokens sit at the top in `:root`, with dark-mode overrides. A `@media (hover:none),(max-width:860px)` block at the bottom turns off expensive effects on phones.

### Things that span files and are easy to break

- **Cache busting:** GitHub Pages caches files for about 10 minutes. Whenever `css/style.css`, `js/main.js` or `js/motion.js` change, bump the version (format `YYYYMMDDHHMM`) in **both** places in `index.html`: the `?v=` on the stylesheet link in `<head>`, and `var v = '…'` in the script loader. `content.js` always loads fresh, so never version it.
- **Melon-cut section (`#cut`):** on desktop it is a tall section (`height: min(240vh,2200px)`) with a `position: sticky` stage; `onScroll()` → `setCut(p)` splits the melon based on scroll. On phones, tall screens and reduced motion it is not pinned (`staticCut()` / `.cut.live`).
- **In-page anchor jumps** (main.js click handler): a custom eased scroll that sets `html.is-jumping` (pauses CSS animations), freezes the melon in its end state, and **skips the sticky-pinned stretch of `#cut`** so the page never hangs there. It stops when the user wheels or touches, and has a 2s safety timer so `is-jumping` can never get stuck. It always scrolls with `window.scrollTo({behavior:'instant'})`: `html` has `scroll-behavior: smooth`, which would otherwise turn every step into a slow native smooth scroll (`html.lenis` overrides this).
- **`onScroll()` performance:** do all layout reads (`getBoundingClientRect`) first, then all writes, and skip writes when values haven't changed. Phones lagged before this rule.
- **Gallery visibility:** items stay hidden until their file loads, items whose file is missing are removed, and if nothing loads the whole section and its nav link are hidden (`galCheck()`). Vertical media gets the `.tall` class. On screens ≤860px, tapping a photo or video opens the lightbox instead of playing inline.
- **Image fallbacks:** a missing melon or farm photo is swapped for an inline SVG drawing (a capture-phase `error` listener).

## Media conventions

- Photos: ~1200px wide, ≤300 KB. Melon photos `images/melons/melon-N.jpg`, farm photo `images/farm/farm-1.jpg` (4:5), gallery `images/gallery/`.
- Videos: the owner drops large full-HD phone clips into `videos/`. Re-encode with ffmpeg to 720p H.264, no audio, plus a `.jpg` cover in `images/gallery/`, keeping files under ~20 MB. Move the original out of the repo to `C:\Users\MSI\Downloads\`. Then update the `gallery` entry in `content.js`.
- When replacing media, use a new filename rather than overwriting, so cached copies don't linger.
