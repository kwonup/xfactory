import { describe, expect, it } from "vitest";

import {
  FOLLOW_CAMERA_LOOK_OFFSET,
  FOLLOW_CAMERA_OFFSET,
  getCameraSmoothingFactor,
} from "@/features/player/follow-camera";

describe("follow camera configuration", () => {
  it("keeps the camera elevated and behind the fixed world view", () => {
    expect(FOLLOW_CAMERA_OFFSET.y).toBeGreaterThan(6);
    expect(FOLLOW_CAMERA_OFFSET.z).toBeGreaterThan(0);
    expect(FOLLOW_CAMERA_LOOK_OFFSET.y).toBeGreaterThan(0);
  });

  it("returns a frame-rate independent smoothing factor", () => {
    const oneFrameAt30Fps = getCameraSmoothingFactor(6, 1 / 30);
    const oneFrameAt60Fps = getCameraSmoothingFactor(6, 1 / 60);
    const twoFramesAt60Fps = 1 - (1 - oneFrameAt60Fps) ** 2;

    expect(oneFrameAt30Fps).toBeCloseTo(twoFramesAt60Fps);
    expect(oneFrameAt30Fps).toBeGreaterThan(0);
    expect(oneFrameAt30Fps).toBeLessThan(1);
  });

  it("does not move when response or delta is invalid", () => {
    expect(getCameraSmoothingFactor(0, 1 / 60)).toBe(0);
    expect(getCameraSmoothingFactor(6, 0)).toBe(0);
  });
});
