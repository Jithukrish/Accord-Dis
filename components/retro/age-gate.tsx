"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bubbles } from "@/components/retro/bubbles";

/** Retro-styled legal-drinking-age gate. */
export function RetroAgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NOAGE === "1") return;
    let ok = false;
    try {
      ok = sessionStorage.getItem("accord_age_ok") === "1";
    } catch {}
    if (!ok) {
      setShow(true);
      document.body.classList.add("is-locked");
    }
  }, []);

  const pass = () => {
    try {
      sessionStorage.setItem("accord_age_ok", "1");
    } catch {}
    document.body.classList.remove("is-locked");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1000] grid place-items-center overflow-hidden bg-retro-red p-6 text-retro-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <Bubbles tone="cream" count={14} seed={1} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="relative z-10 w-full max-w-[480px] text-center"
          >
            <h1 className="retro-head text-retro-cream text-[clamp(2.4rem,9vw,4.5rem)]">
              Are you of
              <br />
              legal
              <span className="retro-connector">drinking</span>
              age?
            </h1>
            <p className="mx-auto mt-4 max-w-[42ch] text-retro-cream/85">
              This site contains information about alcoholic beverages and is intended for
              adults of legal drinking age only.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={pass}
                className="rounded-full bg-retro-cream px-7 py-3 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-retro-red transition-transform hover:scale-105"
              >
                Yes, I am
              </button>
              <button
                onClick={() => setDenied(true)}
                className="rounded-full border-2 border-retro-cream px-7 py-3 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-retro-cream transition-colors hover:bg-retro-cream hover:text-retro-red"
              >
                No
              </button>
            </div>
            {denied && (
              <p className="mt-4 font-semibold text-retro-cream">
                Sorry — you must be of legal drinking age to enter. Please drink responsibly.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
