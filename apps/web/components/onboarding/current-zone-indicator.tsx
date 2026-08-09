"use client";

import { ONBOARDING_ZONE_BY_ID } from "@/features/zones/zones";
import { useWorldStore } from "@/stores/world-store";

export function CurrentZoneIndicator() {
  const currentZone = useWorldStore((state) => state.currentZone);
  const zone = currentZone ? ONBOARDING_ZONE_BY_ID[currentZone] : null;

  return (
    <div className="current-zone-indicator" aria-live="polite">
      <span>CURRENT ZONE</span>
      <strong style={zone ? { color: zone.accent } : undefined}>{zone?.title ?? "Connecting..."}</strong>
    </div>
  );
}
