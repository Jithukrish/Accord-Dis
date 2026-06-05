"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bubbles } from "@/components/retro/bubbles";
import { SerpentFloat } from "@/components/retro/illustrations";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/**
 * Section 3 — brand story on bright red. Left: a big cream condensed headline
 * with small underlined connector words and an outlined pill button. Right: a
 * tilted Instagram-story phone mock that parallaxes on scroll, with a large
 * cream serpent line-art behind it.
 */
export function RetroStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const phoneY = useTransform(sp, [0, 1], [NOANIM ? 0 : 70, NOANIM ? 0 : -70]);
  const phoneRot = useTransform(sp, [0, 1], [NOANIM ? 10 : 16, NOANIM ? 10 : 4]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-retro-red px-6 py-28 text-retro-cream md:py-36">
      <Bubbles tone="cream" count={10} seed={3} />

      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* headline + button */}
        <div>
          <h2 className="retro-head text-retro-cream text-[clamp(2.4rem,6.4vw,5rem)]">
            As you&rsquo;ll see
            <br />
            I&rsquo;m not very
            <span className="retro-connector">a</span>
            homebody.
            <br />
            I&rsquo;m more
            <span className="retro-connector">about</span>
            long
            <br />
            evenings
            <span className="retro-connector">on</span>
            terraces,
            <br />
            good company
            <span className="retro-connector">y</span>
            <br />
            something strong to toast with.
          </h2>

          <a
            href="#crew"
            className="mt-9 inline-block rounded-full border-2 border-retro-cream px-7 py-3 text-[0.78rem] font-bold uppercase tracking-[0.24em] text-retro-cream transition-colors hover:bg-retro-cream hover:text-retro-red"
          >
            My Crew · Mi Gente
          </a>
        </div>

        {/* phone mock + serpent */}
        <div className="relative grid place-items-center">
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-retro-cream/35">
            <SerpentFloat className="h-auto w-[120%] max-w-none" />
          </div>

          <motion.div
            style={{ y: phoneY, rotate: phoneRot }}
            className="relative z-10 w-[min(74vw,300px)] rounded-[34px] border-[6px] border-retro-cream bg-retro-cream p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,.6)]"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-retro-brick">
              {/* faux lifestyle "story" — a strong-beer toast scene */}
              <div className="absolute inset-0 bg-gradient-to-b from-retro-cola via-retro-red to-retro-brick" />
              <Bubbles tone="cream" count={8} seed={9} />
              <Image
                src="/images/bottle-royal-accord.png"
                alt="Accord Royal super strong beer"
                width={334}
                height={1150}
                className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2 drop-shadow-[0_18px_28px_rgba(0,0,0,.5)]"
              />
              {/* story chrome */}
              <div className="absolute left-3 right-3 top-3 h-1 rounded-full bg-retro-cream/40">
                <div className="h-full w-2/3 rounded-full bg-retro-cream" />
              </div>
              <div className="absolute left-3 top-6 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-retro-cream text-[0.6rem] font-black text-retro-red">
                  A
                </span>
                <span className="text-[0.7rem] font-bold text-retro-cream">accord.beer</span>
              </div>
              <p className="retro-head absolute bottom-4 left-3 right-3 text-retro-cream text-[1.5rem] leading-none">
                Something to toast with
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
