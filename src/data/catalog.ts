import atelier from "@/assets/suits/atelier.jpg";
import fox from "@/assets/suits/fox.jpg";
import jack from "@/assets/suits/jack.jpg";
import kelp from "@/assets/suits/kelp.jpg";
import moth from "@/assets/suits/moth.jpg";
import owl from "@/assets/suits/owl.jpg";
import spade from "@/assets/suits/spade.jpg";

export const STUDIO = {
  name: "Hollowbloom",
  mark: "HB",
  repo: "https://github.com/ceoempresarial1-cell/hollowbloom",
  slots: 3,
  season: "Spring 2027",
  deposit: 0.4,
  midpoint: 0.4,
} as const;

export type BaseId = "mini" | "partial" | "three" | "plant" | "digi";

export type Addon = {
  id: string;
  name: string;
  price: number;
  detail: string;
};

export type Species = {
  id: string;
  name: string;
  epithet: string;
  blurb: string;
  image: string;
  signature: string[];
};

export const bases: { id: BaseId; name: string; price: number; detail: string }[] = [
  {
    id: "mini",
    name: "Mini partial",
    price: 1450,
    detail: "Head, short neck, and a display tail.",
  },
  {
    id: "partial",
    name: "Partial",
    price: 2850,
    detail: "Head, handpaws, and tail. The usual first suit.",
  },
  {
    id: "three",
    name: "Three-quarter",
    price: 4600,
    detail: "A partial, plus sleeves and footpaws.",
  },
  {
    id: "plant",
    name: "Plantigrade fullsuit",
    price: 6800,
    detail: "Full body on feet you can actually walk in.",
  },
  {
    id: "digi",
    name: "Digitigrade fullsuit",
    price: 9200,
    detail: "Fullsuit on raised feet, with the extra balance work.",
  },
];

export const addons: Addon[] = [
  { id: "eyes", name: "Follow-me eyes", price: 320, detail: "Eyes that track the room." },
  { id: "jaw", name: "Moving jaw", price: 520, detail: "Hinged muzzle on a hidden pull." },
  { id: "tongue", name: "Magnetic tongue", price: 95, detail: "Comes off for cleaning." },
  { id: "led", name: "LED chapel glass", price: 240, detail: "Warm lamps behind colored resin." },
  { id: "wings", name: "Wings", price: 860, detail: "Moth, membrane, or rose-window." },
  { id: "horns", name: "Antlers or horns", price: 380, detail: "Light foam, glass chips optional." },
  { id: "tail", name: "Long display tail", price: 290, detail: "A tail meant to be seen, not sat on." },
  { id: "paint", name: "Stained-glass airbrush", price: 420, detail: "Jewel markings, sealed so they stay." },
  { id: "ruff", name: "Neck ruff or mane", price: 210, detail: "Kelp, lace, or floral." },
  { id: "fan", name: "Head cooling fan", price: 165, detail: "A quiet fan in the skull." },
  { id: "claws", name: "Resin claw set", price: 75, detail: "Painted, glossed, and glued to the paws." },
];

export const species: Species[] = [
  {
    id: "mothveil",
    name: "Mothveil",
    epithet: "Night pollinator",
    blurb: "Plum fur, poison-green glass, and wings edged like chapel gold.",
    image: moth,
    signature: ["wings", "paint", "led", "eyes"],
  },
  {
    id: "jackglass",
    name: "Jack-in-the-Glass",
    epithet: "Antlered hare",
    blurb: "Cream and coral, with antlers wired in scrap emerald and ruby glass.",
    image: jack,
    signature: ["horns", "paint", "ruff"],
  },
  {
    id: "kelp",
    name: "Kelp Horse",
    epithet: "River cryptid",
    blurb: "A teal water-horse with a gilt mane and scales along the arms.",
    image: kelp,
    signature: ["ruff", "paint", "led", "tail"],
  },
  {
    id: "spade",
    name: "Spade Saint",
    epithet: "One-eyed slender",
    blurb: "A spade hood and a body pieced like stained-glass leading.",
    image: spade,
    signature: ["paint", "led", "eyes"],
  },
  {
    id: "fox",
    name: "Lantern Vixen",
    epithet: "Ember fox",
    blurb: "Ink and ember fur, and a small lantern of green glass at the chest.",
    image: fox,
    signature: ["led", "paint", "tail", "claws"],
  },
  {
    id: "owl",
    name: "Bone Owl",
    epithet: "Rose-window wings",
    blurb: "Patient gold eyes and wings patterned like a chapel rose window.",
    image: owl,
    signature: ["wings", "eyes", "ruff"],
  },
];

export const atelierImage = atelier;

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function findBase(id: BaseId) {
  const base = bases.find((item) => item.id === id);
  if (!base) throw new Error(`Unknown base: ${id}`);
  return base;
}

export function quoteTotal(baseId: BaseId, addonIds: readonly string[]) {
  const extra = addons
    .filter((item) => addonIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  return findBase(baseId).price + extra;
}

export function splitPay(total: number) {
  const deposit = Math.round(total * STUDIO.deposit);
  const midpoint = Math.round(total * STUDIO.midpoint);
  const finale = total - deposit - midpoint;
  return { deposit, midpoint, finale };
}

export function findSpecies(id: string) {
  return species.find((item) => item.id === id) ?? species[0];
}
