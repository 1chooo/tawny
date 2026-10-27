import { cn } from "@tawny/ui/lib/utils";
import {
  AVERAGE_ORDER_CENTS,
  CANCELLED_COUNT,
  COUPONS,
  CUSTOMERS,
  DISCOUNT_CENTS,
  ORDER_COUNT,
  PENDING_COUNT,
  PIECES,
  REVENUE_CENTS,
  SERIES,
  TOP_PIECES,
  formatCents,
} from "@/components/mug-v2/sales";
import { CustomersTable } from "./customers-table";
import { RankBars } from "./rank-bars";
import { RestockQueue } from "./restock-queue";
import { RevenueChart } from "./revenue-chart";
import { SellerRadar } from "./seller-radar";

function axisLabel(name: string) {
  return name.length > 14 ? `${name.slice(0, 13)}…` : name;
}

function BoardCard({
  id,
  title,
  note,
  children,
  className,
}: {
  id?: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex scroll-mt-6 flex-col gap-4 border border-border bg-background p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {note ? <p className="font-mono text-xs text-muted-foreground">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
  note,
  flag,
}: {
  label: string;
  value: string;
  note: string;
  flag?: string;
}) {
  return (
    <section className="flex flex-col gap-2 border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        {flag ? (
          <span className="bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase">
            {flag}
          </span>
        ) : null}
      </div>
      <p className="font-display text-4xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="font-mono text-xs text-muted-foreground">{note}</p>
    </section>
  );
}

function Shortcut({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col gap-2 border border-border bg-background p-3 hover:border-foreground sm:p-4"
    >
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
        {label}
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
        {value}
      </span>
    </a>
  );
}

function OrderMix({
  fulfilled,
  pending,
  cancelled,
}: {
  fulfilled: number;
  pending: number;
  cancelled: number;
}) {
  const total = fulfilled + pending + cancelled;
  const parts = [
    { label: "Fulfilled", count: fulfilled },
    { label: "Awaiting", count: pending },
    { label: "Cancelled", count: cancelled },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-2 bg-muted" aria-hidden>
        {fulfilled > 0 ? (
          <div
            className="h-full bg-foreground"
            style={{ width: `${(fulfilled / total) * 100}%` }}
          />
        ) : null}
        {pending > 0 ? (
          <div
            className="h-full bg-primary"
            style={{ width: `${(pending / total) * 100}%` }}
          />
        ) : null}
      </div>
      <ul className="grid grid-cols-3 gap-2 text-center">
        {parts.map((part) => (
          <li key={part.label}>
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {part.label}
            </p>
            <p className="font-display text-2xl font-semibold tabular-nums">
              {part.count}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SalesBoard() {
  const active = PIECES.filter((piece) => piece.active);
  const low = active.filter((piece) => piece.stock <= 3);
  const pending = Math.min(PENDING_COUNT, ORDER_COUNT);
  const fulfilled = ORDER_COUNT - pending;

  return (
    <>
      <h1 id="sales" className="sr-only">
        Sales
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
          <BoardCard title="Overview" note="by revenue">
            <SellerRadar
              data={TOP_PIECES.map((piece) => ({
                label: axisLabel(piece.name),
                name: piece.name,
                revenue: piece.revenueCents,
              }))}
            />
            <RankBars
              data={TOP_PIECES.map((piece) => ({
                label: piece.name,
                value: piece.revenueCents,
                display: `${formatCents(piece.revenueCents)} · ${piece.units}`,
              }))}
            />
          </BoardCard>
          <div className="flex flex-col justify-between gap-6 bg-primary p-6 text-primary-foreground">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs tracking-widest uppercase opacity-70">
                Catalog
              </p>
              <p className="font-display text-3xl font-semibold tracking-tight">
                Add a piece
              </p>
            </div>
            <span className="inline-flex h-10 w-fit items-center bg-background px-4 text-sm font-medium text-foreground">
              New piece
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <BoardCard title="Revenue by day" note="Last 30 days · net of discounts">
            <RevenueChart data={SERIES} className="h-80" />
          </BoardCard>
          <div className="grid grid-cols-3 gap-4">
            <Shortcut href="#restock" label="Pieces" value={String(active.length)} />
            <Shortcut href="#orders" label="Awaiting" value={String(pending)} />
            <Shortcut href="#restock" label="Low stock" value={String(low.length)} />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-3">
          <StatCard
            label="Revenue"
            value={formatCents(REVENUE_CENTS)}
            note={`${ORDER_COUNT} orders · avg ${formatCents(AVERAGE_ORDER_CENTS)}`}
          />
          <StatCard
            label="Awaiting payment"
            value={String(pending)}
            note={
              CANCELLED_COUNT
                ? `${CANCELLED_COUNT} cancelled`
                : "none cancelled"
            }
            flag={pending > 0 ? "Awaiting" : undefined}
          />
          <BoardCard id="orders" title="Orders">
            <OrderMix
              fulfilled={fulfilled}
              pending={pending}
              cancelled={CANCELLED_COUNT}
            />
          </BoardCard>
          <BoardCard id="restock" title="Restock queue" note="3 or fewer left">
            <RestockQueue pieces={active} />
          </BoardCard>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <BoardCard
          title="Coupon performance"
          note={`${formatCents(DISCOUNT_CENTS)} given`}
        >
          <RankBars
            data={COUPONS.map((coupon) => ({
              label: coupon.code,
              value: coupon.uses,
              display: `${coupon.uses} uses · −${formatCents(coupon.discountCents)}`,
            }))}
          />
        </BoardCard>
        <BoardCard title="Customers" note={`${CUSTOMERS.length} accounts`}>
          <CustomersTable />
        </BoardCard>
      </div>
    </>
  );
}
