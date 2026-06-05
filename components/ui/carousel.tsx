"use client";

import * as React from "react";

/**
 * Horizontal, snap-scrolling carousel. Children are laid out in a single row
 * and can be dragged / swiped. Prev/next arrows appear only when the content
 * overflows, so with just a few items it reads like a normal row.
 *
 * Each direct child should set `data-carousel-item` and its own responsive
 * width (e.g. `shrink-0 snap-start w-[82%] lg:w-[...]`).
 */
export function Carousel({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const sync = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  React.useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-carousel-item]");
    const gap = 24; // matches gap-6
    const amount = item ? item.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <Arrow dir="prev" onClick={() => step(-1)} show={canPrev} />
      <Arrow dir="next" onClick={() => step(1)} show={canNext} />
    </div>
  );
}

function Arrow({
  dir,
  onClick,
  show,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  show: boolean;
}) {
  const isPrev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous beers" : "Next beers"}
      tabIndex={show ? 0 : -1}
      className={[
        "absolute top-[180px] z-20 grid h-11 w-11 place-items-center rounded-full",
        "border border-ink/10 bg-paper/90 text-ink shadow-lg backdrop-blur",
        "transition-all hover:scale-110 hover:bg-crimson hover:text-paper",
        isPrev ? "-left-3 lg:-left-5" : "-right-3 lg:-right-5",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {isPrev ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}
