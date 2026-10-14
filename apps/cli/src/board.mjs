/**
 * "board" template — issue dashboard.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const board = {
  id: "board",
  label: "Board — issue dashboard",
  hint: "Sidebar, toolbar, and a 4px issue list",
  path: "templates/board",
  defaultProjectName: "my-board",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
