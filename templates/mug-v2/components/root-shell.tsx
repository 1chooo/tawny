"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CartProvider } from "./cart-provider";
import { PortalContext } from "./portal";

export function RootShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={node}>
      <div ref={setNode} className={cn("mug-v2 min-h-dvh", className)}>
        <CartProvider>{children}</CartProvider>
      </div>
    </PortalContext.Provider>
  );
}
