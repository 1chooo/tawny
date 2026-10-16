import { VcardProjectList } from "@/components/project-list";
import { VcardShell } from "@/components/shell";

export default function ProjectPage() {
  return (
    <VcardShell title="Project">
      <VcardProjectList />
    </VcardShell>
  );
}
