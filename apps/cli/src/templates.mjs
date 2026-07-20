import { dev } from "./dev.mjs";
import { art } from "./art.mjs";

export const templates = { dev, art };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
