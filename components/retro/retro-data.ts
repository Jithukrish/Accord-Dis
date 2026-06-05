/** Content for the retro Accord build. Four flagship beers presented as the
 *  design's "flavor cards", each on its own colour scene. */

export interface RetroBeer {
  name: string;
  image: string;
  kicker: string; // small-caps corner label
  style: string;
  scene: string; // card backdrop colour
  label: string; // label text colour on the card
}

export const RETRO_BEERS: RetroBeer[] = [
  {
    name: "10000",
    image: "/images/bottle-10000.png",
    kicker: "High Octane",
    style: "Super Strong Lager · 8% ABV",
    scene: "#3C6E9C", // steel blue
    label: "#F4F0E6",
  },
  {
    name: "Holandas",
    image: "/images/bottle-holandas.png",
    kicker: "Premium",
    style: "Premium Super Strong · imported hops",
    scene: "#E9C53B", // bright yellow
    label: "#2F7D3E", // green label text
  },
  {
    name: "Chennai King",
    image: "/images/bottle-chennai.png",
    kicker: "No. 1 · 650ml",
    style: "Super Strong Beer · king of the city",
    scene: "#2F7D3E", // leaf green
    label: "#F4F0E6",
  },
  {
    name: "Royal Accord",
    image: "/images/bottle-royal-accord.png",
    kicker: "The Royal Pour",
    style: "Super Strong Beer · 8% ABV",
    scene: "#7A1518", // deep cola red
    label: "#F4F0E6",
  },
];

export const RETRO_NAV = [
  { label: "Home", href: "#home" },
  { label: "Our Beers", href: "#beers" },
  { label: "The Story", href: "#story" },
  { label: "The Crew", href: "#crew" },
  { label: "Contact", href: "#contact" },
];
