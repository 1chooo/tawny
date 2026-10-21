import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";
import { ocean } from "./ocean.mjs";
import { board } from "./board.mjs";
import { vcard } from "./vcard.mjs";
import { mug } from "./mug.mjs";
import { admin } from "./admin.mjs";
import { desk } from "./desk.mjs";
import { faculty } from "./faculty.mjs";

export const templates = { dev, art, link, ocean, board, vcard, mug, admin, desk, faculty };

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
