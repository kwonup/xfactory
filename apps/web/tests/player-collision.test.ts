import { describe, expect, it } from "vitest";

import {
  PLAYER_COLLISION_RADIUS,
  WORLD_BOUNDARY,
  WORLD_COLLIDERS,
  isCircleColliding,
  isPositionBlocked,
  movePlayerWithCollisions,
  type AxisAlignedCollider,
} from "@/features/player/player-collision";

const TEST_WALL: AxisAlignedCollider = {
  id: "test-wall",
  minX: 1,
  maxX: 2,
  minZ: -1,
  maxZ: 1,
};

describe("world collision data", () => {
  it("defines valid bounds for every static collider", () => {
    expect(WORLD_COLLIDERS.length).toBeGreaterThanOrEqual(10);

    for (const collider of WORLD_COLLIDERS) {
      expect(collider.minX).toBeLessThan(collider.maxX);
      expect(collider.minZ).toBeLessThan(collider.maxZ);
      expect(collider.minX).toBeGreaterThanOrEqual(WORLD_BOUNDARY.minX);
      expect(collider.maxX).toBeLessThanOrEqual(WORLD_BOUNDARY.maxX);
      expect(collider.minZ).toBeGreaterThanOrEqual(WORLD_BOUNDARY.minZ);
      expect(collider.maxZ).toBeLessThanOrEqual(WORLD_BOUNDARY.maxZ);
    }
  });

  it("detects circle overlap without blocking tangent contact", () => {
    expect(isCircleColliding({ x: 0.75, z: 0 }, 0.3, TEST_WALL)).toBe(true);
    expect(isCircleColliding({ x: 0.7, z: 0 }, 0.3, TEST_WALL)).toBe(false);
  });
});

describe("player collision movement", () => {
  it("clamps the player center inside the grass island", () => {
    const position = { x: 16, z: 0 };

    movePlayerWithCollisions(position, { x: 1, z: 0 }, 5, PLAYER_COLLISION_RADIUS, []);

    expect(position.x).toBeCloseTo(WORLD_BOUNDARY.maxX - PLAYER_COLLISION_RADIUS);
    expect(position.z).toBe(0);
  });

  it("prevents tunneling through a collider during a large movement", () => {
    const position = { x: 0, z: 0 };

    movePlayerWithCollisions(position, { x: 1, z: 0 }, 4, 0.3, [TEST_WALL]);

    expect(position.x).toBeLessThanOrEqual(0.7);
    expect(isPositionBlocked(position, 0.3, [TEST_WALL])).toBe(false);
  });

  it("stops at the welcome board but allows the player to walk around it", () => {
    const position = { x: 0, z: 3.35 };

    movePlayerWithCollisions(position, { x: 0, z: -1 }, 3);

    expect(position.z).toBeGreaterThanOrEqual(2.7 + PLAYER_COLLISION_RADIUS);

    movePlayerWithCollisions(position, { x: 1, z: 0 }, 2);
    movePlayerWithCollisions(position, { x: 0, z: -1 }, 2);

    expect(position.x).toBeCloseTo(2);
    expect(position.z).toBeLessThan(2.5);
    expect(isPositionBlocked(position)).toBe(false);
  });

  it("slides along an obstacle by resolving each axis separately", () => {
    const position = { x: 0.6, z: 0 };

    movePlayerWithCollisions(position, { x: 1, z: 1 }, 0.4, 0.3, [TEST_WALL]);

    expect(position.x).toBeCloseTo(0.6);
    expect(position.z).toBeCloseTo(0.4);
  });

  it("blocks entry into factory buildings and major equipment", () => {
    const companyApproach = { x: -3, z: -3.15 };
    const conveyorApproach = { x: 5.85, z: -0.9 };

    movePlayerWithCollisions(companyApproach, { x: -1, z: 0 }, 3);
    movePlayerWithCollisions(conveyorApproach, { x: 0, z: -1 }, 2);

    expect(companyApproach.x).toBeGreaterThanOrEqual(-3.73 + PLAYER_COLLISION_RADIUS);
    expect(conveyorApproach.z).toBeGreaterThanOrEqual(-1.45 + PLAYER_COLLISION_RADIUS);
    expect(isPositionBlocked(companyApproach)).toBe(false);
    expect(isPositionBlocked(conveyorApproach)).toBe(false);
  });

  it("blocks the factory back wall and pallet load without closing the work path", () => {
    const backWallApproach = { x: 5.9, z: -4 };
    const palletApproach = { x: 6, z: -3.42 };

    movePlayerWithCollisions(backWallApproach, { x: 0, z: -1 }, 2);
    movePlayerWithCollisions(palletApproach, { x: 1, z: 0 }, 2);

    expect(backWallApproach.z).toBeGreaterThanOrEqual(-4.5 + PLAYER_COLLISION_RADIUS);
    expect(palletApproach.x).toBeLessThanOrEqual(6.62 - PLAYER_COLLISION_RADIUS);
    expect(isPositionBlocked(backWallApproach)).toBe(false);
    expect(isPositionBlocked(palletApproach)).toBe(false);
  });

  it("allows unobstructed movement through open factory paths", () => {
    const position = { x: 10, z: 10 };

    movePlayerWithCollisions(position, { x: -1, z: 0 }, 1.5);

    expect(position.x).toBeCloseTo(8.5);
    expect(position.z).toBe(10);
  });
});
