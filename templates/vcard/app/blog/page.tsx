import { VcardBlogList } from "@/components/blog-list";
import { VcardShell } from "@/components/shell";

export default function BlogPage() {
  return (
    <VcardShell title="Blog">
      <VcardBlogList />
    </VcardShell>
  );
}
