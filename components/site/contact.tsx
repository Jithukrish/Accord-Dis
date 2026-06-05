"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";

/** Fire this from anywhere (nav, footer, CTA) to open the contact form. */
export function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

export function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const firstField = React.useRef<HTMLInputElement>(null);

  // open on the global event; close + reset helpers
  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, []);

  // lock body scroll + close on Escape while open
  React.useEffect(() => {
    if (!open) return;
    document.body.classList.add("is-locked");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstField.current?.focus(), 60);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  // reset the "sent" state shortly after the dialog has closed
  React.useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setSent(false), 300);
    return () => clearTimeout(t);
  }, [open]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center p-4"
          initial={NOANIM ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <button
            aria-label="Close contact form"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/55 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={NOANIM ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 0.84, 0.44, 1] }}
            className="relative w-full max-w-[520px] overflow-hidden rounded-[22px] border border-ink/10 bg-paper shadow-[0_40px_80px_-30px_rgba(33,64,31,.7)]"
          >
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gold-gradient" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X size={18} />
            </button>

            <div className="p-7 sm:p-9">
              {sent ? (
                <div className="py-6 text-center">
                  <motion.span
                    initial={NOANIM ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-bottle text-paper"
                  >
                    <Check size={30} />
                  </motion.span>
                  <h2 className="font-display text-2xl font-black">Cheers — message sent!</h2>
                  <p className="mx-auto mt-2 max-w-[34ch] text-ink/60">
                    Thanks for reaching out to Accord. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-7 rounded-full bg-crimson px-7 py-3 font-bold text-paper transition-colors hover:bg-crimson-dark"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <span className="mb-3 inline-block rounded-full border-[1.5px] border-crimson px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-crimson">
                    Get in touch
                  </span>
                  <h2 id="contact-title" className="font-display text-[2rem] font-black leading-tight">
                    Let&apos;s talk <em className="italic text-crimson">beer</em>
                  </h2>
                  <p className="mt-2 text-ink/60">
                    Distribution, partnerships or a quick hello — drop us a line and we&apos;ll be in touch.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" htmlFor="c-name">
                        <input
                          ref={firstField}
                          id="c-name"
                          name="name"
                          required
                          autoComplete="name"
                          className={inputCls}
                          placeholder="Your name"
                        />
                      </Field>
                      <Field label="Email" htmlFor="c-email">
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className={inputCls}
                          placeholder="you@email.com"
                        />
                      </Field>
                    </div>
                    <Field label="Subject" htmlFor="c-subject">
                      <input
                        id="c-subject"
                        name="subject"
                        className={inputCls}
                        placeholder="What's this about?"
                      />
                    </Field>
                    <Field label="Message" htmlFor="c-message">
                      <textarea
                        id="c-message"
                        name="message"
                        required
                        rows={4}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us a little more…"
                      />
                    </Field>

                    <button
                      type="submit"
                      className="mt-1 rounded-full bg-crimson px-7 py-3.5 font-bold text-paper shadow-[0_14px_28px_-14px_rgba(166,13,56,.85)] transition-colors hover:bg-crimson-dark"
                    >
                      Send message
                    </button>
                    <p className="text-center text-xs text-ink/45">
                      For adults of legal drinking age only. We&apos;ll never share your details.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-ivory/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-crimson focus:bg-paper focus:ring-2 focus:ring-crimson/15";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="text-[0.8rem] font-bold uppercase tracking-wider text-ink/55">{label}</span>
      {children}
    </label>
  );
}
