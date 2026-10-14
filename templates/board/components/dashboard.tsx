"use client";

import { useState } from "react";
import { issues, type Status } from "@/lib/issues";

const COMMANDS = [
  { name: "Set priority", shortcut: "P" },
  { name: "Create issue", shortcut: "C" },
  { name: "Assign to me", shortcut: "I" },
  { name: "Search", shortcut: "/" },
  { name: "Toggle sidebar", shortcut: "⌘B" },
];

const NAV = [
  ["Inbox", "3"],
  ["My issues", ""],
  ["Views", ""],
  ["Projects", ""],
  ["Cycles", ""],
] as const;

function StatusIcon({ status }: { status: Status }) {
  const color = "var(--muted-foreground)";
  if (status === "done") {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M5 8.2 7.1 10.2 11 6.1" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "progress") {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M8 2.2a5.8 5.8 0 0 1 0 11.6Z" fill={color} />
      </svg>
    );
  }
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-foreground/5 px-1 font-sans text-[10px] leading-none text-muted-foreground">
      {children}
    </kbd>
  );
}

export function Dashboard() {
  const [selectedId, setSelectedId] = useState("NOR-142");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div
      className="flex h-dvh min-h-[36rem] bg-background text-foreground"
      onKeyDown={(event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          setPaletteOpen((open) => !open);
        }
        if (event.key === "Escape") setPaletteOpen(false);
      }}
    >
      <aside className="flex w-[180px] shrink-0 flex-col border-r border-border">
        <div className="flex items-center gap-2 px-3 py-3">
          <span className="flex size-5 items-center justify-center rounded bg-foreground/8 text-[10px] font-semibold">
            N
          </span>
          <span className="truncate text-[12px]">Northstar</span>
        </div>
        <nav className="flex flex-col gap-0.5 px-2 text-[12px] text-muted-foreground">
          {NAV.map(([label, count]) => (
            <div key={label} className="flex items-center rounded-md px-2 py-1">
              <span className="truncate">{label}</span>
              {count ? <span className="ml-auto text-[10px]">{count}</span> : null}
            </div>
          ))}
        </nav>
        <div className="mt-3 px-3 text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
          TEAMS
        </div>
        <div className="mt-1 flex flex-col gap-0.5 px-2 pb-2 text-[12px]">
          <div className="px-2 py-1 text-muted-foreground">Frontend</div>
          <div className="rounded-md bg-accent px-2 py-1">Issues</div>
          <div className="px-2 py-1 text-muted-foreground">Backlog</div>
        </div>
        <div className="mt-auto flex items-center gap-2 px-3 py-3 text-[11px] text-muted-foreground">
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground/8 text-[9px] text-foreground">
            SC
          </span>
          <span className="truncate">{"{{AUTHOR_NAME}}"}</span>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col bg-card">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 text-[13px]">
            Active issues
            <span className="rounded bg-foreground/8 px-1.5 text-[11px] text-muted-foreground">
              {issues.length}
            </span>
          </div>
          <button
            type="button"
            aria-expanded={paletteOpen}
            onClick={() => setPaletteOpen((open) => !open)}
            className="inline-flex items-center rounded-md border border-border px-1.5 py-1 text-[11px]"
          >
            Search
            <Kbd>⌘K</Kbd>
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-md border border-border px-2 py-1 text-[12px]">
              Filter
              <Kbd>F</Kbd>
            </span>
            <span className="inline-flex items-center rounded-md border border-border px-2 py-1 text-[12px]">
              Display
              <Kbd>D</Kbd>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="inline-flex items-center rounded-md bg-tawny px-2.5 py-1 text-[12px] font-medium text-tawny-foreground"
          >
            + New issue
            <Kbd>C</Kbd>
          </button>
        </div>

        <div role="listbox" aria-label="Active issues" className="min-h-0 flex-1 overflow-auto">
          {issues.map((issue) => {
            const selected = issue.id === selectedId;
            const hot = issue.id === hoveredId && !selected;
            return (
              <button
                key={issue.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => setSelectedId(issue.id)}
                onMouseEnter={() => setHoveredId(issue.id)}
                onMouseLeave={() =>
                  setHoveredId((current) => (current === issue.id ? null : current))
                }
                className="grid w-full grid-cols-[16px_3.5rem_minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-2 text-left text-[13px] tracking-[-0.01em]"
                style={{
                  height: 32,
                  background: selected
                    ? "color-mix(in srgb, var(--tawny) 28%, transparent)"
                    : hot
                      ? "var(--accent)"
                      : "transparent",
                  boxShadow: selected ? "inset 2px 0 0 var(--tawny)" : undefined,
                }}
              >
                <StatusIcon status={issue.status} />
                <span className="text-muted-foreground">{issue.id}</span>
                <span className="truncate">{issue.title}</span>
                <span className="w-14 text-right text-muted-foreground">{issue.label}</span>
                <span className="w-6 text-right text-muted-foreground">{issue.assignee}</span>
                <span className="w-10 text-right text-muted-foreground tabular-nums">{issue.date}</span>
              </button>
            );
          })}
        </div>

        {paletteOpen ? (
          <div className="absolute inset-x-2 top-12 z-10 overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border px-3 py-2 text-[13px] text-muted-foreground">
              Type a command
            </div>
            <ul className="py-1">
              {COMMANDS.map((command, index) => (
                <li
                  key={command.name}
                  className="flex items-center justify-between px-3 py-1.5 text-[13px]"
                  style={{ background: index === 0 ? "var(--accent)" : "transparent" }}
                >
                  <span>{command.name}</span>
                  <Kbd>{command.shortcut}</Kbd>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
