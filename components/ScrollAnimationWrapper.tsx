// components/ScrollAnimationWrapper.tsx
"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function ScrollAnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollAnimation();
  return <>{children}</>;
}