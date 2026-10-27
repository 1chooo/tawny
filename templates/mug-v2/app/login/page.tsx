import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/sign-in-form";
import { SiteShell } from "@/components/site-shell";
import { shell } from "@/components/styles";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Jane Mug account.",
};

export default function LoginPage() {
  return (
    <SiteShell>
      <div className={`${shell} py-20 md:py-28`}>
        <div className="mx-auto w-full max-w-md border border-border p-8 md:p-10">
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">Loading the form…</p>
            }
          >
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </SiteShell>
  );
}
