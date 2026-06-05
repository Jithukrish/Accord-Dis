"use client";

import { Bubbles } from "@/components/retro/bubbles";

/**
 * Section 7 — footer on red. Small-caps link columns, a copyright line, and a
 * MASSIVE cream wordmark spanning the full width, cropped by the bottom edge and
 * tilted a few degrees with a circled R. Bubbles float over it.
 */
const COLUMNS = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "#home" },
      { label: "Our Beers", href: "#beers" },
      { label: "The Range", href: "#range" },
      { label: "The Story", href: "#story" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal notice", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Manage cookies", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "hello@accord.beer", href: "mailto:hello@accord.beer" }],
  },
];

export function RetroFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-retro-red pt-24 text-retro-cream">
      <Bubbles tone="cream" count={10} seed={11} />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.26em] text-retro-cream/65">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[0.92rem] text-retro-cream/90 transition-colors hover:text-retro-cream hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-[0.72rem] uppercase tracking-[0.18em] text-retro-cream/65">
            <p>© 2026 Accord Distillers &amp; Brewers.</p>
            <p className="mt-2">Please drink responsibly.</p>
            <p className="mt-2">Design by Soxo.</p>
          </div>
        </div>
      </div>

      {/* massive cropped wordmark */}
      <div className="relative z-10 mt-16 overflow-hidden">
        <h2 className="retro-head -mb-[3vw] -rotate-2 whitespace-nowrap text-center text-retro-cream text-[26vw]">
          Accord
          <sup className="ml-2 align-top text-[6vw]">
            <span className="inline-grid h-[7vw] w-[7vw] place-items-center rounded-full border-[0.4vw] border-retro-cream text-[3.4vw]">
              R
            </span>
          </sup>
        </h2>
      </div>
    </footer>
  );
}
