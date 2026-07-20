import https from "https";
import { pipeline } from "stream/promises";
import { readFile, writeFile, readdir, access, mkdir } from "fs/promises";
import { join } from "path";
import * as tar from "tar";

export const REPO_OWNER = "1chooo";
export const REPO_NAME = "tawny";
export const REPO_BRANCH = "main";

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

export async function setProjectName(projectDir, projectName) {
  const pkgPath = join(projectDir, "package.json");
  if (!(await fileExists(pkgPath))) return;
  const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  pkg.name = projectName;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
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

function fetchTarball(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "create-tawny" } }, (res) => {
        const { statusCode, headers } = res;
        if (statusCode >= 300 && statusCode < 400 && headers.location && redirectsLeft > 0) {
          res.resume();
          fetchTarball(headers.location, redirectsLeft - 1).then(resolve, reject);
          return;
        }
        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`Failed to download template (HTTP ${statusCode})`));
          return;
        }
        resolve(res);
      })
      .on("error", reject);
  });
}

/**
 * Downloads the tarball of the template repo directly from GitHub and
 * extracts only the requested template subdirectory into `projectDir`.
 * This avoids shelling out to `create-next-app`/`npx`, which can hang
 * waiting on an interactive "ok to install" prompt in some terminals.
 */
export async function downloadTemplate(templatePath, projectDir) {
  await mkdir(projectDir, { recursive: true });

  const url = `https://codeload.github.com/${REPO_OWNER}/${REPO_NAME}/tar.gz/refs/heads/${REPO_BRANCH}`;
  const prefix = `${REPO_NAME}-${REPO_BRANCH}/${templatePath}/`;

  const res = await fetchTarball(url);
  await pipeline(
    res,
    tar.x({
      cwd: projectDir,
      strip: prefix.split("/").length - 1,
      filter: (path) => path.startsWith(prefix),
    }),
  );

  const files = await readdir(projectDir);
  if (files.length === 0) {
    throw new Error(
      `Template path "${templatePath}" was not found in ${REPO_OWNER}/${REPO_NAME}@${REPO_BRANCH}.`,
    );
  }
}
