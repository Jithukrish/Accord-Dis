"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

function ElegantShape({
  className,
  delay = 0,
  parallax,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "rgba(199,154,62,0.16)",
}: {
  className?: string;
  delay?: number;
  parallax?: MotionValue<number>;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div style={{ y: parallax }} className={cn("absolute", className)}>
      <motion.div
        initial={{ opacity: 0, y: -130, rotate: rotate - 15 }}
        animate={{ opacity: 1, y: 0, rotate }}
        transition={{ duration: 2.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      >
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          style={{ width, height }}
        >
          <div
            className="h-full w-full rounded-full border border-gold/20"
            style={{
              background: `linear-gradient(120deg, ${gradient}, transparent 78%)`,
              boxShadow: "0 8px 40px rgba(199,154,62,0.10)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Bubbles() {
  const bubbles = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 overflow-hidden">
      {bubbles.map((_, i) => {
        const size = 6 + Math.floor(Math.pow(i % 7, 1.4)) + (i % 5) * 3;
        return (
          <span
            key={i}
            className="absolute -bottom-10 rounded-full border border-gold-dark/20 animate-rise"
            style={{
              width: size,
              height: size,
              left: `${(i / 24) * 100 + (i % 3) * 2}%`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(199,154,62,.22))",
              animationDuration: `${9 + (i % 6) * 2.5}s`,
              animationDelay: `${-(i * 0.9)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Background() {
  // Whole-page scroll drives the floating shapes at different depths, so the
  // fixed backdrop gains a sense of parallax as the page moves past it.
  const { scrollYProgress } = useScroll();
  const spring = { stiffness: 60, damping: 24, mass: 0.4 };
  const depth = (d: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(useTransform(scrollYProgress, [0, 1], [0, NOANIM ? 0 : d]), spring);
  const slow = depth(-90);
  const mid = depth(140);
  const fast = depth(-220);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {/* colour wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 82% -5%, rgba(199,154,62,.22), transparent 60%)," +
            "radial-gradient(50% 45% at 0% 25%, rgba(225,17,73,.08), transparent 60%)," +
            "radial-gradient(70% 60% at 50% 112%, rgba(63,107,63,.16), transparent 60%), #F6EFDD",
        }}
      />
      <div className="stripes absolute inset-0 opacity-10" />
      {/* floating elegant shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape parallax={slow} className="left-[-4%] top-[16%]" width={460} height={120} rotate={12} delay={0.2} gradient="rgba(225,17,73,.10)" />
        <ElegantShape parallax={fast} className="right-[-3%] top-[64%]" width={420} height={110} rotate={-14} delay={0.45} gradient="rgba(199,154,62,.16)" />
        <ElegantShape parallax={mid} className="left-[8%] bottom-[6%]" width={260} height={76} rotate={-8} delay={0.35} gradient="rgba(63,107,63,.14)" />
        <ElegantShape parallax={mid} className="right-[18%] top-[8%]" width={200} height={60} rotate={20} delay={0.55} gradient="rgba(199,154,62,.14)" />
        <ElegantShape parallax={fast} className="left-[24%] top-[4%]" width={150} height={46} rotate={-22} delay={0.65} gradient="rgba(225,17,73,.10)" />
      </div>
      <Bubbles />
      <div className="grain absolute inset-0 opacity-45 mix-blend-multiply" />
    </div>
  );
}
