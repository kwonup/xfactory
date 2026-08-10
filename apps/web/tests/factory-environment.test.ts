import { describe, expect, it } from "vitest";

import {
  INDUSTRIAL_DETAIL_COLLIDERS,
  PALLET_LOADS,
  PERIMETER_FENCE_SEGMENTS,
  RETAINING_WALL_SEGMENTS,
  ROAD_CROSSWALKS,
  SAFETY_BOLLARD_POSITIONS,
} from "@/features/environment/industrial-layout";
describe("industrial outdoor factory layout", () => {
  it("defines compact perimeter, road-safety and logistics details", () => {
    expect(PERIMETER_FENCE_SEGMENTS).toHaveLength(6);
    expect(RETAINING_WALL_SEGMENTS).toHaveLength(3);
    expect(ROAD_CROSSWALKS).toHaveLength(4);
    expect(SAFETY_BOLLARD_POSITIONS).toHaveLength(6);
    expect(PALLET_LOADS).toHaveLength(1);

    const detailIds = [
      ...PERIMETER_FENCE_SEGMENTS.map((detail) => detail.id),
      ...RETAINING_WALL_SEGMENTS.map((detail) => detail.id),
      ...ROAD_CROSSWALKS.map((detail) => detail.id),
      ...PALLET_LOADS.map((detail) => detail.id),
    ];

    expect(new Set(detailIds).size).toBe(detailIds.length);
  });

  it("keeps industrial details inside the existing small world", () => {
    const detailPositions = [
      ...PERIMETER_FENCE_SEGMENTS.map((detail) => detail.position),
      ...RETAINING_WALL_SEGMENTS.map((detail) => detail.position),
      ...ROAD_CROSSWALKS.map((detail) => detail.position),
      ...SAFETY_BOLLARD_POSITIONS,
      ...PALLET_LOADS.map((detail) => detail.position),
    ];

    for (const [x, , z] of detailPositions) {
      expect(x).toBeGreaterThanOrEqual(-17);
      expect(x).toBeLessThanOrEqual(17);
      expect(z).toBeGreaterThanOrEqual(-15);
      expect(z).toBeLessThanOrEqual(15);
    }
  });

  it("matches major logistics props with collision coverage", () => {
    const colliderIds = new Set<string>(
      INDUSTRIAL_DETAIL_COLLIDERS.map((collider) => collider.id),
    );

    expect(colliderIds.has("smart-factory-back-wall")).toBe(true);

    for (const palletLoad of PALLET_LOADS) {
      expect(colliderIds.has(palletLoad.id)).toBe(true);
    }
  });

  it("leaves a clear entrance between the south fence segments", () => {
    const southWest = PERIMETER_FENCE_SEGMENTS.find(
      (segment) => segment.id === "fence-south-west",
    );
    const southEast = PERIMETER_FENCE_SEGMENTS.find(
      (segment) => segment.id === "fence-south-east",
    );

    expect(southWest).toBeDefined();
    expect(southEast).toBeDefined();

    const westFenceEnd = southWest!.position[0] + southWest!.length / 2;
    const eastFenceStart = southEast!.position[0] - southEast!.length / 2;

    expect(westFenceEnd).toBeLessThan(-5);
    expect(eastFenceStart).toBeGreaterThan(5);
  });
});
