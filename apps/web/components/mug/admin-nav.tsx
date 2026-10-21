import { MugLink } from "./mug-link";
import { BarChart3, Package, Receipt, Store, TicketPercent } from "lucide-react";

const NAV = [
  { label: "Sales", icon: BarChart3, current: true },
  { label: "Products", icon: Package, current: false },
  { label: "Orders", icon: Receipt, current: false },
  { label: "Coupons", icon: TicketPercent, current: false },
  { label: "Shop", icon: Store, current: false },
];

export function AdminNav() {
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto">
      {NAV.map(({ label, icon: Icon, current }) =>
        current ? (
          <MugLink
            key={label}
            href="/admin"
            aria-current="page"
            className="flex shrink-0 items-center gap-2 bg-foreground px-3 py-2 text-sm text-background"
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </MugLink>
        ) : (
          <span
            key={label}
            className="flex shrink-0 items-center gap-2 px-3 py-2 text-sm text-foreground"
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </span>
        ),
      )}
    </nav>
  );
}
