/**
 * "seal" template — paper editorial portfolio.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const seal = {
  id: "seal",
  label: "Seal — paper editorial portfolio",
  hint: "Vertical Chinese titles, vermilion seals, and selected work",
  path: "templates/seal",
  defaultProjectName: "my-seal",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
