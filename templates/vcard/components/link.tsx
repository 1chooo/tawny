"use client";

import type { ComponentProps } from "react";
import Link from "next/link";

type VcardLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function VcardLink({ href, ...props }: VcardLinkProps) {
  return <Link href={href} {...props} />;
}
