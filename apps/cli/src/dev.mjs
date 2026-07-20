/**
 * "dev" template — minimal mono developer blog.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const dev = {
  id: "dev",
  label: "Dev — minimal mono developer blog",
  hint: "MDX essays + interactive CS demos",
  path: "templates/dev",
  defaultProjectName: "my-blog",
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
