import atelier from "@/assets/suits/atelier.jpg";
import fox from "@/assets/suits/fox.jpg";
import jack from "@/assets/suits/jack.jpg";
import kelp from "@/assets/suits/kelp.jpg";
import moth from "@/assets/suits/moth.jpg";
import owl from "@/assets/suits/owl.jpg";
import spade from "@/assets/suits/spade.jpg";

export const repo = "https://github.com/ceoempresarial1-cell/hollowbloom";

export type Wear = {
  upper: string;
  lower: string;
  legs: string;
  feet: string;
  face: string;
};

export type Cryptid = {
  id: string;
  name: string;
  epithet: string;
  blurb: string;
  image: string;
  wear: Wear;
};

export const cryptids: Cryptid[] = [
  {
    id: "mothveil",
    name: "Mothveil",
    epithet: "Bat-wing antennae",
    blurb: "Half the fur drops into baby pink. The bow is almost a warning.",
    image: moth,
    wear: { upper: "sweater", lower: "tennis", legs: "fishnets", feet: "boots", face: "liner" },
  },
  {
    id: "jackglass",
    name: "Jack-in-the-Glass",
    epithet: "Heart-charm antlers",
    blurb: "A hare in a tennis skirt, antlers hung with tiny hearts.",
    image: jack,
    wear: { upper: "babydoll", lower: "ruffle", legs: "thigh", feet: "janes", face: "freckles" },
  },
  {
    id: "kelp",
    name: "Kelp Horse",
    epithet: "Mint mane",
    blurb: "Black water-horse, mint hair, fishnet on the arms, a bow at the throat.",
    image: kelp,
    wear: { upper: "cardigan", lower: "bloomers", legs: "fishnets", feet: "creepers", face: "bitten" },
  },
  {
    id: "spade",
    name: "Spade Saint",
    epithet: "Heart eye",
    blurb: "One heart-shaped eye. Coffin prints with round corners and smiley ribs.",
    image: spade,
    wear: { upper: "sweater", lower: "bloomers", legs: "bats", feet: "boots", face: "liner" },
  },
  {
    id: "fox",
    name: "Lantern Vixen",
    epithet: "Split-dye fox",
    blurb: "Ember pink against black. The choker locks with a pastel heart.",
    image: fox,
    wear: { upper: "cardigan", lower: "tennis", legs: "bats", feet: "janes", face: "freckles" },
  },
  {
    id: "owl",
    name: "Bone Owl",
    epithet: "Doll lashes",
    blurb: "Lashes on both lids, bone-print wings, a bow bigger than the stare.",
    image: owl,
    wear: { upper: "babydoll", lower: "ruffle", legs: "thigh", feet: "boots", face: "blacklip" },
  },
];

export const atelierImage = atelier;

type Piece = { id: string; name: string; note: string };

export const wardrobe: { id: keyof Wear; label: string; pieces: Piece[] }[] = [
  {
    id: "upper",
    label: "Upper",
    pieces: [
      { id: "sweater", name: "Melting sweater", note: "Oversized knit. Cartoon ribs. Letters that drip." },
      { id: "babydoll", name: "Babydoll dress", note: "Peter Pan collar, short hem, black underneath." },
      { id: "cardigan", name: "Crop and cardigan", note: "A small top under an open pastel knit." },
    ],
  },
  {
    id: "lower",
    label: "Lower",
    pieces: [
      { id: "tennis", name: "Tennis skirt", note: "High waist, sharp pleats, pink against black." },
      { id: "ruffle", name: "Ruffle mini", note: "Tiers that bounce. Looks soft. Is not." },
      { id: "bloomers", name: "Bloomers", note: "Puffed, high, finished with a tiny bow." },
    ],
  },
  {
    id: "legs",
    label: "Legs",
    pieces: [
      { id: "fishnets", name: "Pastel fishnets", note: "Mint or baby pink, torn on purpose." },
      { id: "thigh", name: "Thigh-highs", note: "Garters built in. A bow at each top." },
      { id: "bats", name: "Bat-wing socks", note: "Little wings at the ankle, or a bone print." },
    ],
  },
  {
    id: "feet",
    label: "Feet",
    pieces: [
      { id: "boots", name: "Platform boots", note: "Massive. Pastel laces. Silver spikes." },
      { id: "creepers", name: "Creepers", note: "Thick soles that keep the soft parts grounded." },
      { id: "janes", name: "Mary Janes", note: "Double platform, heart strap, a little vicious." },
    ],
  },
  {
    id: "face",
    label: "Face",
    pieces: [
      { id: "liner", name: "Winged liner", note: "Black geometric wings. Lilac in the crease." },
      { id: "bitten", name: "Bitten lip", note: "Pink only in the center, faded at the edges." },
      { id: "freckles", name: "Heart freckles", note: "Porcelain blush, hearts across the nose." },
      { id: "blacklip", name: "Matte black", note: "A flat black mouth. Doll, then feral." },
    ],
  },
];

export function findCryptid(id: string) {
  return cryptids.find((item) => item.id === id) ?? cryptids[0];
}

export function piece(layer: keyof Wear, id: string) {
  const group = wardrobe.find((item) => item.id === layer);
  return group?.pieces.find((item) => item.id === id) ?? group?.pieces[0];
}
