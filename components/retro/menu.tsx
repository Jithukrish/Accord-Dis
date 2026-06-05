"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RETRO_NAV } from "@/components/retro/retro-data";

/**
 * Floating cream pill hamburger (top-right) that opens a full-screen cream
 * overlay with huge red links revealed in a stagger. No traditional navbar.
 */
export function RetroMenu() {
  const [open, setOpen] = useState(false);

  // lock body scroll while the overlay is open
  useEffect(() => {
    if (open) document.body.classList.add("is-locked");
    else document.body.classList.remove("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-5 top-5 z-[120] grid h-14 w-14 place-items-center rounded-[18px] bg-retro-cream text-retro-red shadow-[0_10px_24px_-10px_rgba(0,0,0,.5)] transition-transform hover:scale-105 active:scale-95 md:right-8 md:top-7"
      >
        <span className="relative block h-4 w-7">
          <motion.span
            className="absolute left-0 top-0 h-[3px] w-7 rounded-full bg-current"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute left-0 top-[7px] h-[3px] w-7 rounded-full bg-current"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute left-0 top-[14px] h-[3px] w-7 rounded-full bg-current"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-retro-cream px-8 md:px-20"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {RETRO_NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="retro-head w-fit text-retro-red text-[clamp(2.6rem,11vw,7rem)] leading-[0.95] transition-transform hover:translate-x-3"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-retro-red/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>Accord Distillers &amp; Brewers</span>
              <span>Est. 2013 · India</span>
              <span>Please drink responsibly</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
