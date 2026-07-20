declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "mdx/types";

  export const postMeta: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
  };

  export const metadata: {
    title?: string;
    date?: string;
    description?: string;
    draft?: boolean;
  };

  const MDXComponent: ComponentType<{ components?: MDXComponents }>;
  export default MDXComponent;
}
