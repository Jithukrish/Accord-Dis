/* ============================================================
   ACCORD — interactions
   Age gate · nav scroll state · mobile menu · scroll reveal · fizz
   ============================================================ */

(function () {
  "use strict";

  /* ---- Age gate (session-remembered) ---- */
  const gate = document.getElementById("ageGate");
  if (gate) {
    let verified = false;
    try { verified = sessionStorage.getItem("accord_age_ok") === "1"; } catch (e) {}
    if (!verified) {
      gate.hidden = false;
      document.body.classList.add("is-locked");
    }
    const pass = () => {
      try { sessionStorage.setItem("accord_age_ok", "1"); } catch (e) {}
      gate.hidden = true;
      document.body.classList.remove("is-locked");
    };
    const yes = document.getElementById("ageYes");
    const no = document.getElementById("ageNo");
    const deny = document.getElementById("ageDeny");
    if (yes) yes.addEventListener("click", pass);
    if (no) no.addEventListener("click", () => { if (deny) deny.hidden = false; });
  }

  /* ---- Nav: scrolled state ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal (sections + staggered groups) ---- */
  // index children of stagger groups so CSS can delay them in sequence
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    Array.prototype.forEach.call(group.children, (child, i) => {
      child.style.setProperty("--i", i);
    });
  });

  const revealEls = document.querySelectorAll(".reveal, [data-stagger]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if (e.target.hasAttribute("data-count-group")) countUp(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Count-up for hero stats ---- */
  function countUp(scope) {
    (scope || document).querySelectorAll("[data-count]").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const dur = 1100;
      let start = null;
      const step = (ts) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
  if (prefersReduced) {
    document.querySelectorAll("[data-count]").forEach((el) => {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  } else {
    // hero is above the fold — count on load
    countUp(document.querySelector(".hero"));
  }

  /* ---- Subtle parallax on scroll ---- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReduced) {
    let ticking = false;
    const apply = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2);
        const factor = parseFloat(el.getAttribute("data-parallax")) || 0.05;
        el.style.transform = "translateY(" + (-offset * factor).toFixed(1) + "px)";
      });
      ticking = false;
    };
    apply();
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
  }

  /* ---- Rising effervescence bubbles ---- */
  const field = document.getElementById("bubbles");
  if (field && !prefersReduced) {
    const COUNT = 26;
    for (let i = 0; i < COUNT; i++) {
      const b = document.createElement("span");
      b.className = "bubble";
      const size = 6 + Math.floor(Math.pow(i % 7, 1.4)) + (i % 5) * 3;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = (i / COUNT) * 100 + (i % 3) * 2 + "%";
      b.style.animationDuration = 9 + (i % 6) * 2.5 + "s";
      b.style.animationDelay = -(i * 0.9) + "s";
      field.appendChild(b);
    }
  }

  /* ---- Scroll progress bar ---- */
  const bar = document.getElementById("scrollbar");
  if (bar) {
    const updateBar = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    updateBar();
    window.addEventListener("scroll", updateBar, { passive: true });
  }

  /* ---- Nav: sliding-tab cursor pill (NavHeader) ---- */
  const navCursor = document.getElementById("navCursor");
  if (navCursor && !prefersReduced) {
    const tabs = links.querySelectorAll("a");
    const moveTo = (el) => {
      navCursor.style.left = el.offsetLeft + "px";
      navCursor.style.width = el.offsetWidth + "px";
      navCursor.style.opacity = "1";
    };
    tabs.forEach((t) => t.addEventListener("mouseenter", () => moveTo(t)));
    links.addEventListener("mouseleave", () => { navCursor.style.opacity = "0"; });
  }

  /* ---- Hero: mouse-follow spotlight (Spotlight) ---- */
  const hero = document.querySelector("[data-spotlight]");
  const spot = document.getElementById("heroSpot");
  if (hero && spot && !prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.left = (e.clientX - r.left) + "px";
      spot.style.top = (e.clientY - r.top) + "px";
      spot.style.opacity = "1";
    });
    hero.addEventListener("mouseleave", () => { spot.style.opacity = "0"; });
  }

  /* ---- Letter-stagger headings (AnimatedText) ---- */
  document.querySelectorAll("[data-animate-text]").forEach((el, gi) => {
    const text = el.textContent;
    el.textContent = "";
    const base = gi * 0.25;
    Array.prototype.forEach.call(text, (ch, i) => {
      const span = document.createElement("span");
      span.className = "at-letter";
      span.textContent = ch === " " ? " " : ch;
      span.style.animationDelay = (base + i * 0.04) + "s";
      el.appendChild(span);
    });
  });
  if (!prefersReduced) {
    requestAnimationFrame(() => {
      document.querySelectorAll(".at-letter").forEach((l) => l.classList.add("is-in"));
    });
  }

  /* ---- Features: auto-cycle highlight + step dots (FeatureCarousel) ---- */
  const fGrid = document.querySelector("[data-autocycle]");
  const steps = document.getElementById("featureSteps");
  if (fGrid && steps && !prefersReduced) {
    const cards = fGrid.querySelectorAll(".feature");
    const dots = steps.querySelectorAll(".stepnav__dot");
    let idx = 0, timer = null;
    const show = (n) => {
      idx = n % cards.length;
      cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };
    const start = () => { timer = setInterval(() => show(idx + 1), 2600); };
    const stop = () => { clearInterval(timer); };
    dots.forEach((d, i) => d.addEventListener("click", () => { stop(); show(i); start(); }));
    cards.forEach((c, i) => c.addEventListener("mouseenter", () => { stop(); show(i); }));
    fGrid.addEventListener("mouseleave", start);
    // begin once the section scrolls into view
    if ("IntersectionObserver" in window) {
      const fo = new IntersectionObserver((en) => {
        en.forEach((e) => { if (e.isIntersecting) { show(0); start(); fo.disconnect(); } });
      }, { threshold: 0.4 });
      fo.observe(fGrid);
    } else { show(0); start(); }
  }

  /* ---- Images: interactive expanding selector (InteractiveSelector) ---- */
  const selector = document.getElementById("selector");
  if (selector) {
    const panels = selector.querySelectorAll("[data-panel]");
    panels.forEach((p) => {
      const activate = () => {
        panels.forEach((q) => q.classList.toggle("is-active", q === p));
      };
      p.addEventListener("mouseenter", activate);
      p.addEventListener("click", activate);
      p.addEventListener("focus", activate);
    });
  }

  /* ---- Beers: inject morphing blob behind each card (SquishyCard) ---- */
  document.querySelectorAll(".beer").forEach((card) => {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "beer__blob");
    svg.setAttribute("viewBox", "0 0 320 384");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", "160"); circle.setAttribute("cy", "120"); circle.setAttribute("r", "102");
    const ellipse = document.createElementNS(ns, "ellipse");
    ellipse.setAttribute("cx", "160"); ellipse.setAttribute("cy", "270");
    ellipse.setAttribute("rx", "102"); ellipse.setAttribute("ry", "44");
    svg.appendChild(circle); svg.appendChild(ellipse);
    card.insertBefore(svg, card.firstChild);
  });

  /* ---- Magnetic buttons (MagneticButton) ---- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + (x * 0.35).toFixed(1) + "px," + (y * 0.45).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---- Back to top ---- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }
})();
