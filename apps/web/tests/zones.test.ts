import { afterEach, describe, expect, it } from "vitest";

import {
  ONBOARDING_ZONES,
  findZoneAtPosition,
  isPositionInsideZone,
} from "@/features/zones/zones";
import { PLAYER_SPAWN_POSITION } from "@/features/player/player-config";
import { useWorldStore } from "@/stores/world-store";

afterEach(() => {
  useWorldStore.getState().setCurrentZone(null);
});

describe("onboarding zones", () => {
  it("defines six unique compact factory zones", () => {
    const ids = ONBOARDING_ZONES.map((zone) => zone.id);

    expect(ONBOARDING_ZONES).toHaveLength(6);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("detects the welcome plaza at the player spawn", () => {
    expect(findZoneAtPosition({ x: PLAYER_SPAWN_POSITION[0], z: PLAYER_SPAWN_POSITION[2] })).toBe(
      "welcome-plaza",
    );
  });

  it("detects the center of every configured zone", () => {
    for (const zone of ONBOARDING_ZONES) {
      const center = {
        x: (zone.bounds.minX + zone.bounds.maxX) / 2,
        z: (zone.bounds.minZ + zone.bounds.maxZ) / 2,
      };

      expect(findZoneAtPosition(center)).toBe(zone.id);
    }
  });

  it("does not overlap configured zone bounds", () => {
    for (const [index, zone] of ONBOARDING_ZONES.entries()) {
      for (const otherZone of ONBOARDING_ZONES.slice(index + 1)) {
        const overlaps =
          zone.bounds.minX <= otherZone.bounds.maxX &&
          zone.bounds.maxX >= otherZone.bounds.minX &&
          zone.bounds.minZ <= otherZone.bounds.maxZ &&
          zone.bounds.maxZ >= otherZone.bounds.minZ;

        expect(overlaps, `${zone.id} overlaps ${otherZone.id}`).toBe(false);
      }
    }
  });

  it("includes zone boundaries and returns null outside the factory floor", () => {
    const welcomeBounds = ONBOARDING_ZONES[0].bounds;

    expect(
      isPositionInsideZone({ x: welcomeBounds.minX, z: welcomeBounds.maxZ }, welcomeBounds),
    ).toBe(true);
    expect(findZoneAtPosition({ x: 14, z: 12 })).toBeNull();
  });

  it("stores the current zone for UI and future context consumers", () => {
    useWorldStore.getState().setCurrentZone("smart-factory");

    expect(useWorldStore.getState().currentZone).toBe("smart-factory");
  });
});
