"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Bell,
  CircleUser,
  FolderKanban,
  Inbox,
  LayoutGrid,
  Repeat,
  Search,
} from "lucide-react";

/**
 * Cumulative replica of the five decisions in Design Motion's
 * "Reverse-Engineered Linear" walkthrough.
 *
 * Loose rows are 56px, dense rows are 32px. The list viewport is 14 × 32 = 448,
 * which is also 8 × 56, so the first decision reveals six more issues in place.
 */

type Status = "todo" | "progress" | "done";
type Priority = "low" | "medium" | "high";
type Label = "Bug" | "Infra" | "Design" | "Feature";

type Issue = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  label: Label;
  assignee: string;
  date: string;
};

const ISSUES: Issue[] = [
  { id: "NOR-140", title: "Fix focus ring on command palette", status: "progress", priority: "high", label: "Bug", assignee: "SC", date: "Sep 1" },
  { id: "NOR-141", title: "Migrate billing webhooks to v2", status: "progress", priority: "high", label: "Infra", assignee: "MK", date: "Sep 1" },
  { id: "NOR-142", title: "Empty state for archived projects", status: "todo", priority: "medium", label: "Design", assignee: "JR", date: "Sep 2" },
  { id: "NOR-143", title: "Keyboard shortcut cheat sheet", status: "todo", priority: "low", label: "Feature", assignee: "AL", date: "Sep 2" },
  { id: "NOR-144", title: "Onboarding checklist drop-off", status: "progress", priority: "medium", label: "Design", assignee: "TP", date: "Sep 3" },
  { id: "NOR-145", title: "Rate limit on search endpoint", status: "todo", priority: "high", label: "Infra", assignee: "MK", date: "Sep 3" },
  { id: "NOR-146", title: "Dark mode contrast on badges", status: "done", priority: "medium", label: "Bug", assignee: "SC", date: "Sep 4" },
  { id: "NOR-147", title: "Bulk edit for labels", status: "todo", priority: "low", label: "Feature", assignee: "AL", date: "Sep 4" },
  { id: "NOR-148", title: "Sidebar collapse animation jank", status: "progress", priority: "medium", label: "Bug", assignee: "JR", date: "Sep 5" },
  { id: "NOR-149", title: "Export issues to CSV", status: "todo", priority: "low", label: "Feature", assignee: "TP", date: "Sep 5" },
  { id: "NOR-150", title: "Retry failed webhook deliveries", status: "done", priority: "high", label: "Infra", assignee: "MK", date: "Sep 6" },
  { id: "NOR-151", title: "Mobile row height too tall", status: "todo", priority: "medium", label: "Bug", assignee: "SC", date: "Sep 6" },
  { id: "NOR-152", title: "Snooze notifications", status: "todo", priority: "low", label: "Feature", assignee: "AL", date: "Sep 7" },
  { id: "NOR-153", title: "Cycle burndown rounding bug", status: "done", priority: "medium", label: "Bug", assignee: "JR", date: "Sep 7" },
];

const DENSE_ROW = 32;
const LOOSE_ROW = 56;
const VIEWPORT = DENSE_ROW * ISSUES.length;

const CANVAS = "var(--background)";
const SURFACE = "var(--card)";
const HOVER = "var(--accent)";
const ACCENT = "var(--tawny)";
const HAIRLINE = "var(--border)";
const SNAP = "cubic-bezier(.25,.46,.45,.94)";
const BOUNCE = "cubic-bezier(.34,1.56,.64,1)";

const STATUS_COLOR: Record<Status, string> = {
  todo: "#3B82F6",
  progress: "#EAB308",
  done: "#22C55E",
};

const STATUS_LABEL: Record<Status, string> = {
  todo: "Todo",
  progress: "In progress",
  done: "Done",
};

const PRIORITY_COLOR: Record<Priority, string> = {
  high: "#EF4444",
  medium: "#F97316",
  low: "#94A3B8",
};

const LABEL_COLOR: Record<Label, string> = {
  Bug: "#A855F7",
  Infra: "#2563EB",
  Design: "#F97316",
  Feature: "#22C55E",
};

