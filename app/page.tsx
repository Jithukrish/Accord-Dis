import { RetroAgeGate } from "@/components/retro/age-gate";
import { RetroMenu } from "@/components/retro/menu";
import { RetroHero } from "@/components/retro/hero";
import { RetroTransition } from "@/components/retro/transition";
import { RetroStory } from "@/components/retro/story";
import { RetroBottleShowcase } from "@/components/retro/bottle-showcase";
import { RetroCards } from "@/components/retro/cards";
import { RetroMarquee } from "@/components/retro/marquee";
import { RetroFooter } from "@/components/retro/footer";

export default function Home() {
  return (
    <>
      <RetroAgeGate />
      <RetroMenu />
      <main>
        <RetroHero />
        <RetroTransition />
        <RetroStory />
        <RetroBottleShowcase />
        <RetroCards />
        <RetroMarquee />
      </main>
      <RetroFooter />
    </>
  );
}
