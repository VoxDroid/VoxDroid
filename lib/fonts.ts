import {
  Abril_Fatface,
  Anton,
  Archivo,
  Archivo_Black,
  Bungee,
  Courier_Prime,
  DM_Serif_Display,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Permanent_Marker,
  Rubik_Mono_One,
  Special_Elite,
} from "next/font/google";

/*
 * Every edition's typefaces, self-hosted by next/font. Fonts are not preloaded because only one
 * edition is on screen at a time; the switcher waits for the next edition's fonts before it reveals it.
 */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-anton",
  display: "swap",
  preload: false,
});
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--f-archivo",
  display: "swap",
  preload: false,
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--f-jetbrains",
  display: "swap",
  preload: false,
});
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--f-courier",
  display: "swap",
  preload: false,
});
const elite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-elite",
  display: "swap",
  preload: false,
});
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-marker",
  display: "swap",
  preload: false,
});
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-archivo-black",
  display: "swap",
  preload: false,
});
const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-abril",
  display: "swap",
  preload: false,
});
const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-bungee",
  display: "swap",
  preload: false,
});
const rubikMono = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-rubik-mono",
  display: "swap",
  preload: false,
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-dm-serif",
  display: "swap",
  preload: false,
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--f-instrument-serif",
  display: "swap",
  preload: false,
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--f-instrument-sans",
  display: "swap",
  preload: false,
});

/** All font variables, so switching editions never waits on a missing @font-face. */
export const allFontVariables = [
  anton,
  archivo,
  jetbrains,
  courier,
  elite,
  marker,
  archivoBlack,
  abril,
  bungee,
  rubikMono,
  dmSerif,
  instrumentSerif,
  instrumentSans,
]
  .map((f) => f.variable)
  .join(" ");
