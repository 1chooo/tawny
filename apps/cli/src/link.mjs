/**
 * "link" template — minimal personal link-in-bio page.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const link = {
  id: "link",
  label: "Link — personal link-in-bio page",
  hint: "Profile, social links, and a short tagline",
  path: "templates/link",
  defaultProjectName: "my-links",
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
