"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bubbles } from "@/components/retro/bubbles";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/**
 * Section 4 — bottle showcase on red. A large beer bottle tilted ~30°, floating
 * centre-left, rotating with scroll progress. Behind it, a giant cropped cream
 * headline bleeds off-screen; dozens of bubbles rise around the bottle.
 */
export function RetroBottleShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // scroll-linked bottle rotation (the "3D model slowly rotating") + float
  const rotate = useTransform(sp, [0, 1], [NOANIM ? 32 : 52, NOANIM ? 32 : 12]);
  const y = useTransform(sp, [0, 1], [NOANIM ? 0 : 60, NOANIM ? 0 : -60]);
  const bgTextX = useTransform(sp, [0, 1], [NOANIM ? 0 : -60, NOANIM ? 0 : 60]);

  return (
    <section
      id="beers"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-retro-red py-24 text-retro-cream"
    >
      <Bubbles tone="cream" count={26} seed={5} />

      {/* giant cropped headline bleeding off-screen behind the bottle */}
      <motion.span
        style={{ x: bgTextX }}
        aria-hidden
        className="retro-head pointer-events-none absolute left-[-4vw] top-1/2 z-0 -translate-y-1/2 whitespace-nowrap text-retro-red-dark/55 text-[26vw]"
      >
        High Octane
      </motion.span>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* the bottle */}
        <div className="grid place-items-center [perspective:1200px]">
          <motion.div style={{ rotate, y }} className="relative">
            <div className="absolute inset-0 -z-10 m-auto h-[60%] w-[60%] rounded-full bg-retro-cream/10 blur-3xl" />
            <Image
              src="/images/bottle-10000.png"
              alt="Accord 10000 super strong beer"
              width={334}
              height={1150}
              className="h-[min(76vh,640px)] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,.45)]"
            />
          </motion.div>
        </div>

        {/* copy */}
        <div className="relative z-10">
          <span className="mb-5 inline-block rounded-full border-[1.5px] border-retro-cream/70 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.24em]">
            8% ABV · Swing-top Strong
          </span>
          <h2 className="retro-head text-retro-cream text-[clamp(2.6rem,7vw,5.5rem)]">
            Strength
            <span className="retro-connector">in</span>
            every
            <br />
            single pour.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[1.1rem] text-retro-cream/80">
            A bold, full-bodied super strong character — finest grade barley and imported
            hops, brewed for those who like it high octane.
          </p>
          <a
            href="#range"
            className="mt-8 inline-block rounded-full bg-retro-cream px-7 py-3 text-[0.78rem] font-bold uppercase tracking-[0.24em] text-retro-red transition-transform hover:scale-105"
          >
            See the range
          </a>
        </div>
      </div>
    </section>
  );
}
