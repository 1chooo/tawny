/**
 * "desk" template — project dashboard.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const desk = {
  id: "desk",
  label: "Desk — project dashboard",
  hint: "Sidebar, weekly chart, projects, and a timer",
  path: "templates/desk",
  defaultProjectName: "my-desk",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
