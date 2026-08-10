import { describe, expect, it } from "vitest";

import {
  INDUSTRIAL_BUILDINGS,
  INDUSTRIAL_BUILDING_BY_ID,
  INDUSTRIAL_DETAIL_COLLIDERS,
  PALLET_LOADS,
  PERIMETER_FENCE_SEGMENTS,
  RETAINING_WALL_SEGMENTS,
  ROAD_CROSSWALKS,
  SAFETY_BOLLARD_POSITIONS,
} from "@/features/environment/industrial-layout";
import { INTERACTION_TARGET_BY_ID } from "@/features/interaction/interaction-targets";

describe("industrial outdoor factory layout", () => {
  it("defines factory buildings with distinct industrial equipment profiles", () => {
    expect(INDUSTRIAL_BUILDINGS).toHaveLength(2);

    const companyBuilding = INDUSTRIAL_BUILDING_BY_ID["company-control-building"];
    const automationBuilding = INDUSTRIAL_BUILDING_BY_ID["ai-automation-building"];

    expect(companyBuilding.equipment).toEqual(
      expect.arrayContaining(["loading-bay", "control-panel", "pipe-bank", "process-vessel"]),
    );
    expect(automationBuilding.equipment).toEqual(
      expect.arrayContaining(["loading-bay", "control-panel", "cooling-fan-bank", "antenna"]),
    );

    for (const building of INDUSTRIAL_BUILDINGS) {
      expect(building.equipment).toContain("roof-air-handler");
      expect(building.equipment).toContain("roof-ventilator");
      expect(building.size[0]).toBeGreaterThan(building.size[1]);
      expect(building.size[2]).toBeGreaterThan(building.size[1]);
    }
  });

  it("keeps mission controls aligned with the industrial building fronts", () => {
    const controls = [
      {
        building: INDUSTRIAL_BUILDING_BY_ID["company-control-building"],
        target: INTERACTION_TARGET_BY_ID["company-vision-display"],
      },
      {
        building: INDUSTRIAL_BUILDING_BY_ID["ai-automation-building"],
        target: INTERACTION_TARGET_BY_ID["ai-sdm-monitor"],
      },
    ];

    for (const { building, target } of controls) {
      const frontZ = building.position[2] + building.size[2] / 2;
      const minX = building.position[0] - building.size[0] / 2;
      const maxX = building.position[0] + building.size[0] / 2;

      expect(Math.abs(target.position[2] - frontZ)).toBeLessThan(0.2);
      expect(target.position[0]).toBeGreaterThan(minX);
      expect(target.position[0]).toBeLessThan(maxX);
    }
  });

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
