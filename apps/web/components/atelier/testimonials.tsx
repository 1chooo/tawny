"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sectionVisible, site } from "@/components/atelier/content";
import { sectionPad, sectionTitle, shell } from "./styles";

const arrow =
  "inline-flex size-11 items-center justify-center border border-border transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent";

export function Testimonials() {
  const { testimonials } = site;
  const items = testimonials.items;
  const [index, setIndex] = useState(0);

  if (!sectionVisible(testimonials.visible, items)) return null;

  const current = Math.min(index, items.length - 1);
  const item = items[current];

  return (
    <section className="border-t border-border">
      <div className={`${shell} ${sectionPad}`}>
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            {testimonials.sample ? (
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Sample
              </p>
            ) : null}
            <h2 className={`${sectionTitle} mt-3`}>{testimonials.title}</h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className={arrow}
              aria-label="Previous testimonial"
              disabled={current === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className={arrow}
              aria-label="Next testimonial"
              disabled={current === items.length - 1}
              onClick={() =>
                setIndex((value) => Math.min(items.length - 1, value + 1))
              }
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <figure
          aria-live="polite"
          aria-atomic="true"
          className="mt-10 border border-border p-8 md:p-12"
        >
          <blockquote className="text-xl leading-relaxed break-words md:text-2xl">
            {item.quote}
          </blockquote>
          <figcaption className="mt-8 text-sm">
            <span className="break-words">{item.author}</span>
            {item.detail?.trim() ? (
              <span className="mt-1 block break-words text-muted-foreground">
                {item.detail}
              </span>
            ) : null}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
