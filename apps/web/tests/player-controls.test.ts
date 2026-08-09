import { describe, expect, it } from "vitest";

import {
  createPlayerKeyState,
  dampAngle,
  isEditableMovementTarget,
  resetMovementKeys,
  setMovementKey,
  writeMovementDirection,
} from "@/features/player/player-controls";

describe("player movement direction", () => {
  it("maps arrow keys to world-space directions", () => {
    const keys = createPlayerKeyState();
    const direction = { x: 0, z: 0 };

    setMovementKey(keys, "ArrowUp", true);

    expect(writeMovementDirection(keys, direction)).toBe(true);
    expect(direction).toEqual({ x: 0, z: -1 });
  });

  it("normalizes diagonal movement", () => {
    const keys = createPlayerKeyState();
    const direction = { x: 0, z: 0 };

    setMovementKey(keys, "ArrowUp", true);
    setMovementKey(keys, "ArrowRight", true);
    writeMovementDirection(keys, direction);

    expect(direction.x).toBeCloseTo(Math.SQRT1_2);
    expect(direction.z).toBeCloseTo(-Math.SQRT1_2);
  });

  it("cancels opposing keys and resets held input", () => {
    const keys = createPlayerKeyState();
    const direction = { x: 1, z: 1 };

    setMovementKey(keys, "ArrowLeft", true);
    setMovementKey(keys, "ArrowRight", true);

    expect(writeMovementDirection(keys, direction)).toBe(false);
    expect(direction).toEqual({ x: 0, z: 0 });

    resetMovementKeys(keys);
    expect(keys).toEqual({ backward: false, forward: false, left: false, right: false });
  });
});

describe("player rotation", () => {
  it("interpolates across the shortest angular path", () => {
    const current = Math.PI - 0.05;
    const target = -Math.PI + 0.05;
    const next = dampAngle(current, target, 10, 1 / 60);

    expect(next).toBeGreaterThan(current);
    expect(next - current).toBeLessThan(0.05);
  });
});

describe("movement input target", () => {
  const createTarget = (tagName: string, isContentEditable = false, role?: string) =>
    ({
      getAttribute: (name: string) => (name === "role" ? role ?? null : null),
      isContentEditable,
      tagName,
    }) as unknown as EventTarget;

  it("ignores native form and editable elements", () => {
    expect(isEditableMovementTarget(createTarget("INPUT"))).toBe(true);
    expect(isEditableMovementTarget(createTarget("textarea"))).toBe(true);
    expect(isEditableMovementTarget(createTarget("BUTTON"))).toBe(true);
    expect(isEditableMovementTarget(createTarget("div", true))).toBe(true);
    expect(isEditableMovementTarget(createTarget("div", false, "textbox"))).toBe(true);
  });

  it("allows movement from ordinary page elements", () => {
    expect(isEditableMovementTarget(createTarget("div"))).toBe(false);
    expect(isEditableMovementTarget(null)).toBe(false);
  });
});
