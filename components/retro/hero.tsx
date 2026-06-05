"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bubbles } from "@/components/retro/bubbles";
import { LoungerArt } from "@/components/retro/illustrations";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/* Beer bottles drifting in the hero background, behind the content. */
const BG_BOTTLES = [
  { src: "/images/bottle-holandas.png", className: "left-[-3%] top-[12%] h-[46vh] -rotate-[18deg]", delay: 0 },
  { src: "/images/bottle-10000.png", className: "right-[-4%] bottom-[-10%] h-[56vh] rotate-[20deg]", delay: 1.4 },
  { src: "/images/bottle-chennai.png", className: "left-[6%] bottom-[-12%] h-[40vh] rotate-[12deg]", delay: 2.6 },
  { src: "/images/bottle-royal-accord.png", className: "right-[9%] top-[6%] h-[36vh] -rotate-[14deg]", delay: 0.8 },
];

function BackgroundBottles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {BG_BOTTLES.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.className} opacity-[0.55] drop-shadow-[0_24px_40px_rgba(0,0,0,.4)]`}
          animate={NOANIM ? undefined : { y: [0, -22, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 9 + i * 1.3, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={b.src}
            alt=""
            width={334}
            height={1150}
            className="h-full w-auto"
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Section 1 — full viewport, solid retro red. A large cream line-art lounger
 * with a foam spray, drifting bubbles at the edges, and an oversized condensed
 * wordmark that fades/rises in.
 */
export function RetroHero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-retro-red px-6 py-24 text-retro-cream">
      <BackgroundBottles />
      <Bubbles tone="cream" count={16} seed={2} />

      {/* small kicker */}
      <motion.p
        className="z-10 mb-2 text-[0.8rem] font-bold uppercase tracking-[0.4em] text-retro-cream/80"
        initial={NOANIM ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Super Strong Beer · Est. 2013
      </motion.p>

      {/* oversized wordmark with hand-set connector */}
      <motion.h1
        className="retro-head z-10 text-center text-retro-cream text-[clamp(4rem,18vw,16rem)]"
        initial={NOANIM ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Accord
      </motion.h1>

      {/* central line-art illustration draws in */}
      <motion.div
        className="z-10 mt-2 w-[min(78vw,560px)] text-retro-cream"
        initial={NOANIM ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <LoungerArt className="h-auto w-full" />
      </motion.div>

      <motion.p
        className="z-10 mt-4 max-w-[44ch] text-center text-[1.05rem] text-retro-cream/85"
        initial={NOANIM ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Long evenings, loud tables, good company and something strong to toast with.
        The pride of <strong className="text-retro-cream">Accord</strong>.
      </motion.p>

      {/* scroll cue */}
      <motion.a
        href="#story"
        aria-label="Scroll to explore"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-retro-cream/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="grid h-9 w-5 justify-center rounded-full border-2 border-retro-cream/45 pt-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-retro-cream"
            animate={NOANIM ? undefined : { y: [0, 9, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
