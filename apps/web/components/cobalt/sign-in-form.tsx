"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Field, SubmitButton } from "./field";

export function SignInForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : null;
  const studio = next?.startsWith("/admin") ?? false;
  const [note, setNote] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNote("This starter keeps you on the page. It does not open a session.");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {studio ? (
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Studio admin
          </p>
        ) : null}
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          {studio
            ? "Sign in with your studio account to open the dashboard."
            : "Sign in to your Jane Mug account."}
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {note ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
        ) : null}
        <SubmitButton pending={false}>Sign in</SubmitButton>
      </form>
      <p className="text-sm text-muted-foreground">
        New here?{" "}
        <button
          type="button"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Create an account
        </button>
      </p>
    </div>
  );
}
