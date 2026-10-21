import { AdminNav } from "./admin-nav";

export function TopBar({ email }: { email: string }) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-foreground px-4 py-4 md:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6">
      <a href="#sales" className="col-start-1 flex shrink-0 items-center gap-2.5">
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-full bg-primary"
        >
          <span className="size-2.5 bg-primary-foreground" />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          Jane Mug
        </span>
      </a>
      <div className="col-span-2 min-w-0 lg:col-span-1 lg:col-start-2">
        <AdminNav />
      </div>
      <div className="col-start-2 row-start-1 flex min-w-0 items-center gap-3 lg:col-start-3">
        <p className="max-w-32 truncate font-mono text-xs text-muted-foreground sm:max-w-48">
          {email}
        </p>
        <button
          type="button"
          className="h-9 shrink-0 border border-foreground px-3 text-sm hover:bg-foreground hover:text-background"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
