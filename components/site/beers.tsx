"use client";

import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { SquishyCard } from "@/components/ui/squishy-card";
import { BEERS } from "@/components/site/data";

const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];
const countWord = (n: number) => COUNT_WORDS[n] ?? String(n);

export function Beers() {
  return (
    <section id="beers" className="mx-auto max-w-[1180px] px-6 py-24">
      <Reveal className="mb-14">
        <span className="mb-5 inline-block rounded-full border-[1.5px] border-crimson px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-crimson">
          Our Beers
        </span>
        <h2 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] font-black leading-tight">
          Pick your <em className="italic text-crimson">strong</em>
        </h2>
        <p className="mt-4 italic text-ink/60">
          {countWord(BEERS.length)} super strong beers, each with its own attitude.
        </p>
      </Reveal>

      <Reveal>
        <Carousel ariaLabel="Our beers">
          {BEERS.map((beer) => (
            <div
              key={beer.name}
              data-carousel-item
              className="shrink-0 snap-start w-[82%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
            >
              <SquishyCard beer={beer} />
            </div>
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
