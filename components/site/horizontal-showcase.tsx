"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BEERS } from "@/components/site/data";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/**
 * GSAP ScrollTrigger horizontal scroll section: the section pins to the
 * viewport and the panel track is dragged sideways as you scroll vertically.
 */
export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (NOANIM) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      intro: true as const,
      name: "The Range",
      style: "Four flagship super strong beers — slide through the family.",
      color: "#c79a3e",
    },
    ...BEERS.slice(0, 4),
  ];

  return (
    <section
      ref={sectionRef}
      id="lineup"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#18301a,#21401f)" }}
    >
      <span className="absolute inset-x-0 top-0 z-20 h-1.5 bg-gold-gradient" />
      <div
        ref={trackRef}
        className={`flex h-screen ${NOANIM ? "overflow-x-auto" : ""}`}
        style={{ width: NOANIM ? "100%" : "max-content" }}
      >
        {panels.map((panel, i) =>
          "intro" in panel ? (
            <div key="intro" className="flex h-screen w-screen shrink-0 items-center px-[8vw]">
              <div className="max-w-[520px]">
                <span className="mb-5 inline-block rounded-full border-[1.5px] border-gold-light/60 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.22em] text-gold-light">
                  Scroll sideways
                </span>
                <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[0.95] text-paper">
                  One family.
                  <br />
                  <em className="text-gold-gradient italic">Four characters.</em>
                </h2>
                <p className="mt-5 max-w-[40ch] text-[1.12rem] text-paper/65">{panel.style}</p>
              </div>
            </div>
          ) : (
            <div key={panel.name} className="flex h-screen w-screen shrink-0 items-center justify-center gap-[5vw] px-[8vw]">
              <div className="relative grid shrink-0 place-items-center [perspective:1000px]">
                <div
                  className="absolute h-[360px] w-[360px] rounded-full"
                  style={{ background: `radial-gradient(circle, ${panel.color}55, transparent 65%)` }}
                />
                <Image
                  src={panel.image}
                  alt={panel.name}
                  width={334}
                  height={1150}
                  className="relative h-[min(70vh,560px)] w-auto drop-shadow-[0_30px_44px_rgba(0,0,0,.5)]"
                />
              </div>
              <div className="max-w-[420px]">
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-paper"
                  style={{ background: panel.color }}
                >
                  {panel.abv}
                </span>
                <h3 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-black leading-tight text-paper">
                  {panel.name}
                </h3>
                <p className="mt-3 text-[1.05rem] text-paper/65">{panel.style}</p>
                <p className="mt-4 text-[1.05rem] italic text-gold-light">{`“${panel.tag}”`}</p>
                <span className="mt-6 block text-[0.78rem] font-bold uppercase tracking-[0.3em] text-paper/35">
                  {String(i).padStart(2, "0")} / {String(panels.length - 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
