"use client";

import { Bubbles } from "@/components/retro/bubbles";

/**
 * Section 2 — palate-cleanser. Muted brick red with a diagonal red wipe at the
 * top edge (the hero's red cutting away at an angle), and only a few slow bubbles.
 */
export function RetroTransition() {
  return (
    <section className="relative h-[52vh] min-h-[360px] overflow-hidden bg-retro-brick">
      {/* diagonal red wipe carrying the hero red down at an angle */}
      <div
        className="absolute inset-x-0 top-0 h-[14vw] bg-retro-red"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }}
      />
      <Bubbles tone="cream" count={5} seed={7} />

      <p className="absolute left-1/2 top-1/2 w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 text-center text-retro-cream/80 text-[clamp(1rem,2.2vw,1.4rem)] italic">
        Take a breath. The good stuff is just ahead.
      </p>
    </section>
  );
}
