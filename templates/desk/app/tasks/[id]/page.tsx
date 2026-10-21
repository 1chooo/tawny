"use client";

import { useParams } from "next/navigation";
import { TaskDetail } from "@/components/views/task-detail";

export default function TaskPage() {
  const params = useParams<{ id: string }>();
  return <TaskDetail key={params.id} id={params.id} />;
}
