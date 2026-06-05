import type { Metadata } from "next";
import { Fraunces, Archivo, Anton } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Ultra-bold condensed display face for the retro headlines
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Accord — Super Strong Beer · Accord Distillers & Brewers",
  description:
    "Accord super strong beers — 10000, Holandas, Chennai King and Royal Accord. Boldly brewed by Accord Distillers & Brewers Pvt. Ltd.",
  icons: { icon: "/images/accord-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${anton.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
