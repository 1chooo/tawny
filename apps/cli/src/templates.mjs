import { dev } from "./dev.mjs";
import { art } from "./art.mjs";
import { link } from "./link.mjs";
import { ocean } from "./ocean.mjs";
import { board } from "./board.mjs";
import { vcard } from "./vcard.mjs";
import { cobalt } from "./cobalt.mjs";
import { atelier } from "./atelier.mjs";
import { admin } from "./admin.mjs";
import { desk } from "./desk.mjs";
import { usc } from "./usc.mjs";
import { seal } from "./seal.mjs";

export const templates = {
  dev,
  art,
  link,
  ocean,
  board,
  vcard,
  cobalt,
  "atelier": atelier,
  admin,
  desk,
  usc,
  seal,
};

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id];
}
