"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NOAGE === "1") return; // screenshot/preview bypass
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
          className="fixed inset-0 z-[1000] grid place-items-center bg-bottle-dark/55 p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ y: 20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-[440px] rounded-[22px] border border-gold/50 bg-paper p-9 text-center shadow-[0_40px_80px_-30px_rgba(33,64,31,.7)]"
          >
            <Image src="/images/accord-logo.png" alt="Accord" width={92} height={92} className="mx-auto mb-4 rounded-full" />
            <h2 className="font-display text-[1.7rem] font-black leading-tight">Are you of legal drinking age?</h2>
            <p className="mt-3 text-ink/60">
              This site contains information about alcoholic beverages and is intended for adults of legal drinking age
              only.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={pass}
                className="rounded-full bg-crimson px-6 py-3.5 font-bold text-paper transition-colors hover:bg-crimson-dark"
              >
                Yes, I am
              </button>
              <button
                onClick={() => setDenied(true)}
                className="rounded-full border-2 border-ink px-6 py-3.5 font-bold transition-colors hover:bg-ink hover:text-paper"
              >
                No
              </button>
            </div>
            {denied && (
              <p className="mt-4 font-semibold text-crimson-dark">
                Sorry — you must be of legal drinking age to enter. Please drink responsibly.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
