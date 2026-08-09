export const FOLLOW_CAMERA_FOV = 40;
export const FOLLOW_CAMERA_POSITION_RESPONSE = 5.5;
export const FOLLOW_CAMERA_TARGET_RESPONSE = 7;

export const FOLLOW_CAMERA_OFFSET = {
  x: 7.2,
  y: 7.8,
  z: 9.5,
} as const;

export const FOLLOW_CAMERA_LOOK_OFFSET = {
  x: -1.1,
  y: 0.95,
  z: -1.45,
} as const;

export function getCameraSmoothingFactor(response: number, delta: number): number {
  if (response <= 0 || delta <= 0) {
    return 0;
  }

  return 1 - Math.exp(-response * delta);
}
