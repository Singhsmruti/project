/**
 * The theme table.
 *
 * Every colour in "flame" is sampled from the 3S mark itself
 * (`public/3s-mark.png`) — the flame red is the logo's exact #d03731, and the
 * ground is neutral because the logo's own grey ramp is neutral, not warm.
 *
 * "graphite" is the first pass we built and liked; it is kept rather than
 * thrown away. Both are live — the switcher writes `data-theme` on <html> and
 * globals.css holds one token block per theme.
 */

export type ThemeKey = "flame" | "graphite";

export type Theme = {
  key: ThemeKey;
  name: string;
  origin: string;
  /** swatches shown in the switcher, ground → ink → accent */
  swatch: [string, string, string];
  accent: string;
  ground: string;
  note: string;
};

export const THEMES: Theme[] = [
  {
    key: "flame",
    name: "Flame",
    origin: "Sampled from the 3S logo",
    swatch: ["#f7f7f8", "#101214", "#d03731"],
    accent: "#d03731",
    ground: "#f7f7f8",
    note: "Logo red on neutral steel. Matches the mark exactly, so the header logo no longer sits apart from the page it is on.",
  },
  {
    key: "graphite",
    name: "Graphite",
    origin: "The first pass — kept",
    swatch: ["#faf8f5", "#14181c", "#c8102e"],
    accent: "#c8102e",
    ground: "#faf8f5",
    note: "Warm cream paper with a colder crimson. Softer and more editorial; reads less like the logo.",
  },
];

export const DEFAULT_THEME: ThemeKey = "flame";
export const THEME_STORAGE_KEY = "3s.theme.v1";
