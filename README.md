# Accord — Super Strong Beer (Next.js)

Marketing site for **Accord** super strong beers (Accord Distillers & Brewers Pvt.
Ltd.), rebuilt as a **Next.js 14 + TypeScript + Tailwind** app integrating the
React components from `website components/`, with **framer-motion** animation, a
**GSAP** scroll-triggered footer, and **Spline** 3D wiring.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (shadcn-style tokens in `app/globals.css`, brand palette in `tailwind.config.ts`)
- **framer-motion** — all motion (3D tilt, reveals, stagger, count-up, AnimatePresence)
- **gsap** + ScrollTrigger — cinematic footer
- **@splinetool/react-spline** — 3D scene (wired, see Hero notes)
- **lucide-react** — icons

## Components (from `website components/`, adapted to Accord)

| Source component | File | Effect |
|---|---|---|
| NavHeader | `components/ui/nav-header.tsx` | Sliding-tab cursor pill, scroll state, mobile menu |
| SplineScene + Spotlight | `components/ui/splite.tsx`, `spotlight.tsx`, `components/site/hero.tsx` | Mouse-follow spotlight + **3D tilt bottle** + Spline (optional) |
| FeatureCarousel | `components/site/features.tsx` | Auto-cycling spotlight panel + step dots + pillar grid |
| InteractiveSelector | `components/ui/interactive-selector.tsx` | Expanding bottle panels (hover/click) |
| AnimatedText | `components/ui/animated-text.tsx` | Per-letter reveal headings |
| SquishyCard | `components/ui/squishy-card.tsx` | Squish-on-hover beer cards + morphing SVG blob |
| CinematicFooter | `components/site/footer.tsx` | GSAP marquee, giant wordmark, heartbeat, back-to-top |
| HeroGeometric | `components/site/background.tsx` | Floating gradient shapes + grain + stripes + bubbles |

Page composition: `app/page.tsx`. Brand content/data: `components/site/data.ts`.

### 3D in the hero

The hero bottle uses a **framer-motion pointer-driven 3D tilt** (perspective +
`rotateX/rotateY` springs, with layered `translateZ` depth) — the on-brand 3D
centerpiece. The **Spline** 3D scene is fully wired but disabled by default
(`ENABLE_SPLINE` in `components/site/hero.tsx`). Set it to `true` and drop in an
on-brand scene URL from spline.design to render an interactive 3D scene behind the
hero.

## Notes / preview flags

- Bottle images (`public/images/`) are transparent cut-outs extracted from the
  Accord brochure PDF.
- An **age gate** (legal-drinking-age) shows on first visit, remembered per session.
- `NEXT_PUBLIC_NOAGE=1` bypasses the age gate; `NEXT_PUBLIC_NOANIM=1` renders
  reveal content immediately — both are dev/preview/screenshot helpers, off in prod.
- Contact email and Legal/Privacy/Cookie links are **placeholders** — replace before launch.
- The previous static HTML/CSS/JS version is preserved in `legacy-static/`.
