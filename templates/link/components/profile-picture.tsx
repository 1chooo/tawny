"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/links";

export function ProfilePicture() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        className="relative mx-auto mb-4 block size-24 cursor-pointer rounded-full border-0 bg-transparent p-0 shadow-[0_0_0_1px_var(--color-border),0_2px_12px_rgba(46,49,53,0.08)] transition-shadow duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:shadow-[0_0_0_1px_var(--color-rurikon-300),0_4px_16px_rgba(46,49,53,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
        type="button"
        aria-label="View full profile picture"
        onClick={() => setOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatarUrl}
          alt={`${profile.name} profile picture`}
          className="block size-24 rounded-full"
          width={96}
          height={96}
        />
      </button>

      <div
        className={`fixed inset-0 z-2 flex items-center justify-center overflow-hidden bg-[rgba(30,33,37,0.45)] backdrop-blur-xs transition-[opacity,visibility] duration-350 ease-in ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Profile picture popup"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className={`relative m-6 flex w-full max-w-[min(400px,calc(100vw-3rem))] flex-col items-stretch rounded-(--radius) border border-border bg-card shadow-[0_4px_24px_rgba(46,49,53,0.12),inset_0_0_0_1px_rgba(255,255,255,0.8)] transition-[transform,opacity] duration-[350ms,250ms] ease-[cubic-bezier(0.34,1.2,0.64,1),ease] ${
            open ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex w-full overflow-hidden rounded-t-[calc(var(--radius)-1px)]">
            <a
              href={profile.avatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full leading-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} full profile`}
                className="h-auto w-full align-middle"
              />
            </a>
          </div>
          <div className="font-link-serif border-t border-border px-5 pt-4 pb-5 text-center text-[0.9375rem] leading-normal font-normal text-rurikon-600">
            {profile.popupQuote}
          </div>
          <button
            className="absolute -top-3 -right-3 z-4 size-10 cursor-pointer rounded-full border border-border bg-card p-0 text-center text-[1.35rem] leading-[2.4rem] font-normal text-rurikon-600 shadow-[0_2px_8px_rgba(46,49,53,0.1)] transition-[background-color,color,border-color] duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:border-primary hover:bg-primary hover:text-primary-foreground active:bg-rurikon-700 active:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            type="button"
            aria-label="Close popup"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
