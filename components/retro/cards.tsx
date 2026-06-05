"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RETRO_BEERS } from "@/components/retro/retro-data";

/**
 * Section 5 — tall rounded product cards on a cream background, each a full
 * colour scene with its beer. Cards lift on hover; the row scrolls/drags
 * horizontally on small screens. A red outlined "SEE ALL" pill sits below.
 */
export function RetroCards() {
  return (
    <section id="range" className="relative bg-retro-cream px-6 py-24 text-retro-red md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col items-start gap-3">
          <span className="rounded-full border-[1.5px] border-retro-red/60 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.24em]">
            The Range
          </span>
          <h2 className="retro-head text-retro-red text-[clamp(2.4rem,6.5vw,5rem)]">
            Pick
            <span className="retro-connector">your</span>
            strong
          </h2>
        </div>

        {/* horizontal drag/scroll on mobile, even grid on desktop */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {RETRO_BEERS.map((beer, i) => (
            <motion.article
              key={beer.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-[26px] shadow-[0_24px_44px_-26px_rgba(0,0,0,.6)] sm:w-[60%] md:w-auto"
              style={{ background: beer.scene }}
            >
              {/* corner label */}
              <span
                className="retro-head absolute left-4 top-3 z-10 text-[1.3rem] leading-none"
                style={{ color: beer.label }}
              >
                {beer.name}
              </span>
              <span
                className="absolute right-4 top-4 z-10 text-[0.62rem] font-bold uppercase tracking-[0.18em] opacity-80"
                style={{ color: beer.label }}
              >
                {beer.kicker}
              </span>

              <Image
                src={beer.image}
                alt={`Accord ${beer.name} super strong beer`}
                width={334}
                height={1150}
                className="absolute bottom-0 left-1/2 h-[82%] w-auto -translate-x-1/2 drop-shadow-[0_18px_26px_rgba(0,0,0,.4)] transition-transform duration-500 group-hover:scale-105"
              />

              <span
                className="absolute bottom-4 left-4 right-4 z-10 text-[0.72rem] font-semibold leading-snug opacity-85"
                style={{ color: beer.label }}
              >
                {beer.style}
              </span>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-block rounded-full border-2 border-retro-red px-8 py-3 text-[0.78rem] font-bold uppercase tracking-[0.24em] text-retro-red transition-colors hover:bg-retro-red hover:text-retro-cream"
          >
            See all · Ver todas
          </a>
        </div>
      </div>
    </section>
  );
}
