"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BEERS } from "@/components/site/data";
import { cn } from "@/lib/utils";

/** Horizontal expanding panels (ported from InteractiveSelector). */
export function InteractiveSelector() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<number[]>([]);

  useEffect(() => {
    const timers = BEERS.map((_, i) =>
      setTimeout(() => setShown((p) => [...p, i]), 160 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto flex h-[470px] max-w-[1180px] gap-3 max-md:h-auto max-md:flex-col">
      {BEERS.map((beer, i) => {
        const isActive = active === i;
        return (
          <button
            key={beer.name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={beer.name}
            className={cn(
              "group relative min-w-0 overflow-hidden rounded-[18px] border-0 p-0 text-left transition-all duration-700 ease-[cubic-bezier(.16,.84,.44,1)]",
              // mobile: every panel is a full, comfortably-tall card (the
              // hover-to-expand metaphor doesn't apply to touch).
              "max-md:h-[260px] max-md:w-full max-md:flex-none",
              isActive
                ? "flex-[4.4] shadow-[0_30px_60px_-28px_rgba(0,0,0,.75)] ring-1 ring-gold-light/55"
                : "flex-1 ring-1 ring-white/10 max-md:ring-white/15"
            )}
            style={{
              backgroundImage: `linear-gradient(180deg, ${mix(beer.color, "#0c1a0e", 0.8)}, ${mix(
                beer.color,
                "#16301a",
                0.32
              )})`,
              opacity: shown.includes(i) ? 1 : 0,
              transform: shown.includes(i) ? "translateX(0)" : "translateX(-50px)",
              transitionProperty: "flex, opacity, transform, box-shadow",
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              {/* spotlight halo — keeps the bottle readable even when its colour
                  matches the panel (e.g. the green Chennai King on green). */}
              <span
                aria-hidden
                className="absolute h-[80%] w-[72%] rounded-full blur-2xl transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(255,250,240,.34), rgba(255,250,240,.12) 45%, transparent 70%)",
                  opacity: isActive ? 1 : 0.6,
                }}
              />
              <Image
                src={beer.image}
                alt={beer.name}
                width={334}
                height={1150}
                className={cn(
                  "relative h-[84%] w-auto drop-shadow-[0_22px_30px_rgba(0,0,0,.6)] transition-transform duration-700",
                  // keep bottles full-size on mobile, where panels don't expand
                  "max-md:!scale-100",
                  isActive ? "scale-100" : "scale-[.74]"
                )}
              />
            </span>
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/65 to-transparent p-5 text-paper transition-all duration-500",
                // desktop: reveal only on the active panel; mobile: always shown
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                "max-md:opacity-100 max-md:translate-y-0"
              )}
            >
              <span className="font-display text-[1.7rem] font-black leading-none">{beer.name}</span>
              <span className="text-sm text-gold-light">{beer.abv}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** quick hex mix toward a target colour by ratio (0..1 of base). */
function mix(base: string, target: string, ratio: number) {
  const b = hex(base);
  const t = hex(target);
  const r = Math.round(b[0] * ratio + t[0] * (1 - ratio));
  const g = Math.round(b[1] * ratio + t[1] * (1 - ratio));
  const bl = Math.round(b[2] * ratio + t[2] * (1 - ratio));
  return `rgb(${r},${g},${bl})`;
}
function hex(h: string): [number, number, number] {
  const c = h.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}
