import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/sign-in-form";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Sign in — Jane Mug",
  description: "Sign in to your Jane Mug account.",
};

export default function LoginPage() {
  return (
    <SplitShell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </SplitShell>
  );
}
