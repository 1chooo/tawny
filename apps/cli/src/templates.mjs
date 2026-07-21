import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";

export const templates = { dev, art, link };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
