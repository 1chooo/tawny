import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";
import { ocean } from "./ocean.mjs";
import { board } from "./board.mjs";

export const templates = { dev, art, link, ocean, board };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
