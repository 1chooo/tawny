import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";
import { ocean } from "./ocean.mjs";

export const templates = { dev, art, link, ocean };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
