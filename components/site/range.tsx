"use client";

import { Reveal } from "@/components/ui/reveal";
import { InteractiveSelector } from "@/components/ui/interactive-selector";

export function Range() {
  return (
    <section
      id="range"
      className="relative my-8 overflow-hidden py-24"
      style={{
        background:
          "radial-gradient(120% 90% at 50% -10%, rgba(199,154,62,.18), transparent 60%), linear-gradient(180deg, #21401f, #18301a)",
      }}
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gold-gradient" />
      <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gold-gradient" />

      <Reveal className="mx-auto mb-14 max-w-[1180px] px-6 text-center">
        <span className="mb-5 inline-block rounded-full border-[1.5px] border-gold-light/60 px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-gold-light">
          The Range
        </span>
        <h2 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] font-black leading-tight text-paper">
          One family. <em className="text-gold-gradient italic">Four characters.</em>
        </h2>
      </Reveal>

      <div className="px-6">
        <InteractiveSelector />
      </div>
    </section>
  );
}
