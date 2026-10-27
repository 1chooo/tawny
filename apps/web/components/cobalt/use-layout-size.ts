"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Content-box size from layout, not from `getBoundingClientRect`.
 * A CSS `transform: scale()` on an ancestor changes the painted box and
 * would otherwise size charts to the thumbnail instead of the desktop frame.
 */
export function useLayoutSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const width = node.clientWidth;
      const height = node.clientHeight;
      setSize((current) =>
        current.width === width && current.height === height
          ? current
          : { width, height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}
