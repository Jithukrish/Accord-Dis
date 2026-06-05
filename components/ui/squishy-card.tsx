"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Beer } from "@/components/site/data";

/** Squishy beer card with a morphing SVG blob (ported from SquishyCard). */
export function SquishyCard({ beer }: { beer: Beer }) {
  return (
    <motion.article
      whileHover="hover"
      transition={{ duration: 0.9, ease: "backInOut" }}
      variants={{ hover: { y: -8, scale: 1.03 } }}
      className="relative flex h-full flex-col overflow-hidden rounded-[18px] border border-ink/10 bg-gradient-to-b from-paper to-[#fff7e6]"
      style={{ ["--c" as string]: beer.color }}
    >
      <Blob color={beer.color} />

      <div
        className="relative z-10 grid place-items-center px-0 pb-3.5 pt-7"
        style={{
          background: `radial-gradient(80% 70% at 50% 30%, ${beer.color}22, transparent 70%)`,
        }}
      >
        <motion.div variants={{ hover: { scale: 1.06, y: -6 } }} transition={{ duration: 0.9, ease: "backInOut" }}>
          <Image
            src={beer.image}
            alt={beer.name}
            width={334}
            height={1150}
            className="h-[300px] w-auto drop-shadow-[0_18px_22px_rgba(33,64,31,.32)]"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex-1 border-t-[3px] px-5 pb-6 pt-5" style={{ borderColor: beer.color }}>
        <span
          className="mb-3 inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-paper"
          style={{ background: beer.color }}
        >
          {beer.abv}
        </span>
        <h3 className="font-display text-2xl font-black">{beer.name}</h3>
        <p className="mt-1 text-sm text-ink/60">{beer.style}</p>
        <p className="mt-3 text-[0.98rem] italic">{`“${beer.tag}”`}</p>
      </div>
    </motion.article>
  );
}

function Blob({ color }: { color: string }) {
  return (
    <motion.svg
      viewBox="0 0 320 384"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      style={{ color }}
      variants={{ hover: { scale: 1.45, opacity: 0.18 } }}
      initial={{ scale: 1, opacity: 0.1 }}
      transition={{ duration: 0.9, ease: "backInOut" }}
    >
      <motion.circle
        cx="160"
        cy="120"
        r="102"
        fill="currentColor"
        variants={{ hover: { scaleY: 0.55, y: -14 } }}
        transition={{ duration: 0.9, ease: "backInOut", delay: 0.1 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.ellipse
        cx="160"
        cy="270"
        rx="102"
        ry="44"
        fill="currentColor"
        variants={{ hover: { scaleY: 2.2, y: -8 } }}
        transition={{ duration: 0.9, ease: "backInOut", delay: 0.1 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </motion.svg>
  );
}
