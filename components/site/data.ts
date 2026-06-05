export interface Beer {
  name: string;
  image: string;
  abv: string;
  style: string;
  tag: string;
  color: string; // accent
}

export const BEERS: Beer[] = [
  {
    name: "10000",
    image: "/images/bottle-10000.png",
    abv: "8% ABV",
    style: "High-Octane Super Strong Lager · Volts",
    tag: "Taste the high octane super strong beer.",
    color: "#d4202f",
  },
  {
    name: "Holandas",
    image: "/images/bottle-holandas.png",
    abv: "Premium Strong",
    style: "Premium Super Strong Beer · barley & imported hops",
    tag: "…the pride of Accord.",
    color: "#3b4fa0",
  },
  {
    name: "Chennai King",
    image: "/images/bottle-chennai.png",
    abv: "No.1 · 650ml",
    style: "Super Strong Beer · the king of the city",
    tag: "…ready to battle.",
    color: "#2f7d3e",
  },
  {
    name: "Royal Accord",
    image: "/images/bottle-royal-accord.png",
    abv: "8% ABV",
    style: "Super Strong Beer · the royal pour",
    tag: "Taste the royal super strong beer.",
    color: "#b0152f",
  },
  {
    name: "Accord Black",
    image: "/images/bottle-10000.png",
    abv: "Strong",
    style: "Super Strong Beer · the dark side",
    tag: "Bold, dark and unapologetic.",
    color: "#2b2b33",
  },
  {
    name: "Holandas Gold",
    image: "/images/bottle-holandas.png",
    abv: "Premium Strong",
    style: "Premium Super Strong Beer · golden reserve",
    tag: "The gold standard of strong.",
    color: "#c79a3a",
  },
  {
    name: "Chennai King Max",
    image: "/images/bottle-chennai.png",
    abv: "No.1 · 650ml",
    style: "Super Strong Beer · maximum power",
    tag: "The king, dialled to the max.",
    color: "#1f6f4a",
  },
  {
    name: "Accord Crown",
    image: "/images/bottle-royal-accord.png",
    abv: "8% ABV",
    style: "Super Strong Beer · crowned strength",
    tag: "Wear the crown, taste the strength.",
    color: "#8a1230",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Beers", href: "#beers" },
  { label: "The Range", href: "#range" },
  { label: "Our Story", href: "#story" },
];

export const FEATURES = [
  { num: "01", title: "Super strong", text: "High-octane brews of up to 8% ABV. Full-bodied, bold and built for the occasion." },
  { num: "02", title: "Crafted with care", text: "Finest grade barley and imported hops, brewed through an international process." },
  { num: "03", title: "Made at scale", text: "A modern brewery with capacity for over a million cases every single month." },
  { num: "04", title: "The pride of Accord", text: "Part of the Accord Group, brewing flagship strong beers across India since 2013." },
];

export const TIMELINE = [
  { year: "2009", text: "Accord enters the world of beer manufacturing." },
  { year: "2011", text: "The brewing unit is set up and readied for production." },
  { year: "2013", text: "Commercial production begins — the first Accord beers reach the market." },
  { year: "Today", text: "Over a million cases a month and four flagship strong beers." },
];
