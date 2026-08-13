export const YES_DEFAULTS = {
  authorName: "Alex Chen",
  authorEmail: "hello@example.com",
  githubUsername: "your-username",
  cityName: "San Francisco",
};

/**
 * Parse create-tawny argv. `--yes` may appear anywhere; remaining
 * positionals are template id and project name.
 */
export function parseArgs(argv) {
  const yes = argv.includes("--yes");
  const rest = argv.filter((arg) => arg !== "--yes");
  const [templateArg, projectNameArg] = rest;
  return { yes, templateArg, projectNameArg };
}
