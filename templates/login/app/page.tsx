import { Suspense } from "react";
import { SignInForm } from "@/components/sign-in-form";
import { SplitShell } from "@/components/split-shell";

export default function SignInPage() {
  return (
    <SplitShell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </SplitShell>
  );
}
