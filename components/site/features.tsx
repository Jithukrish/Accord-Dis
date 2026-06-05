"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { FEATURES } from "@/components/site/data";
import { cn } from "@/lib/utils";

export function Features() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % FEATURES.length), 3000);
    return () => clearInterval(t);
  }, [paused]);

  const active = FEATURES[step];

  return (
    <section id="features" className="mx-auto max-w-[1180px] px-6 py-24">
      <Reveal>
        <span className="mb-5 inline-block rounded-full border-[1.5px] border-crimson px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-crimson">
          Why Accord
        </span>
        <h2 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] font-black leading-tight">
          Strength you can <em className="italic text-crimson">taste</em>
        </h2>
      </Reveal>

      <div
        className="mt-14 grid items-stretch gap-6 md:grid-cols-[0.9fr_1.1fr]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* animated spotlight panel */}
        <div className="relative min-h-[260px] overflow-hidden rounded-[20px] bg-bottle p-9 text-paper">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-6xl font-black italic text-gold-light">{active.num}</span>
              <h3 className="mt-5 font-display text-3xl font-semibold">{active.title}</h3>
              <p className="mt-3 max-w-[40ch] text-paper/85">{active.text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2.5">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                aria-label={`Feature ${i + 1}`}
                onClick={() => setStep(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === step ? "w-7 bg-gold-light" : "w-2.5 bg-paper/40"
                )}
              />
            ))}
          </div>
        </div>

        {/* the four pillars */}
        <div className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-ink/10">
          {FEATURES.map((f, i) => (
            <button
              key={f.num}
              onMouseEnter={() => setStep(i)}
              onClick={() => setStep(i)}
              className={cn(
                "border-b border-r border-ink/10 p-6 text-left transition-colors duration-300",
                i === step ? "bg-crimson text-paper" : "bg-paper hover:bg-ivory"
              )}
            >
              <span
                className={cn(
                  "font-display text-2xl font-black italic",
                  i === step ? "text-gold-light" : "text-gold-gradient"
                )}
              >
                {f.num}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{f.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
