import audio_off from "../assets/image/audio_off.png";
import audio_on from "../assets/image/audio_on.png";
import background from "../assets/image/background.jpg";
import customer from "../assets/image/customer.png";
import eel_fishing_left from "../assets/image/eel_fishing_left.png";
import eel_fishing from "../assets/image/eel_fishing.png";
import eel from "../assets/image/eel.png";
import egg from "../assets/image/egg.png";
import hook from "../assets/image/hook.png";
import net from "../assets/image/net.png";
import ocean from "../assets/image/ocean.jpg";
import octopus_fishing from "../assets/image/octopus_fishing.png";
import octopus from "../assets/image/octopus.png";
import plate from "../assets/image/plate.png";
import rice from "../assets/image/rice.png";
import salmon_fishing_left from "../assets/image/salmon_fishing_left.png";
import salmon_fishing from "../assets/image/salmon_fishing.png";
import salmon from "../assets/image/salmon.png";
import sheet_left from "../assets/image/sheet_left.png";
import sheet from "../assets/image/sheet.png";
import shrimp_fishing_left from "../assets/image/shrimp_fishing_left.png";
import shrimp_fishing from "../assets/image/shrimp_fishing.png";
import shrimp from "../assets/image/shrimp.png";
import tuna_fishing_left from "../assets/image/tuna_fishing_left.png";
import tuna_fishing from "../assets/image/tuna_fishing.png";
import tuna from "../assets/image/tuna.png";
import wasabi from "../assets/image/wasabi.png";
import sushi from "../assets/image/sushi.png";

export const IMAGES = [audio_off, audio_on, background, customer, eel_fishing_left, eel_fishing,
  eel, egg, hook, net, ocean, octopus_fishing, octopus, plate, rice, salmon_fishing_left, salmon_fishing,
  salmon, sheet_left, sheet, shrimp_fishing_left, shrimp_fishing, shrimp, tuna_fishing_left, tuna_fishing,
  tuna, wasabi, sushi,
];

export const MENUS = [
  {
    id: "tuna",
    name: "참치",
    link: tuna,
    price: "1,000"
  },
  {
    id: "salmon",
    name: "연어",
    link: salmon,
    price: "800",
  },
  {
    id: "octopus",
    name: "문어",
    link: octopus,
    price: "600",
  },
  {
    id: "eel",
    name: "장어",
    link: eel,
    price: "1,200",
  },
  {
    id: "shrimp",
    name: "새우",
    link: shrimp,
    price: "700",
  },
  {
    id: "egg",
    name: "계란",
    link: egg,
    price: "500",
  },
];

export const INGREDIENTS = [
  {
    id: "tuna",
    kind: "sashimi",
    link: tuna,
    price: 1000,
  },
  {
    id: "salmon",
    kind: "sashimi",
    link: salmon,
    price: 800,
  },
  {
    id: "octopus",
    kind: "sashimi",
    link: octopus,
    price: 600,
  },
  {
    id: "shrimp",
    kind: "sashimi",
    link: shrimp,
    price: 700,
  },
  {
    id: "eel",
    kind: "sashimi",
    link: eel,
    price: 1200,
  },
  {
    id: "egg",
    kind: "sashimi",
    link: egg,
    price: 500,
  },
  {
    id: "rice",
    kind: "rice",
    link: rice,
    price: null,
  },
];

export const FISHES = [
  {
    id: "tuna",
    link: tuna_fishing,
    name: "참치",
  },
  {
    id: "salmon",
    link: salmon_fishing,
    name: "연어",
  },
  {
    id: "octopus",
    link: octopus_fishing,
    name: "문어",
  },
  {
    id: "shrimp",
    link: shrimp_fishing,
    name: "새우",
  },
  {
    id: "eel",
    link: eel_fishing,
    name: "장어",
  },
];
