import { describe, expect, it } from "vitest";

import { resolvePlayerAnimation } from "@/features/player/player-animation";

describe("resolvePlayerAnimation", () => {
  it("uses idle when no animation is provided", () => {
    expect(resolvePlayerAnimation()).toBe("idle");
    expect(resolvePlayerAnimation(null)).toBe("idle");
  });

  it("keeps the supported walk animation", () => {
    expect(resolvePlayerAnimation("walk")).toBe("walk");
  });

  it("falls back to idle for an unsupported animation", () => {
    expect(resolvePlayerAnimation("run")).toBe("idle");
  });
});
