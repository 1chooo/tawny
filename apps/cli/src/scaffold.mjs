import { spawn } from "child_process";
import { readFile, writeFile, readdir, access } from "fs/promises";
import { join } from "path";

export const TEMPLATE_REPO = "https://github.com/1chooo/tawny";

export const PLACEHOLDERS = [
  ["{{AUTHOR_NAME}}", "authorName"],
  ["{{AUTHOR_EMAIL}}", "authorEmail"],
  ["{{GITHUB_USERNAME}}", "githubUsername"],
  ["{{CITY_NAME}}", "cityName"],
];

const TEXT_EXTENSIONS = new Set([
  ".json",
  ".ts",
  ".tsx",
  ".mjs",
  ".js",
  ".md",
  ".mdx",
  ".css",
  ".env",
  ".example",
]);

export async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

export async function replacePlaceholders(projectDir, values) {
  const files = await walk(projectDir);
  for (const file of files) {
    const ext = file.slice(file.lastIndexOf("."));
    if (!TEXT_EXTENSIONS.has(ext) && !file.endsWith(".env.example")) continue;
    let content = await readFile(file, "utf8");
    let changed = false;
    for (const [token, key] of PLACEHOLDERS) {
      if (values[key] !== undefined && content.includes(token)) {
        content = content.split(token).join(values[key]);
        changed = true;
      }
    }
    if (changed) await writeFile(file, content);
  }
}

export function runCreateNextApp(templatePath, projectName, cwd) {
  return new Promise((resolve, reject) => {
    const args = [
      "create-next-app@latest",
      projectName,
      "--example",
      TEMPLATE_REPO,
      "--example-path",
      templatePath,
      "--yes",
      "--disable-git",
      "--skip-install",
    ];
    const child = spawn("npx", args, {
      cwd,
      stdio: "inherit",
      shell: true,
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`create-next-app exited with code ${code}`));
    });
    child.on("error", reject);
  });
}
