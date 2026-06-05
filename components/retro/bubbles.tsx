"use client";

/**
 * Floating soda-style bubbles: thin-outline circles with a small solid highlight
 * dot, drifting slowly upward with a gentle horizontal wobble. Cream on red
 * sections, red on cream sections. Deterministic layout so SSR/client match.
 */

const NOANIM = process.env.NEXT_PUBLIC_NOANIM === "1";

type Tone = "cream" | "red";

const TONE: Record<Tone, string> = {
  cream: "#F4F0E6",
  red: "#E8281E",
};

// deterministic pseudo-field — no Math.random in render
function field(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      left: (n * 37) % 100,
      size: 10 + ((n * 13) % 46),
      delay: -((n * 1.7) % 16),
      duration: 13 + ((n * 5) % 14),
      wobble: ((n % 5) - 2) * 12,
      opacity: 0.35 + ((n % 5) * 0.12),
    };
  });
}

export function Bubbles({
  tone = "cream",
  count = 14,
  seed = 0,
  className = "",
}: {
  tone?: Tone;
  count?: number;
  seed?: number;
  className?: string;
}) {
  if (NOANIM) return null;
  const color = TONE[tone];
  const bubbles = field(count, seed);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-12%] rounded-full animate-bubble-rise"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            border: `${Math.max(1.5, b.size * 0.06)}px solid ${color}`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            // consumed by the bubble-rise keyframes for horizontal wobble
            ["--wob" as string]: `${b.wobble}px`,
          }}
        >
          {/* highlight dot */}
          <span
            className="absolute rounded-full"
            style={{
              top: "18%",
              left: "20%",
              width: Math.max(2, b.size * 0.16),
              height: Math.max(2, b.size * 0.16),
              background: color,
            }}
          />
        </span>
      ))}
    </div>
  );
}
