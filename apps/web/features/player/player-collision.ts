type HorizontalPosition = {
  x: number;
  z: number;
};

type HorizontalDirection = {
  x: number;
  z: number;
};

export type AxisAlignedCollider = {
  id: string;
  maxX: number;
  maxZ: number;
  minX: number;
  minZ: number;
};

export const PLAYER_COLLISION_RADIUS = 0.34;

export const WORLD_BOUNDARY = {
  maxX: 16.4,
  maxZ: 14.4,
  minX: -16.4,
  minZ: -14.4,
} as const;

export const WORLD_COLLIDERS: readonly AxisAlignedCollider[] = [
  { id: "welcome-board", minX: -1.36, maxX: 1.36, minZ: 2.5, maxZ: 2.7 },
  { id: "company-vision-lab", minX: -8.47, maxX: -3.73, minZ: -4.87, maxZ: -1.43 },
  { id: "ai-sdm-lab", minX: -8.37, maxX: -3.73, minZ: 0.76, maxZ: 4.24 },
  { id: "robot-arm", minX: 3.52, maxX: 4.68, minZ: -3.83, maxZ: -2.67 },
  { id: "conveyor", minX: 4.3, maxX: 7.4, minZ: -2.35, maxZ: -1.45 },
  { id: "canopy-north-west-post", minX: 3.87, maxX: 4.03, minZ: -4.63, maxZ: -4.47 },
  { id: "canopy-north-east-post", minX: 7.77, maxX: 7.93, minZ: -4.63, maxZ: -4.47 },
  { id: "canopy-south-west-post", minX: 3.87, maxX: 4.03, minZ: -1.73, maxZ: -1.57 },
  { id: "canopy-south-east-post", minX: 7.77, maxX: 7.93, minZ: -1.73, maxZ: -1.57 },
  { id: "value-station-a", minX: -1.82, maxX: -0.78, minZ: -1.82, maxZ: -0.78 },
  { id: "value-station-b", minX: 0.78, maxX: 1.82, minZ: -1.82, maxZ: -0.78 },
  { id: "value-station-c", minX: -1.82, maxX: -0.78, minZ: -0.12, maxZ: 0.92 },
  { id: "value-station-d", minX: 0.78, maxX: 1.82, minZ: -0.12, maxZ: 0.92 },
  { id: "core-value-pedestal", minX: -0.5, maxX: 0.5, minZ: -0.95, maxZ: 0.05 },
  { id: "ix-pedestal", minX: 5.27, maxX: 6.83, minZ: 1.87, maxZ: 3.43 },
  { id: "ix-bench", minX: 5.42, maxX: 6.68, minZ: 0.9, maxZ: 1.38 },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isCircleColliding(
  position: HorizontalPosition,
  radius: number,
  collider: AxisAlignedCollider,
): boolean {
  const closestX = clamp(position.x, collider.minX, collider.maxX);
  const closestZ = clamp(position.z, collider.minZ, collider.maxZ);
  const distanceX = position.x - closestX;
  const distanceZ = position.z - closestZ;

  return distanceX * distanceX + distanceZ * distanceZ < radius * radius;
}

export function isPositionBlocked(
  position: HorizontalPosition,
  radius = PLAYER_COLLISION_RADIUS,
  colliders: readonly AxisAlignedCollider[] = WORLD_COLLIDERS,
): boolean {
  return colliders.some((collider) => isCircleColliding(position, radius, collider));
}

function clampToWorld(position: HorizontalPosition, radius: number) {
  position.x = clamp(position.x, WORLD_BOUNDARY.minX + radius, WORLD_BOUNDARY.maxX - radius);
  position.z = clamp(position.z, WORLD_BOUNDARY.minZ + radius, WORLD_BOUNDARY.maxZ - radius);
}

function moveSingleStep(
  position: HorizontalPosition,
  direction: HorizontalDirection,
  distance: number,
  radius: number,
  colliders: readonly AxisAlignedCollider[],
) {
  const nextX = clamp(
    position.x + direction.x * distance,
    WORLD_BOUNDARY.minX + radius,
    WORLD_BOUNDARY.maxX - radius,
  );

  if (!isPositionBlocked({ x: nextX, z: position.z }, radius, colliders)) {
    position.x = nextX;
  }

  const nextZ = clamp(
    position.z + direction.z * distance,
    WORLD_BOUNDARY.minZ + radius,
    WORLD_BOUNDARY.maxZ - radius,
  );

  if (!isPositionBlocked({ x: position.x, z: nextZ }, radius, colliders)) {
    position.z = nextZ;
  }
}

export function movePlayerWithCollisions(
  position: HorizontalPosition,
  direction: HorizontalDirection,
  distance: number,
  radius = PLAYER_COLLISION_RADIUS,
  colliders: readonly AxisAlignedCollider[] = WORLD_COLLIDERS,
) {
  if (distance <= 0 || (direction.x === 0 && direction.z === 0)) {
    clampToWorld(position, radius);
    return;
  }

  const maxStepDistance = radius / 2;
  const steps = Math.max(1, Math.ceil(distance / maxStepDistance));
  const stepDistance = distance / steps;

  for (let step = 0; step < steps; step += 1) {
    moveSingleStep(position, direction, stepDistance, radius, colliders);
  }
}
