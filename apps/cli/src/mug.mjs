/**
 * "mug" template — Cobalt, a ceramics studio with a home, sign-in, and sales dashboard.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const mug = {
  id: "mug",
  label: "Cobalt — ceramics studio",
  hint: "Home, sign-in, and a sales dashboard",
  path: "templates/mug",
  defaultProjectName: "my-mug",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
