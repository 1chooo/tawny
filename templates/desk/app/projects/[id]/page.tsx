"use client";

import { useParams } from "next/navigation";
import { ProjectDetail } from "@/components/views/project-detail";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  return <ProjectDetail key={params.id} id={params.id} />;
}
