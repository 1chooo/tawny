import clsx from "clsx";

type CalloutVariant = "tip" | "note" | "warning";

const labels: Record<CalloutVariant, string> = {
  tip: "Tip",
  note: "Note",
  warning: "Warning",
};

const styles: Record<CalloutVariant, string> = {
  tip: "border-art-accent bg-art-accent-soft/40",
  note: "border-art-border bg-art-surface",
  warning: "border-art-ink-muted/40 bg-art-surface",
};

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
};

export function Callout({
  variant = "note",
  title,
  children,
}: CalloutProps) {
  return (
    <aside
      className={clsx(
        "my-8 rounded-lg border-l-4 px-5 py-4",
        styles[variant],
      )}
    >
      <p className="text-art-ink mb-2 text-xs font-bold uppercase tracking-[0.12em]">
        {title ?? labels[variant]}
      </p>
      <div className="text-art-ink text-base leading-relaxed [&>p:last-child]:mb-0 [&>p]:mb-3">
        {children}
      </div>
    </aside>
  );
}
