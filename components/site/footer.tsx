"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE =
  "Super Strong Beer ✦ The Pride of Accord ✦ Ready to Battle ✦ High Octane ✦ Brewed Since 2013 ✦ ";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const giant = useRef<HTMLDivElement>(null);
  const cols = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giant.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom bottom", scrub: 1 },
        }
      );
      gsap.fromTo(
        cols.current ? Array.from(cols.current.children) : [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: cols.current, start: "top 90%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={root} className="relative overflow-hidden bg-ink px-6 pb-8 pt-16 text-ivory">
      {/* marquee */}
      <div className="relative z-10 mb-11 -rotate-[1.6deg] scale-105 overflow-hidden border-y border-ivory/15 bg-crimson/[0.07] py-3.5">
        <div className="flex w-max animate-marquee">
          <span className="whitespace-nowrap pr-4 font-display text-[1.35rem] font-black italic text-gold-light">
            {MARQUEE.repeat(4)}
          </span>
          <span className="whitespace-nowrap pr-4 font-display text-[1.35rem] font-black italic text-gold-light">
            {MARQUEE.repeat(4)}
          </span>
        </div>
      </div>

      {/* giant background wordmark */}
      <div
        ref={giant}
        className="pointer-events-none absolute -bottom-[3.5vw] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-black leading-[0.8] tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1px rgba(246,239,221,0.07)" }}
        aria-hidden
      >
        ACCORD
      </div>

      <div
        ref={cols}
        className="relative z-10 mx-auto grid max-w-[1180px] gap-10 border-b border-ivory/15 pb-11 md:grid-cols-[1.6fr_1fr_1fr_1fr]"
      >
        <div>
          <Image src="/images/accord-logo.png" alt="Accord" width={56} height={56} className="mb-3.5 rounded-full" />
          <span className="font-display text-[1.7rem] font-black tracking-[0.12em]">ACCORD</span>
          <p className="mt-3 max-w-[34ch] text-ivory/60">
            Super strong beer, boldly brewed. The pride of Accord Distillers &amp; Brewers Pvt. Ltd.
          </p>
        </div>

        <FooterCol title="Explore" links={[["Home", "#home"], ["Our Beers", "#beers"], ["The Range", "#range"], ["Our Story", "#story"]]} />
        <FooterCol title="The Beers" links={[["10000", "#beers"], ["Holandas", "#beers"], ["Chennai King", "#beers"], ["Royal Accord", "#beers"]]} />
        <div>
          <h4 className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-gold-light">Enquiries</h4>
          <a href="mailto:info@accord-brewers.in" className="block py-1.5 text-ivory/80 hover:text-paper">
            info@accord-brewers.in
          </a>
          <span className="block py-1.5 text-sm text-ivory/55">Accord Distillers &amp; Brewers Pvt. Ltd.</span>
          <span className="block py-1.5 text-sm text-ivory/55">Tamil Nadu, India</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-[1180px] rounded-xl border border-crimson/35 bg-crimson/10 px-5 py-4 text-[0.92rem] text-ivory/85">
        <strong className="text-gold-light">Drink responsibly.</strong> For adults of legal drinking age only. Excessive
        consumption of alcohol is injurious to health.
      </div>

      <div className="relative z-10 mx-auto mt-6 flex max-w-[1180px] flex-wrap items-center justify-between gap-3.5 text-[0.85rem] text-ivory/50">
        <span>© 2013–2026 Accord Distillers &amp; Brewers Pvt. Ltd. · Accord Group</span>
        <span className="text-ivory/55">
          Crafted with <b className="inline-block animate-heartbeat text-crimson">❤</b> in India
        </span>
        <nav className="flex gap-5">
          <a href="#" className="hover:text-paper">Legal</a>
          <a href="#" className="hover:text-paper">Privacy Policy</a>
          <a href="#" className="hover:text-paper">Cookie Policy</a>
        </nav>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 transition-colors hover:border-crimson hover:bg-crimson"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-gold-light">{title}</h4>
      {links.map(([label, href]) => (
        <a key={label} href={href} className="block py-1.5 text-ivory/80 transition-colors hover:text-paper">
          {label}
        </a>
      ))}
    </div>
  );
}
