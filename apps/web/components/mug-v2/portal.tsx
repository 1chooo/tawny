"use client";

import { createContext, useContext } from "react";

export const PortalContext = createContext<HTMLElement | null>(null);

export function usePortal() {
  return useContext(PortalContext);
}
