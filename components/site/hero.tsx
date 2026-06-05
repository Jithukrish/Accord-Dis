"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedText } from "@/components/ui/animated-text";
import { SplineScene } from "@/components/ui/splite";

/* Spline 3D is fully wired. Flip this to true (and drop in an on-brand scene URL
   from spline.design) to render an interactive 3D scene behind the hero. */
const ENABLE_SPLINE = false;
const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";
const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/* Where the crown cap ends, as a % of the bottle image height from the top.
   The base image is clipped below this line and the cap copy above it, so the
   cap can lift independently on hover. Nudge this if the split looks off. */
const CAP_SPLIT = 3.4;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // pointer-driven 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), spring);

  // scroll-linked parallax — drives off how far the hero has scrolled away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollSpring = { stiffness: 120, damping: 30, mass: 0.3 };
  const e = (to: number) => (NOANIM ? 0 : to); // collapse to no-op when animations are disabled
  const bottleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, e(-150)]), scrollSpring);
  const bottleScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, NOANIM ? 1 : 0.82]), scrollSpring);
  const glowScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, NOANIM ? 1 : 1.45]), scrollSpring);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, e(90)]), scrollSpring);
  const textOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, NOANIM ? 1 : 0]), scrollSpring);
  // cap pops straight up off the bottle as the hero scrolls — fully lifted by ~45% scroll
  const capLift = useSpring(useTransform(scrollYProgress, [0, 0.45], [0, NOANIM ? 0 : -72]), scrollSpring);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] ${
        process.env.NEXT_PUBLIC_NOANIM === "1" ? "min-h-[720px]" : "min-h-[90vh]"
      }`}
    >
      <Spotlight size={460} />

      {ENABLE_SPLINE && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
          <SplineScene scene={SPLINE_SCENE} className="h-full w-full" />
        </div>
      )}

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
        <div className="mb-5 text-[1.02rem] font-bold text-bottle">
          <span className="font-display text-[1.15em] font-black italic text-crimson">Super Strong Beer</span> · Brewed
          since 2013
        </div>

        <h1 className="font-display text-[clamp(3rem,8vw,6.6rem)] font-black leading-[0.9] tracking-[-0.035em]">
          <AnimatedText as="span" trigger="mount" text="Brewed Bold." className="block" />
          <AnimatedText as="span" trigger="mount" text="Built Strong." delay={0.5} gradient className="block italic" />
        </h1>

        <p className="mt-6 max-w-[46ch] text-[1.18rem] text-ink/60">
          The pride of <strong className="text-ink">Accord Distillers &amp; Brewers</strong>. Four flagship super strong
          beers — crafted with finest grade barley and imported hops, for those who like it <em>high octane</em>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <Magnetic>
            <a
              href="#beers"
              className="inline-block rounded-full bg-crimson px-7 py-3.5 font-bold text-paper shadow-[0_14px_28px_-14px_rgba(166,13,56,.85)] transition-colors hover:bg-crimson-dark"
            >
              Explore our beers
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#story"
              className="inline-block rounded-full border-2 border-ink px-7 py-3.5 font-bold transition-colors hover:bg-ink hover:text-paper"
            >
              Our story
            </a>
          </Magnetic>
        </div>

        <ul className="mt-11 flex flex-wrap gap-9">
          <Stat value={4} label="flagship brews" />
          <Stat value={8} suffix="%" label="up to ABV" />
          <Stat staticValue="1M+" label="cases / month" />
        </ul>
      </motion.div>

      {/* 3D tilt bottle — also drifts & shrinks as the hero scrolls away */}
      <motion.div
        style={{ y: bottleY, scale: bottleScale }}
        className="relative z-10 grid place-items-center [perspective:1000px]"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative grid place-items-center"
        >
          <motion.div
            className="absolute h-[380px] w-[380px] rounded-full"
            style={{
              scale: glowScale,
              background: "radial-gradient(circle, rgba(199,154,62,.4), transparent 65%)",
            }}
            transformTemplate={({ scale }) => `translateZ(-60px) scale(${scale})`}
          />
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(40px)" }}
            className="relative"
          >
            {/* Base bottle with the cap region clipped away (top CAP_SPLIT%). */}
            <Image
              src="/images/bottle-10000.png"
              alt="Accord 10000 super strong beer"
              width={334}
              height={1150}
              priority
              className="h-[min(78vh,640px)] w-auto drop-shadow-[0_36px_44px_rgba(33,64,31,.4)]"
              style={{ clipPath: `inset(${CAP_SPLIT}% 0 0 0)` }}
            />
            {/* Same image clipped to just the cap, layered on top — lifts straight up as the hero scrolls. */}
            <motion.div className="absolute left-0 top-0" style={{ y: capLift }}>
              <Image
                src="/images/bottle-10000.png"
                alt=""
                aria-hidden
                width={334}
                height={1150}
                className="h-[min(78vh,640px)] w-auto"
                style={{ clipPath: `inset(0 0 ${100 - CAP_SPLIT}% 0)` }}
              />
            </motion.div>
          </motion.div>
          <span
            className="absolute right-[4%] top-[6%] rotate-[8deg] rounded-full border-2 border-gold-light bg-crimson px-3.5 py-2.5 text-[0.78rem] font-bold uppercase tracking-wider text-paper shadow-[0_12px_24px_-12px_rgba(166,13,56,.9)]"
            style={{ transform: "translateZ(80px) rotate(8deg)" }}
          >
            High&nbsp;Octane
          </span>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

/** Animated "scroll" indicator pinned to the bottom of the hero. */
function ScrollCue() {
  return (
    <motion.a
      href="#features"
      aria-label="Scroll to explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink/55 md:flex"
    >
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.28em]">Scroll</span>
      <span className="grid h-9 w-5 justify-center rounded-full border-2 border-ink/30 pt-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-crimson"
          animate={NOANIM ? undefined : { y: [0, 9, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}

function Stat({
  value,
  suffix = "",
  staticValue,
  label,
}: {
  value?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(staticValue ?? "0");

  useEffect(() => {
    if (staticValue || value == null || !inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v) + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix, staticValue]);

  return (
    <li className="flex flex-col">
      <span ref={ref} className="font-display text-[2.2rem] font-black leading-none text-crimson">
        {display}
      </span>
      <span className="mt-1.5 text-[0.82rem] uppercase tracking-wider text-ink/60">{label}</span>
    </li>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