const STEPS = [
  {
    id: 0,
    label: "Before",
    kicker: "BEFORE",
    title: "The same list, before the decisions.",
    chip: "56 px rows · seven colors · drop shadow",
  },
  {
    id: 1,
    label: "Density",
    kicker: "DECISION 01 · DENSITY",
    title: "Density reads as competence.",
    chip: "13 px · 32 px rows · -0.01em",
  },
  {
    id: 2,
    label: "Borders",
    kicker: "DECISION 02 · BORDERS",
    title: "Borders, not shadows.",
    chip: "box-shadow: none · 1 px at 8%",
  },
  {
    id: 3,
    label: "One color",
    kicker: "DECISION 03 · ONE COLOR",
    title: "One color. Everything else grey.",
    chip: "1 brand color · icons for status",
  },
  {
    id: 4,
    label: "Keyboard",
    kicker: "DECISION 04 · KEYBOARD",
    title: "The UI answers first.",
    chip: "80 ms hover · 150 ms max · 0 overshoot",
  },
  {
    id: 5,
    label: "Alignment",
    kicker: "DECISION 05 · ALIGNMENT",
    title: "Invisible when right.",
    chip: "4 px grid · 16 px icons · numbers right",
  },
] as const;

const COMMANDS = [
  { name: "Set priority", shortcut: "P" },
  { name: "Create issue", shortcut: "C" },
  { name: "Assign to me", shortcut: "I" },
  { name: "Search", shortcut: "/" },
  { name: "Toggle sidebar", shortcut: "⌘B" },
];

const COLLAPSED_HUES = ["#3B82F6", "#EAB308", "#22C55E", "#EF4444", "#F97316", "#A855F7", "#2563EB"];

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-foreground/5 px-1 font-sans text-[10px] leading-none text-muted-foreground">
      {children}
    </kbd>
  );
}

