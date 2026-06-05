"use client";

import { SwimmerArt } from "@/components/retro/illustrations";

/**
 * Section 6 — giant red condensed slogan scrolling as an infinite marquee on a
 * cream background, with thin-outline red circle motifs woven between phrases
 * and a red line-art swimmer kicking through.
 */
export function RetroMarquee() {
  const phrase = "All Gas · No Brakes";
  return (
    <section className="relative overflow-hidden bg-retro-cream py-16 text-retro-red">
      <div className="relative flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {/* duplicated track for a seamless -50% loop */}
        {[0, 1].map((track) => (
          <div key={track} className="flex items-center" aria-hidden={track === 1}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="retro-head px-8 text-[clamp(4rem,18vw,16rem)] leading-none">{phrase}</span>
                <Ring />
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* swimmer woven over the marquee */}
      <div className="pointer-events-none absolute bottom-2 left-[6%] w-[min(38vw,360px)] text-retro-red/80">
        <SwimmerArt className="h-auto w-full" />
      </div>
    </section>
  );
}

function Ring() {
  return (
    <span className="mx-6 inline-grid h-[7vw] w-[7vw] min-h-10 min-w-10 place-items-center rounded-full border-[0.5vw] border-retro-red">
      <span className="h-[1.4vw] w-[1.4vw] min-h-2 min-w-2 rounded-full bg-retro-red" />
    </span>
  );
}
