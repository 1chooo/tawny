import { cp, readFile, writeFile, readdir, rm } from "fs/promises";
import { join } from "path";
import * as p from "@clack/prompts";
import { fileExists } from "./scaffold.mjs";

export async function stripZhLocale(projectDir) {
  const zhJson = join(projectDir, "messages", "zh.json");
  if (await fileExists(zhJson)) await rm(zhJson);

  const routingPath = join(projectDir, "i18n", "routing.ts");
  if (await fileExists(routingPath)) {
    let routing = await readFile(routingPath, "utf8");
    routing = routing.replace(
      /export const routing = defineRouting\(\{[\s\S]*?locales:\s*\[[^\]]*\]/,
      "export const routing = defineRouting({\n  locales: [\"en\"]",
    );
    await writeFile(routingPath, routing);
  }

  const postsDir = join(projectDir, "content", "posts");
  if (await fileExists(postsDir)) {
    for (const file of await readdir(postsDir)) {
      if (file.endsWith(".zh.mdx")) {
        await rm(join(postsDir, file));
      }
    }
  }
}

/**
 * "art" template — bilingual bento journal.
 * Extra prompt for locales, plus locale-stripping and .env scaffolding post-process.
 */
export const art = {
  id: "art",
  label: "Art — bilingual bento journal",
  hint: "MDX notes, projects, and interactive bento tiles",
  path: "templates/art",
  defaultProjectName: "my-journal",
  async extraPrompts() {
    const locales = await p.select({
      message: "Locales",
      options: [
        { value: "en,zh", label: "English + Chinese (zh)" },
        { value: "en", label: "English only" },
      ],
      initialValue: "en,zh",
    });
    if (p.isCancel(locales)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }
    return { locales };
  },
  async postProcess(projectDir, answers) {
    if (answers.locales === "en") {
      await stripZhLocale(projectDir);
    }

    const envExample = join(projectDir, ".env.example");
    if (await fileExists(envExample)) {
      let env = await readFile(envExample, "utf8");
      env = env.replace(/^WEATHER_CITY=.*$/m, `WEATHER_CITY=${answers.cityName}`);
      await writeFile(envExample, env);
      await cp(envExample, join(projectDir, ".env"));
    }
  },
  nextSteps: ["Start reading:", "  /en/notes/hello-world", "  /en/notes/writing-in-mdx"],
};