function StatusIcon({ status, size }: { status: Status; size: number }) {
  const color = "var(--muted-foreground)";
  if (status === "done") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M5 8.2 7.1 10.2 11 6.1" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "progress") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M8 2.2a5.8 5.8 0 0 1 0 11.6Z" fill={color} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Pill({ color, dense, children }: { color: string; dense: boolean; children: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full font-medium leading-none"
      style={{
        background: `${color}26`,
        color,
        fontSize: dense ? 10 : 11,
        padding: dense ? "3px 6px" : "4px 8px",
      }}
    >
      {children}
    </span>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <div className="mx-auto mt-3 w-fit rounded-full border border-tawny/35 bg-tawny/12 px-3 py-1 text-center text-[11px] font-medium text-tawny">
      {children}
    </div>
  );
}

const STAGE_INDEX = {
  before: 0,
  density: 1,
  borders: 2,
  "one-color": 3,
  keyboard: 4,
  alignment: 5,
} as const;

type StageName = keyof typeof STAGE_INDEX;

export function LinearUxStage({
  stage,
  presentation = "lesson",
}: {
  stage: StageName;
  /** `product` locks the finished alignment dashboard and drops the lesson chrome. */
  presentation?: "lesson" | "product";
}) {
  const product = presentation === "product";
  const step = product ? STAGE_INDEX.alignment : STAGE_INDEX[stage];
  const [selectedId, setSelectedId] = useState("NOR-142");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(step === 4);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dense = step >= 1;
  const flat = step >= 2;
  const mono = step >= 3;
  const keys = step >= 4;
  const aligned = step >= 5;
  const meta = STEPS[step] ?? STEPS[0];
  const hoverMs = keys ? 80 : 300;
  const moveMs = keys ? 150 : 300;

  const filtered = COMMANDS.filter((command) =>
    command.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function rowBackground(id: string) {
    const selected = id === selectedId;
    const hot = id === hoveredId && !selected;
    if (selected && mono) return "color-mix(in srgb, var(--tawny) 28%, transparent)";
    if (selected) return "color-mix(in srgb, #3B82F6 22%, transparent)";
    if (hot && flat) return HOVER;
    if (hot) return "color-mix(in srgb, var(--foreground) 6%, transparent)";
    return "transparent";
  }

  return (
    <div
      data-testid="linear-ux-demo"
      data-writeup-stage={product ? undefined : ""}
      data-step={step}
      className={
        product
          ? "flex h-full min-h-0 w-full flex-col overflow-hidden bg-background font-sans text-foreground antialiased"
          : "my-8 w-full overflow-hidden rounded-xl border border-border bg-background font-sans text-foreground antialiased"
      }
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        lineHeight: 1.35,
        backgroundImage: product
          ? undefined
          : "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: product ? undefined : "22px 22px",
      }}
      onKeyDown={(event) => {
        if (!keys) return;
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          setPaletteOpen((open) => !open);
        }
        if (event.key === "Escape") setPaletteOpen(false);
      }}
    >
      <div className={product ? "flex h-full min-h-0 flex-col" : "px-3 py-4 sm:px-4"}>
        {product ? null : (
          <div className="mb-3 text-center">
            <div className="mx-auto mb-2 w-fit rounded-full border border-tawny/35 bg-tawny/12 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-tawny">
              {meta.kicker}
            </div>
            <div className="text-[20px] font-semibold tracking-[-0.03em] text-foreground sm:text-[22px]" aria-live="polite">
              {meta.title}
            </div>
          </div>
        )}

        <div
          className={
            product
              ? "flex min-h-0 flex-1 overflow-hidden"
              : "overflow-hidden rounded-xl motion-reduce:transition-none"
          }
          style={{
            background: flat ? CANVAS : SURFACE,
            border: product ? undefined : `1px solid ${HAIRLINE}`,
            boxShadow: product || flat ? "none" : "0 22px 48px color-mix(in srgb, var(--foreground) 16%, transparent)",
            transition: `background-color ${moveMs}ms ${SNAP}, box-shadow ${moveMs}ms ${SNAP}, border-color ${moveMs}ms ${SNAP}`,
          }}
        >
          <div className="flex min-h-0 flex-1 items-stretch">
            <aside
              className={
                product
                  ? "flex w-[180px] shrink-0 flex-col"
                  : "hidden w-[118px] shrink-0 flex-col sm:flex"
              }
              style={{ borderRight: `1px solid ${HAIRLINE}` }}
            >
              <div className="flex items-center gap-2 px-2.5 py-2.5">
                <span className="flex size-5 items-center justify-center rounded bg-foreground/8 text-[10px] font-semibold text-foreground">
                  N
                </span>
                <span className="truncate text-[12px] text-foreground">Northstar</span>
              </div>
              <div className="flex flex-col gap-0.5 px-1.5 text-[12px] text-muted-foreground">
                <SideLink icon={<Inbox size={13} />} label="Inbox" count="3" />
                <SideLink icon={<CircleUser size={13} />} label="My issues" />
                <SideLink icon={<LayoutGrid size={13} />} label="Views" />
                <SideLink icon={<FolderKanban size={13} />} label="Projects" />
                <SideLink icon={<Repeat size={13} />} label="Cycles" />
              </div>
              <div className="mt-3 px-2.5 text-[10px] font-medium tracking-[0.12em] text-muted-foreground">TEAMS</div>
              <div className="mt-1 flex flex-col gap-0.5 px-1.5 pb-2 text-[12px]">
                <div className="px-1.5 py-1 text-muted-foreground">Frontend</div>
                <div className="rounded-md bg-accent px-1.5 py-1 text-foreground">
                  Issues
                </div>
                <div className="px-1.5 py-1 text-muted-foreground">Backlog</div>
              </div>
              <div className="mt-auto flex items-center gap-2 px-2.5 py-2.5 text-[11px] text-muted-foreground">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground/8 text-[9px] text-foreground">SC</span>
                <span className="truncate">Sarah Chen</span>
              </div>
            </aside>

            <div className="relative min-w-0 flex-1" style={{ background: flat ? SURFACE : "transparent" }}>
              <div
                className="flex items-center justify-between gap-2 px-2.5 py-2"
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <div className="flex items-center gap-2 text-[13px] text-foreground">
                  Active issues
                  <span className="rounded bg-foreground/8 px-1.5 text-[11px] text-muted-foreground">{ISSUES.length}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {keys ? (
                    <button
                      type="button"
                      aria-expanded={paletteOpen}
                      aria-label="Search commands"
                      onClick={() => {
                        setQuery("");
                        setPaletteOpen((open) => !open);
                      }}
                      className="inline-flex items-center rounded-md px-1.5 py-1 text-[11px] text-foreground/80"
                      style={{ border: `1px solid ${HAIRLINE}` }}
                    >
                      <Search size={12} />
                      <Kbd>⌘K</Kbd>
                    </button>
                  ) : null}
                  <LayoutGrid size={14} />
                  <Bell size={14} />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center rounded-md px-2 py-1 text-[12px] text-foreground/80"
                    style={{ border: `1px solid ${HAIRLINE}` }}
                  >
                    Filter
                    {keys ? <Kbd>F</Kbd> : null}
                  </span>
                  <span
                    className="inline-flex items-center rounded-md px-2 py-1 text-[12px] text-foreground/80"
                    style={{ border: `1px solid ${HAIRLINE}` }}
                  >
                    Display
                    {keys ? <Kbd>D</Kbd> : null}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!keys) return;
                    setQuery("Create");
                    setPaletteOpen(true);
                  }}
                  className="inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-medium motion-reduce:transition-none motion-reduce:hover:transform-none"
                  style={{
                    background: mono ? ACCENT : "#3B82F6",
                    color: mono ? "var(--tawny-foreground)" : "#fff",
                    boxShadow: flat ? "none" : "0 8px 18px color-mix(in srgb, #3B82F6 40%, transparent)",
                    transition: keys
                      ? `background-color ${hoverMs}ms ${SNAP}, box-shadow ${moveMs}ms ${SNAP}, transform ${moveMs}ms ${SNAP}`
                      : `background-color 300ms ${BOUNCE}, box-shadow 300ms ease, transform 300ms ${BOUNCE}`,
                  }}
                  onMouseEnter={(event) => {
                    if (!keys) event.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  + New issue
                  {keys ? <Kbd>C</Kbd> : null}
                </button>
              </div>

              <div className="relative overflow-hidden" style={{ height: VIEWPORT }} data-viewport={VIEWPORT}>
                <div role="listbox" aria-label="Active issues">
                  {ISSUES.map((issue) => {
                    const selected = issue.id === selectedId;
                    return (
                      <button
                        key={issue.id}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        title={issue.title}
                        onClick={() => setSelectedId(issue.id)}
                        onMouseEnter={() => setHoveredId(issue.id)}
                        onMouseLeave={() => setHoveredId((current) => (current === issue.id ? null : current))}
                        className="flex w-full min-w-0 text-left motion-reduce:transition-none"
                        style={{
                          height: dense ? DENSE_ROW : LOOSE_ROW,
                          fontSize: dense ? 13 : 15,
                          letterSpacing: dense ? "-0.01em" : "0em",
                          background: rowBackground(issue.id),
                          boxShadow: selected && mono ? `inset 2px 0 0 ${ACCENT}` : undefined,
                          color: "var(--foreground)",
                          gap: aligned ? 8 : 6,
                          padding: aligned ? "0 8px" : "0 13px",
                          alignItems: "center",
                          transition: `height ${moveMs}ms ${SNAP}, background-color ${hoverMs}ms ${SNAP}, font-size ${moveMs}ms ${SNAP}, letter-spacing ${moveMs}ms ${SNAP}`,
                        }}
                      >
                        <span
                          className="inline-flex shrink-0 items-center justify-center"
                          style={{
                            width: mono ? (aligned ? 16 : 14) : undefined,
                            height: mono ? (aligned ? 16 : 14) : undefined,
                            transform: aligned ? undefined : "translateY(2px)",
                          }}
                        >
                          {mono ? (
                            <StatusIcon status={issue.status} size={aligned ? 16 : 14} />
                          ) : (
                            <Pill color={STATUS_COLOR[issue.status]} dense={dense}>
                              {STATUS_LABEL[issue.status]}
                            </Pill>
                          )}
                        </span>
                        {mono ? null : (
                          <Pill color={PRIORITY_COLOR[issue.priority]} dense={dense}>
                            {issue.priority[0].toUpperCase() + issue.priority.slice(1)}
                          </Pill>
                        )}
                        <span className={aligned ? "w-14 shrink-0 text-muted-foreground" : "shrink-0 text-muted-foreground"}>{issue.id}</span>
                        <span className={aligned ? "min-w-0 flex-1 truncate" : "min-w-0 max-w-[24%] truncate sm:max-w-[32%]"}>
                          {issue.title}
                        </span>
                        {mono ? (
                          <span className={aligned ? "w-14 shrink-0 text-right text-muted-foreground" : "shrink-0 text-muted-foreground"}>{issue.label}</span>
                        ) : (
                          <Pill color={LABEL_COLOR[issue.label]} dense={dense}>
                            {issue.label}
                          </Pill>
                        )}
                        <span className={aligned ? "w-6 shrink-0 text-right text-muted-foreground" : "shrink-0 text-muted-foreground"}>
                          {issue.assignee}
                        </span>
                        <span className={aligned ? "w-10 shrink-0 text-right text-muted-foreground tabular-nums" : "shrink-0 text-muted-foreground"}>
                          {issue.date}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {paletteOpen && keys ? (
                <div
                  data-testid="command-palette"
                  className="absolute inset-x-2 top-12 z-10 overflow-hidden rounded-lg"
                  style={{ background: "var(--popover)", border: `1px solid ${HAIRLINE}` }}
                >
                  <div className="flex items-center gap-2 px-3" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                    <Search size={14} className="text-muted-foreground" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Type a command"
                      aria-label="Command palette"
                      className="h-9 w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <ul className="py-1">
                    {filtered.length === 0 ? (
                      <li className="px-3 py-2 text-[13px] text-muted-foreground">No matches</li>
                    ) : (
                      filtered.map((command, index) => (
                        <li key={command.name}>
                          <div
                            className="flex items-center justify-between px-3 py-1.5 text-[13px]"
                            style={{ background: index === 0 ? "var(--accent)" : "transparent" }}
                          >
                            <span>{command.name}</span>
                            <Kbd>{command.shortcut}</Kbd>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {product ? null : (
          <>
            <Annotation step={step} dense={dense} />
            <Chip>{meta.chip}</Chip>
          </>
        )}
      </div>
    </div>
  );
}

function SideLink({ icon, label, count }: { icon: ReactNode; label: string; count?: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
      <span className="text-muted-foreground">{icon}</span>
      <span className="truncate">{label}</span>
      {count ? <span className="ml-auto text-[10px] text-muted-foreground">{count}</span> : null}
    </div>
  );
}

function Annotation({ step, dense }: { step: number; dense: boolean }) {
  if (step === 0) {
    return (
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        Eight of fourteen rows fit. The other six sit below this viewport.
      </p>
    );
  }

  if (step === 1) {
    return (
      <div className="mt-3">
        <Chip>14 rows, same height</Chip>
        <div
          className="mt-2 flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: SURFACE, border: `1px solid ${HAIRLINE}` }}
        >
          <div>
            <div className="text-[10px] tracking-[0.12em] text-muted-foreground">LETTER SPACING</div>
            <div className="text-[14px] text-foreground" style={{ letterSpacing: dense ? "-0.01em" : "0em" }}>
              Migrate billing webhooks to v2
            </div>
          </div>
          <span className="text-[12px] text-muted-foreground">-0.01em</span>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const rows = [
      ["canvas · background", CANVAS, "background"],
      ["list · card", SURFACE, "card"],
      ["hover · accent", HOVER, "accent"],
    ] as const;
    return (
      <div className="mt-3 space-y-1.5">
        {rows.map(([label, value, token]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md px-3 py-1.5 text-[12px]"
            style={{ background: value, border: `1px solid ${HAIRLINE}` }}
          >
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono text-[11px] text-foreground">{token}</span>
          </div>
        ))}
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="mt-3">
        <div className="grid grid-cols-8 gap-1.5">
          {COLLAPSED_HUES.map((hue) => (
            <div key={hue} className="text-center">
              <div className="mx-auto size-5 rounded-md bg-muted" title={hue} />
              <div className="mt-1 text-[9px] text-muted-foreground">grey</div>
            </div>
          ))}
          <div className="text-center">
            <div className="mx-auto size-5 rounded-md bg-tawny" />
            <div className="mt-1 text-[9px] text-foreground">tawny</div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="mt-3 space-y-2 rounded-lg px-3 py-2.5" style={{ background: SURFACE, border: `1px solid ${HAIRLINE}` }}>
        <Meter label="hover" ms={80} max={300} />
        <Meter label="transition" ms={150} max={300} />
        <Meter label="generic" ms={300} max={300} muted />
        <div className="flex justify-end gap-3 pt-1 text-[11px]">
          <span className="text-destructive">bouncy</span>
          <span className="text-tawny">snappy</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-lg px-3 py-2.5" style={{ background: SURFACE, border: `1px solid ${HAIRLINE}` }}>
      <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.12em] text-tawny">
        <span>×2 · ONE ROW</span>
        <span>aligned</span>
      </div>
      <div className="flex items-center gap-2 text-[13px] text-foreground">
        <StatusIcon status="todo" size={16} />
        <span className="text-muted-foreground">NOR-147</span>
        <span className="min-w-0 flex-1 truncate">Bulk edit for labels</span>
        <span className="text-muted-foreground">Feature</span>
        <span className="text-muted-foreground">AL</span>
        <span className="text-muted-foreground">Sep 4</span>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-tawny">
        <span>16 px · centered</span>
        <span>left</span>
        <span>right</span>
      </div>
    </div>
  );
}

function Meter({ label, ms, max, muted }: { label: string; ms: number; max: number; muted?: boolean }) {
  return (
    <div className="grid grid-cols-[76px_1fr_48px] items-center gap-2 text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
        <span
          className="block h-full rounded-full"
          style={{ width: `${(ms / max) * 100}%`, background: muted ? "var(--destructive)" : ACCENT }}
        />
      </span>
      <span className={muted ? "text-right text-destructive line-through" : "text-right text-muted-foreground"}>{ms} ms</span>
    </div>
  );
}
