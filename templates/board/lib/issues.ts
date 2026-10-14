export type Status = "todo" | "progress" | "done";

export type Issue = {
  id: string;
  title: string;
  status: Status;
  label: string;
  assignee: string;
  date: string;
};

export const issues: Issue[] = [
  { id: "NOR-140", title: "Fix focus ring on command palette", status: "progress", label: "Bug", assignee: "SC", date: "Sep 1" },
  { id: "NOR-141", title: "Migrate billing webhooks to v2", status: "progress", label: "Infra", assignee: "MK", date: "Sep 1" },
  { id: "NOR-142", title: "Empty state for archived projects", status: "todo", label: "Design", assignee: "JR", date: "Sep 2" },
  { id: "NOR-143", title: "Keyboard shortcut cheat sheet", status: "todo", label: "Feature", assignee: "AL", date: "Sep 2" },
  { id: "NOR-144", title: "Onboarding checklist drop-off", status: "progress", label: "Design", assignee: "TP", date: "Sep 3" },
  { id: "NOR-145", title: "Rate limit on search endpoint", status: "todo", label: "Infra", assignee: "MK", date: "Sep 3" },
  { id: "NOR-146", title: "Dark mode contrast on badges", status: "done", label: "Bug", assignee: "SC", date: "Sep 4" },
  { id: "NOR-147", title: "Bulk edit for labels", status: "todo", label: "Feature", assignee: "AL", date: "Sep 4" },
  { id: "NOR-148", title: "Sidebar collapse animation jank", status: "progress", label: "Bug", assignee: "JR", date: "Sep 5" },
  { id: "NOR-149", title: "Export issues to CSV", status: "todo", label: "Feature", assignee: "TP", date: "Sep 5" },
  { id: "NOR-150", title: "Retry failed webhook deliveries", status: "done", label: "Infra", assignee: "MK", date: "Sep 6" },
  { id: "NOR-151", title: "Mobile row height too tall", status: "todo", label: "Bug", assignee: "SC", date: "Sep 6" },
  { id: "NOR-152", title: "Snooze notifications", status: "todo", label: "Feature", assignee: "AL", date: "Sep 7" },
  { id: "NOR-153", title: "Cycle burndown rounding bug", status: "done", label: "Bug", assignee: "JR", date: "Sep 7" },
];
