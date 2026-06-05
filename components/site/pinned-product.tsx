"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";
/* % from the top of the bottle image where the crown cap ends (measured by colour). */
const CAP_SPLIT = 3.4;

/* Clips effect overlays (liquid fill, sheen) to the bottle's real silhouette
   using the PNG's own alpha, so they never show as a rectangular "cut". */
const BOTTLE_MASK = {
  WebkitMaskImage: "url(/images/bottle-10000.png)",
  maskImage: "url(/images/bottle-10000.png)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

const CHAPTERS = [
  {
    kicker: "Super Strong Beer",
    title: "Brewed bold since 2013",
    text: "The pride of Accord Distillers & Brewers — honest, full-strength beer from the very first case.",
  },
  {
    kicker: "Finest barley · imported hops",
    title: "Crafted, never compromised",
    text: "Finest grade barley and imported hops, brewed for those who like it high octane.",
  },
  {
    kicker: "Up to 8% ABV",
    title: "Strength in every sip",
    text: "A bold, full-bodied super strong character you can taste in every single bottle.",
  },
  {
    kicker: "1M+ cases a month",
    title: "A nationwide name",
    text: "From a single brewery to over a million cases a month — brewed and loved across India.",
  },
];

// deterministic so SSR and client match (no Math.random in render)
const BARLEY = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 12 + ((i * 7) % 10),
  delay: (i % 6) * 0.9,
  duration: 9 + (i % 5) * 1.6,
  drift: ((i % 5) - 2) * 26,
  rot: (i % 2 ? 1 : -1) * (20 + (i % 4) * 18),
}));

