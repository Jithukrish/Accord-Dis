"use client";

import { useRef } from "react";
import { Reveal, Stagger, staggerItem } from "@/components/ui/reveal";
import { AnimatedText } from "@/components/ui/animated-text";
import { motion, useScroll, useSpring } from "framer-motion";
import { TIMELINE } from "@/components/site/data";

export function Story() {
  // Draw a gold progress line across the timeline as it scrolls through view.
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <section id="story" className="mx-auto max-w-[1180px] px-6 py-24">
      <div className="mb-15 max-w-[760px]">
        <Reveal>
          <span className="mb-5 inline-block rounded-full border-[1.5px] border-crimson px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-crimson">
            Our Story
          </span>
        </Reveal>
        <AnimatedText
          as="h2"
          text="From a single brewery to a nationwide name"
          stagger={0.018}
          className="font-display text-[clamp(2.1rem,5vw,3.6rem)] font-black leading-tight"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 text-[1.16rem] text-ink/60">
            Accord Distillers &amp; Brewers Pvt. Ltd. — part of the{" "}
            <strong className="text-crimson-dark">Accord Group</strong> — entered the world of brewing with a simple
            ambition: to make bold, honest, super strong beer. From the first cases in 2013 to over a million cases a
            month today, the spirit hasn&apos;t changed — <em className="text-ink">quality, strength and pride in every
            bottle.</em>
          </p>
        </Reveal>
      </div>

      <div ref={timelineRef}>
        {/* scroll-driven progress rail */}
        <div className="mb-5 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div style={{ scaleX }} className="h-full origin-left rounded-full bg-gold-gradient" />
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-4">
          {TIMELINE.map((t) => (
            <motion.div key={t.year} variants={staggerItem} className="bg-paper p-7">
              <span className="block font-display text-[1.9rem] font-black italic text-gold-gradient">{t.year}</span>
              <p className="mt-2.5 text-sm text-ink/60">{t.text}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
