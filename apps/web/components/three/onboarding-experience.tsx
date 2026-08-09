"use client";

import dynamic from "next/dynamic";

import { CanvasLoadingFallback } from "./canvas-loading-fallback";

const FactoryCanvas = dynamic(() => import("./factory-canvas"), {
  ssr: false,
  loading: () => <CanvasLoadingFallback />,
});

export function OnboardingExperience() {
  return (
    <section
      className="onboarding-canvas-shell"
      aria-label="X-FACTORY 3D 온보딩 공간"
    >
      <FactoryCanvas />
    </section>
  );
}
