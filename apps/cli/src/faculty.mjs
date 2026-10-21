/**
 * "faculty" template — USC faculty page.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const faculty = {
  id: "faculty",
  label: "Faculty — USC faculty page",
  hint: "Cardinal banner, contact block, and a publications list",
  path: "templates/faculty",
  defaultProjectName: "my-faculty",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
