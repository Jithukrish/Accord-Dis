"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/components/site/data";
import { openContact } from "@/components/site/contact";
import { cn } from "@/lib/utils";

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-ivory/85 backdrop-blur-md shadow-[0_14px_30px_-24px_rgba(33,64,31,0.6)] py-3" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-5 px-6">
        <a href="#home" className="flex items-center gap-3" aria-label="Accord — Home">
          <Image src="/images/accord-logo.png" alt="" width={40} height={40} className="rounded-full" />
          <span className="font-display text-2xl font-black tracking-[0.12em] text-crimson-dark">ACCORD</span>
        </a>

        {/* desktop: sliding-tab nav */}
        <ul
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setCursor((c) => ({ ...c, opacity: 0 }))}
        >
          {NAV_LINKS.map((link) => (
            <Tab key={link.href} href={link.href} setCursor={setCursor}>
              {link.label}
            </Tab>
          ))}
          <button
            type="button"
            onClick={openContact}
            className="ml-2 rounded-full bg-crimson px-5 py-2 text-sm font-bold text-paper transition-colors hover:bg-crimson-dark"
          >
            Contact
          </button>
          <motion.li
            animate={cursor}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute left-0 top-1/2 z-0 h-9 -translate-y-1/2 rounded-full border border-crimson/40 bg-crimson/15"
          />
        </ul>

        {/* mobile toggle */}
        <button
          className="md:hidden text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile menu */}
      <motion.nav
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden md:hidden"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-semibold py-1"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
            className="font-display text-2xl font-semibold py-1 text-crimson"
          >
            Contact
          </button>
        </div>
      </motion.nav>
    </header>
  );
}

function Tab({
  children,
  href,
  setCursor,
}: {
  children: React.ReactNode;
  href: string;
  setCursor: (c: { left: number; width: number; opacity: number }) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setCursor({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10"
    >
      <a href={href} className="block px-4 py-2 text-sm font-semibold text-ink">
        {children}
      </a>
    </li>
  );
}
