"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

/**
 * Scroll-linked parallax. As the element travels through the viewport its
 * content is translated on the Y axis, driven continuously by scroll position
 * (not a one-shot reveal). Positive `speed` drifts up on scroll; negative drifts
 * down. The motion is spring-smoothed so it never feels jumpy.
 */
export function Parallax({
  children,
  className,
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = NOANIM ? [0, 0] : [speed * 120, -speed * 120];
  const y = useSpring(useTransform(scrollYProgress, [0, 1], range), {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
