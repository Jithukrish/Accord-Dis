"use client";

import { motion } from "framer-motion";

/**
 * Original single-colour monoline retro illustrations (drawn in `currentColor`).
 * Each draws itself in when scrolled into view (pathLength), respecting NOANIM /
 * reduced motion. These are stylised originals — not copied from any brand.
 */

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function draw(i: number) {
  if (NOANIM) return {};
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1.4, delay: i * 0.12, ease: "easeInOut" as const },
  };
}

/* ── Hero: a relaxed lounger in sunglasses, arms behind the head, a playful
   spray of foam from the lips, an inflatable serpent float curling around. ── */
export function LoungerArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden>
      <g {...stroke} strokeWidth={5}>
        {/* serpent float — a fat wavy tube curling around the figure */}
        <motion.path
          d="M70 360 C 30 320 40 250 110 250 C 200 250 200 330 290 330 C 380 330 420 260 470 300 C 510 332 488 392 430 392"
          strokeWidth={26}
          opacity={0.55}
          {...draw(0)}
        />
        {/* serpent head + eye */}
        <motion.path d="M430 392 c 22 0 40 -16 40 -36" strokeWidth={26} opacity={0.55} {...draw(1)} />
        <motion.circle cx="452" cy="356" r="3.5" fill="currentColor" stroke="none" {...draw(6)} />

        {/* reclined body / torso */}
        <motion.path d="M150 300 C 200 250 250 235 320 245" {...draw(2)} />
        {/* head */}
        <motion.circle cx="345" cy="205" r="46" {...draw(2)} />
        {/* hair sweep */}
        <motion.path d="M305 178 C 320 150 372 150 388 180" {...draw(3)} />
        {/* sunglasses */}
        <motion.path d="M322 198 h 20 M362 198 h 14" {...draw(3)} />
        <motion.circle cx="334" cy="205" r="12" {...draw(3)} />
        <motion.circle cx="364" cy="205" r="12" {...draw(3)} />
        <motion.path d="M346 205 h 6" {...draw(3)} />
        {/* smiling mouth */}
        <motion.path d="M352 232 c 8 6 18 4 24 -2" {...draw(4)} />

        {/* arms folded behind the head */}
        <motion.path d="M300 200 C 250 175 245 130 300 140" {...draw(4)} />
        <motion.path d="M392 200 C 440 175 446 132 392 142" {...draw(4)} />

        {/* foam / fizz spray from the lips */}
        <motion.path d="M380 224 c 28 -6 52 -22 72 -44" {...draw(5)} />
        <motion.circle cx="466" cy="170" r="6" {...draw(5)} />
        <motion.circle cx="486" cy="150" r="4" {...draw(5)} />
        <motion.circle cx="448" cy="150" r="4" {...draw(5)} />
        <motion.circle cx="476" cy="186" r="3" {...draw(5)} />
      </g>
    </svg>
  );
}

/* ── Marquee: a vintage swimmer kicking through with the serpent float. ── */
export function SwimmerArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 460 300" className={className} aria-hidden>
      <g {...stroke} strokeWidth={5}>
        {/* serpent ring around the waist */}
        <motion.ellipse cx="210" cy="170" rx="92" ry="46" strokeWidth={22} opacity={0.5} {...draw(0)} />
        {/* serpent head */}
        <motion.path d="M300 150 c 22 -6 40 6 40 26" strokeWidth={22} opacity={0.5} {...draw(1)} />
        <motion.circle cx="324" cy="150" r="3.5" fill="currentColor" stroke="none" {...draw(5)} />
        {/* body reaching forward */}
        <motion.path d="M150 175 C 110 165 80 150 50 130" {...draw(2)} />
        {/* head + cap */}
        <motion.circle cx="40" cy="118" r="22" {...draw(2)} />
        <motion.path d="M22 108 c 6 -16 32 -16 38 0" {...draw(3)} />
        {/* trailing arm stroke */}
        <motion.path d="M165 178 C 150 150 160 124 188 116" {...draw(3)} />
        {/* kicking legs + splash */}
        <motion.path d="M270 188 C 320 200 348 232 356 262" {...draw(4)} />
        <motion.path d="M286 184 C 332 188 366 206 388 234" {...draw(4)} />
        <motion.path d="M360 250 l 16 -10 M388 232 l 18 -4 M372 270 l 18 4" {...draw(5)} />
      </g>
    </svg>
  );
}

/* ── Story: the inflatable serpent float, on its own, curling. ── */
export function SerpentFloat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} aria-hidden>
      <g {...stroke} strokeWidth={28} opacity={0.9}>
        <motion.path
          d="M40 230 C 10 180 60 120 130 140 C 210 162 190 250 270 250 C 350 250 350 150 420 170 C 470 184 472 250 430 270"
          {...draw(0)}
        />
        <motion.path d="M430 270 c -26 12 -58 0 -58 -30" {...draw(1)} />
      </g>
      <g {...stroke} strokeWidth={5}>
        <motion.circle cx="392" cy="232" r="4" fill="currentColor" stroke="none" {...draw(2)} />
        {/* little forked tongue */}
        <motion.path d="M44 244 c -14 6 -22 2 -28 -6 M44 244 c -14 -2 -22 -8 -24 -18" {...draw(2)} />
      </g>
    </svg>
  );
}
