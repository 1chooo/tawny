/**
 * "admin" template — ceramics studio sales dashboard.
 * No extra prompts or post-processing beyond the shared placeholder replacement.
 */
export const admin = {
  id: "admin",
  label: "Admin — ceramics studio dashboard",
  hint: "Revenue, restock, coupons, and customers",
  path: "templates/admin",
  defaultProjectName: "my-admin",
  extraDefaults: {},
  extraPrompts: async () => ({}),
  postProcess: async () => {},
  nextSteps: [],
};
