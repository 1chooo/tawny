#!/usr/bin/env node

import { join } from "path";
import * as p from "@clack/prompts";
import {
  fileExists,
  replacePlaceholders,
  downloadTemplate,
  setProjectName,
} from "./src/scaffold.mjs";
import { getTemplate, templateList } from "./src/templates.mjs";

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("yarn")) return "yarn";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("bun")) return "bun";
  return "npm";
}

function installCommand(pm) {
  return pm === "yarn" ? "yarn" : `${pm} install`;
}

function runCommand(pm, script) {
  return pm === "npm" ? `npm run ${script}` : `${pm} ${script}`;
}

async function resolveTemplate(templateArg) {
  if (templateArg) {
    const template = getTemplate(templateArg);
    if (!template) {
      p.log.error(
        `Unknown template "${templateArg}". Available: ${templateList.map((t) => t.id).join(", ")}`,
      );
      process.exit(1);
    }
    return template;
  }

  const picked = await p.select({
    message: "Which template would you like to scaffold?",
    options: templateList.map((t) => ({
      value: t.id,
      label: t.label,
      hint: t.hint,
    })),
  });
  if (p.isCancel(picked)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }
  return getTemplate(picked);
}

async function main() {
  p.intro("create-tawny");

  const [templateArg, projectNameArg] = process.argv.slice(2);

  const template = await resolveTemplate(templateArg);

  const projectName = projectNameArg
    ? projectNameArg
    : await p.text({
        message: "Project name",
        placeholder: template.defaultProjectName,
        defaultValue: template.defaultProjectName,
        validate: (v) => {
          if (!v?.trim()) return "Project name is required";
          if (!/^[a-z0-9-_]+$/i.test(v)) {
            return "Use letters, numbers, hyphens, and underscores only";
          }
        },
      });
  if (p.isCancel(projectName)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const authorName = await p.text({
    message: "Your name (brand)",
    placeholder: "Alex Chen",
    validate: (v) => (v?.trim() ? undefined : "Name is required"),
  });
  if (p.isCancel(authorName)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const authorEmail = await p.text({
    message: "Email",
    placeholder: "hello@example.com",
    validate: (v) => (v?.includes("@") ? undefined : "Enter a valid email address"),
  });
  if (p.isCancel(authorEmail)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const githubUsername = await p.text({
    message: "GitHub username",
    placeholder: "your-username",
    validate: (v) => (v?.trim() ? undefined : "GitHub username is required"),
  });
  if (p.isCancel(githubUsername)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const cityName = await p.text({
    message: "Location (shown in the footer)",
    placeholder: "San Francisco",
    defaultValue: "San Francisco",
  });
  if (p.isCancel(cityName)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const answers = {
    authorName,
    authorEmail,
    githubUsername,
    cityName,
    ...(await template.extraPrompts()),
  };

  const cwd = process.cwd();
  const projectDir = join(cwd, projectName);

  if (await fileExists(projectDir)) {
    p.cancel(`Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  const s = p.spinner();
  s.start("Downloading template…");

  try {
    await downloadTemplate(template.path, projectDir);
  } catch (err) {
    s.stop("Scaffold failed.");
    p.log.error(String(err));
    process.exit(1);
  }

  s.message("Replacing placeholders…");
  await setProjectName(projectDir, projectName);
  await replacePlaceholders(projectDir, answers);

  s.message("Running template setup…");
  await template.postProcess(projectDir, answers);

  s.stop("Project created.");

  const pm = detectPackageManager();
  const install = installCommand(pm);
  const dev = runCommand(pm, "dev");

  p.note(
    ["cd " + projectName, install, dev, "", ...template.nextSteps].join("\n"),
    "Next steps",
  );

  p.outro(`Done! Open http://localhost:3000 after ${dev}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
