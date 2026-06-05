"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** delay before the first letter, seconds */
  delay?: number;
  /** per-letter stagger, seconds */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  /** "view" animates when scrolled into view; "mount" animates immediately. */
  trigger?: "view" | "mount";
  /**
   * Clip the gold gradient onto each individual letter. Use this instead of a
   * `text-gold-gradient` class on the parent: because every letter is animated
   * in its own compositor layer, a parent-level `background-clip: text` fails to
   * paint onto them and letters render transparent.
   */
  gradient?: boolean;
}

/** Word-grouped, letter-by-letter reveal (ported from AnimatedText). */
export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as = "span",
  trigger = "view",
  gradient = false,
}: AnimatedTextProps) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: "0.5em", rotate: 6 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
  };

  const Tag = motion[as];
  const trig =
    process.env.NEXT_PUBLIC_NOANIM === "1" || trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: { once: true } };

  // group letters into words so a word never wraps mid-way; only spaces break
  const words = text.split(" ");
  let n = 0; // continuous letter index for an unbroken stagger across words

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      {...trig}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-pre">
          {Array.from(word).map((letter) => {
            const i = n++;
            return (
              <motion.span
                key={i}
                variants={child}
                className={cn(
                  "inline-block",
                  // padding lets the clipped gradient cover ascenders/descenders;
                  // the matching negative margin keeps line spacing tight
                  gradient && "text-gold-gradient py-[0.18em] -my-[0.18em]",
                )}
              >
                {letter}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="whitespace-pre"> </span>}
        </span>
      ))}
    </Tag>
  );
}
