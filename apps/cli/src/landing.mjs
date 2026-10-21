/**
 * "landing" template — ceramics studio home page.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const landing = {
  id: "landing",
  label: "Landing — ceramics studio home",
  hint: "Hero, latest firing, process, and a studio note",
  path: "templates/landing",
  defaultProjectName: "my-landing",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