export function PinnedProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // ---- mouse follow ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltSpring = { stiffness: 150, damping: 18 };
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), tiltSpring);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), tiltSpring);
  const partX = useSpring(useTransform(mx, [-0.5, 0.5], [22, -22]), tiltSpring);
  const partY = useSpring(useTransform(my, [-0.5, 0.5], [16, -16]), tiltSpring);
  const smokeX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), tiltSpring);
  const sheenX = useSpring(useTransform(mx, [-0.5, 0.5], [-70, 70]), tiltSpring);

  // ---- scroll-driven 3D + cinematic camera ----
  const scrollRotate = useTransform(p, [0, 1], [-16, 16]); // 3D bottle rotation
  const rotateY = useTransform([scrollRotate, tiltY], ([a, b]) => (a as number) + (b as number));
  const sceneScale = useTransform(p, [0, 0.5, 1], [0.94, 1.06, 1.0]); // cinematic zoom
  const sceneY = useTransform(p, [0, 1], [40, -40]);
  const glowOpacity = useTransform(p, [0, 1], [0.03, 0.2]);
  const glowScale = useTransform(p, [0, 1], [0.75, 1.15]);
  const capLift = useTransform(p, [0.45, 0.78], [0, -88]); // cap pops on the "8% ABV" chapter

  // ---- liquid fill ----
  const fillTop = useTransform(p, [0.1, 0.85], [100, 14]);
  const fillClip = useMotionTemplate`inset(${fillTop}% 0 0 0)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (NOANIM) return <StaticFallback />;

  return (
    <section
      ref={ref}
      id="craft"
      className="relative h-[360vh]"
      style={{ background: "linear-gradient(180deg,#0f0a08 0%,#160d0a 55%,#0f0a08 100%)" }}
    >
      <span className="absolute inset-x-0 top-0 z-20 h-1.5 bg-gold-gradient" />

      <div onMouseMove={onMove} onMouseLeave={onLeave} className="sticky top-0 h-screen overflow-hidden">
        {/* brewery smoke */}
        <BrewerySmoke parallaxX={smokeX} />
        {/* floating barley particles */}
        <BarleyField x={partX} y={partY} />

        <motion.div
          style={{ scale: sceneScale, y: sceneY }}
          className="mx-auto grid h-full max-w-[1180px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2"
        >
          {/* narrative chapters */}
          <div className="relative z-10 min-h-[300px] md:min-h-[340px]">
            {CHAPTERS.map((c, i) => (
              <Chapter key={c.kicker} chapter={c} index={i} count={CHAPTERS.length} progress={p} />
            ))}
          </div>

          {/* pinned 3D bottle */}
          <div className="relative grid place-items-center [perspective:1200px]">
            <motion.div
              className="pointer-events-none absolute h-[440px] w-[440px] rounded-full"
              style={{
                opacity: glowOpacity,
                scale: glowScale,
                background: "radial-gradient(circle, rgba(199,154,62,.4), transparent 62%)",
              }}
            />
            <motion.div
              style={{ rotateX: tiltX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* base bottle with the cap clipped away */}
              <Image
                src="/images/bottle-10000.png"
                alt="Accord 10000 super strong beer"
                width={334}
                height={1150}
                className="h-[min(74vh,600px)] w-auto drop-shadow-[0_36px_50px_rgba(0,0,0,.5)]"
                style={{ clipPath: `inset(${CAP_SPLIT}% 0 0 0)` }}
              />

              {/* liquid fill — a warm glow that rises up the bottle, masked to the glass */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  clipPath: fillClip,
                  background: "linear-gradient(180deg, rgba(255,196,84,0), rgba(247,170,40,.5) 45%, rgba(214,120,20,.62))",
                  ...BOTTLE_MASK,
                }}
              />

              {/* glass reflection sheen — tracks the mouse, masked to the glass */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={BOTTLE_MASK}
              >
                <motion.div
                  className="absolute -inset-y-10 left-0 w-1/3 -skew-x-12"
                  style={{
                    x: sheenX,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)",
                  }}
                />
              </motion.div>

              {/* cap, lifts straight up as the story progresses */}
              <motion.div className="absolute left-0 top-0" style={{ y: capLift }}>
                <Image
                  src="/images/bottle-10000.png"
                  alt=""
                  aria-hidden
                  width={334}
                  height={1150}
                  className="h-[min(74vh,600px)] w-auto"
                  style={{ clipPath: `inset(0 0 ${100 - CAP_SPLIT}% 0)` }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- effect layers ---------- */

function BrewerySmoke({ parallaxX }: { parallaxX: MotionValue<number> }) {
  return (
    <motion.div style={{ x: parallaxX }} className="pointer-events-none absolute inset-0 z-0">
      {[
        { left: "8%", bottom: "-10%", size: 520, dur: 22, delay: 0 },
        { left: "55%", bottom: "-20%", size: 620, dur: 28, delay: 4 },
        { left: "30%", bottom: "5%", size: 420, dur: 25, delay: 8 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.left,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, rgba(130,100,64,.08), transparent 62%)",
            filter: "blur(44px)",
          }}
          animate={{ y: [0, -90, 0], opacity: [0.08, 0.16, 0.08], scale: [1, 1.15, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

function BarleyField({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div style={{ x, y }} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {BARLEY.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-8%]"
          style={{ left: `${b.left}%` }}
          animate={{ y: [0, -window_h(), 0], x: [0, b.drift, 0], rotate: [b.rot, -b.rot], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <BarleyGrain size={b.size} id={i} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// keyframe distance — a viewport-ish travel without reading window during SSR
function window_h() {
  return 900;
}

function BarleyGrain({ size, id }: { size: number; id: number }) {
  const gid = `barley-${id}`;
  return (
    <svg width={size} height={size * 2.1} viewBox="0 0 20 42" fill="none" className="drop-shadow-[0_0_6px_rgba(199,154,62,.4)]">
      <line x1="10" y1="0" x2="10" y2="13" stroke="rgba(216,177,95,.65)" strokeWidth="1.1" />
      <ellipse cx="10" cy="27" rx="6" ry="13" fill={`url(#${gid})`} />
      <line x1="10" y1="16" x2="10" y2="38" stroke="rgba(120,80,20,.45)" strokeWidth="1" />
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#eccd84" />
          <stop offset="1" stopColor="#b5862f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Chapter({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  const opacity = useTransform(
    progress,
    isFirst
      ? [end - 0.07, end]
      : isLast
        ? [start, start + 0.07]
        : [start, start + 0.07, end - 0.07, end],
    isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [44, -44]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2">
      <span className="mb-4 inline-block rounded-full border-[1.5px] border-gold-light/60 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.22em] text-gold-light">
        {chapter.kicker}
      </span>
      <h3 className="font-display text-[clamp(2rem,4.4vw,3.3rem)] font-black leading-tight text-paper">
        {chapter.title}
      </h3>
      <p className="mt-4 max-w-[42ch] text-[1.12rem] text-paper/65">{chapter.text}</p>
    </motion.div>
  );
}

/** Static, non-pinned fallback for screenshots / reduced-motion builds. */
function StaticFallback() {
  return (
    <section id="craft" className="relative" style={{ background: "linear-gradient(180deg,#1b130f,#27170f)" }}>
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gold-gradient" />
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div className="space-y-10">
          {CHAPTERS.map((c) => (
            <div key={c.kicker}>
              <span className="mb-3 inline-block rounded-full border-[1.5px] border-gold-light/60 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.22em] text-gold-light">
                {c.kicker}
              </span>
              <h3 className="font-display text-[2rem] font-black leading-tight text-paper">{c.title}</h3>
              <p className="mt-2 max-w-[42ch] text-paper/65">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="grid place-items-center">
          <Image
            src="/images/bottle-10000.png"
            alt="Accord 10000 super strong beer"
            width={334}
            height={1150}
            className="h-[600px] w-auto drop-shadow-[0_36px_50px_rgba(0,0,0,.5)]"
          />
        </div>
      </div>
    </section>
  );
}
