import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";
import { ocean } from "./ocean.mjs";
import { board } from "./board.mjs";
import { vcard } from "./vcard.mjs";

export const templates = { dev, art, link, ocean, board, vcard };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
