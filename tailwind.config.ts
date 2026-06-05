import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // Accord brand palette
        ivory: "#F6EFDD",
        paper: "#FFFBF0",
        ink: "#34232b",
        crimson: { DEFAULT: "#E11149", dark: "#A60D38" },
        bottle: { DEFAULT: "#3f6b3f", dark: "#21401f" },
        gold: { dark: "#9c7320", DEFAULT: "#c79a3e", light: "#f1d98e" },
        // Retro soda-shop palette (La Revoltosa-style), repurposed for Accord beer
        retro: {
          red: "#E8281E",
          "red-dark": "#C01910",
          cream: "#F4F0E6",
          brick: "#B85450",
          steel: "#3C6E9C",
          lemon: "#E9C53B",
          leaf: "#2F7D3E",
          cola: "#7A1518",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        condensed: ["var(--font-condensed)", "Impact", "sans-serif"],
      },
      keyframes: {
        "spotlight-move": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        heartbeat: {
          "0%,100%": { transform: "scale(1)" },
          "15%,45%": { transform: "scale(1.25)" },
          "30%": { transform: "scale(1)" },
        },
        rise: {
          "0%": { transform: "translateY(0) scale(.6)", opacity: "0" },
          "10%": { opacity: ".75" },
          "90%": { opacity: ".6" },
          "100%": { transform: "translateY(-105vh) scale(1)", opacity: "0" },
        },
        floatY: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(18px)" } },
        "bubble-rise": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "8%": { opacity: ".9" },
          "50%": { transform: "translateY(-55vh) translateX(var(--wob,14px))" },
          "92%": { opacity: ".8" },
          "100%": { transform: "translateY(-110vh) translateX(0)", opacity: "0" },
        },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        heartbeat: "heartbeat 1.6s ease-in-out infinite",
        rise: "rise linear infinite",
        floatY: "floatY 13s ease-in-out infinite",
        "bubble-rise": "bubble-rise linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
