import { cn } from "@tawny/ui/lib/utils";
import { SalesBoard } from "@/components/mug/sales-board";
import { STUDIO_EMAIL } from "@/components/mug/sales";
import { TopBar } from "@/components/mug/top-bar";

/**
 * Jane Mug sales dashboard. `fill` stretches it to the viewport for the live
 * demo. The catalog preview leaves it at content height so the crop is the
 * first screen, not a full viewport of empty card.
 */
export function AdminFrame({ fill = false }: { fill?: boolean }) {
  return (
    <div className="@container">
      <div
        className={cn("bg-background p-3 @sm:p-4 @md:p-6", fill && "min-h-dvh")}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] flex-col border border-foreground bg-card",
            fill &&
              "min-h-[calc(100dvh-1.5rem)] @sm:min-h-[calc(100dvh-2rem)] @md:min-h-[calc(100dvh-3rem)]",
          )}
        >
          <TopBar email={STUDIO_EMAIL} />
          <div className="flex min-w-0 flex-1 flex-col gap-8 px-4 py-6 @md:px-6 @lg:px-8 @lg:py-8">
            <SalesBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
