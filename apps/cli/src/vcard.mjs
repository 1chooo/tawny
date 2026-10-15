/**
 * "vcard" template — dark personal page with a profile sidebar.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const vcard = {
  id: "vcard",
  label: "VCard — personal profile page",
  hint: "Sidebar, selected work, and short notes",
  path: "templates/vcard",
  defaultProjectName: "my-vcard",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
