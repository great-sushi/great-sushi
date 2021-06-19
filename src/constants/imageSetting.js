import audioOff from "../assets/image/audio_off.png";
import audioOn from "../assets/image/audio_on.png";
import background from "../assets/image/background.jpg";
import customer from "../assets/image/customer.png";
import eelFishingLeft from "../assets/image/eel_fishing_left.png";
import eelFishingRight from "../assets/image/eel_fishing.png";
import eel from "../assets/image/eel.png";
import egg from "../assets/image/egg.png";
import hook from "../assets/image/hook.png";
import net from "../assets/image/net.png";
import ocean from "../assets/image/ocean.jpg";
import octopusFishing from "../assets/image/octopus_fishing.png";
import octopus from "../assets/image/octopus.png";
import plate from "../assets/image/plate.png";
import rice from "../assets/image/rice.png";
import salmonFishingLeft from "../assets/image/salmon_fishing_left.png";
import salmonFishingRight from "../assets/image/salmon_fishing.png";
import salmon from "../assets/image/salmon.png";
import sheetLeft from "../assets/image/sheet_left.png";
import sheetRight from "../assets/image/sheet.png";
import shrimpFishingLeft from "../assets/image/shrimp_fishing_left.png";
import shrimpFishingRight from "../assets/image/shrimp_fishing.png";
import shrimp from "../assets/image/shrimp.png";
import tunaFishingLeft from "../assets/image/tuna_fishing_left.png";
import tunaFishingRight from "../assets/image/tuna_fishing.png";
import tuna from "../assets/image/tuna.png";
import wasabi from "../assets/image/wasabi.png";
import sushi from "../assets/image/sushi.png";

export const IMAGES = [audioOff, audioOn, background, customer, eelFishingLeft, eelFishingRight,
  eel, egg, hook, net, ocean, octopusFishing, octopus, plate, rice, salmonFishingLeft, salmonFishingRight,
  salmon, sheetLeft, sheetRight, shrimpFishingLeft, shrimpFishingRight, shrimp, tunaFishingLeft, tunaFishingRight,
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
    link: tunaFishingRight,
    name: "참치",
  },
  {
    id: "salmon",
    link: salmonFishingRight,
    name: "연어",
  },
  {
    id: "octopus",
    link: octopusFishing,
    name: "문어",
  },
  {
    id: "shrimp",
    link: shrimpFishingRight,
    name: "새우",
  },
  {
    id: "eel",
    link: eelFishingRight,
    name: "장어",
  },
];

export const FISH_IMAGE = {
  LEFT: {
    tuna: tunaFishingLeft,
    salmon: salmonFishingLeft,
    eel: eelFishingLeft,
    shrimp: shrimpFishingLeft,
  },
  RIGHT: {
    tuna: tunaFishingRight,
    salmon: salmonFishingRight,
    eel: eelFishingRight,
    shrimp: shrimpFishingRight,
  },
  octopus: octopusFishing,
};
