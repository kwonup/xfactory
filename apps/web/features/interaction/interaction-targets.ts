import {
  CORE_VALUE_STATIONS,
  type CoreValueStationId,
} from "@/features/core-values/value-stations";
import {
  IX_NPC_INTERACTION_POSITION,
  IX_NPC_INTERACTION_RADIUS,
  IX_NPC_TARGET_ID,
  type IxNpcTargetId,
} from "@/features/ix/ix-config";

export type InteractionTargetType = "core-value" | "info" | "mission" | "npc";

export type InteractionTargetId =
  | "company-vision-display"
  | "smart-factory-console"
  | "ai-sdm-monitor"
  | CoreValueStationId
  | IxNpcTargetId;

export type InteractionTarget = {
  id: InteractionTargetId;
  position: readonly [number, number, number];
  prompt: string;
  radius: number;
  title: string;
  type: InteractionTargetType;
};

type HorizontalPosition = {
  x: number;
  z: number;
};

const INTERACTION_DISTANCE_EPSILON = 1e-9;

export const INTERACTION_TARGETS: readonly InteractionTarget[] = [
  {
    id: "company-vision-display",
    position: [-7.55, 1.5, -1.55],
    prompt: "Vision Display 알아보기",
    radius: 1.35,
    title: "Company Vision Display",
    type: "mission",
  },
  {
    id: "smart-factory-console",
    position: [5.85, 1.05, -1.9],
    prompt: "Smart Factory 설비 알아보기",
    radius: 1.4,
    title: "Smart Factory Console",
    type: "mission",
  },
  {
    id: "ai-sdm-monitor",
    position: [-6.05, 1.45, 4.1],
    prompt: "AI / SDM Monitor 알아보기",
    radius: 1.35,
    title: "AI / SDM Monitor",
    type: "mission",
  },
  ...CORE_VALUE_STATIONS.map(
    (station): InteractionTarget => ({
      id: station.id,
      position: station.interactionPosition,
      prompt: station.prompt,
      radius: 1.05,
      title: station.title,
      type: "core-value",
    }),
  ),
  {
    id: IX_NPC_TARGET_ID,
    position: IX_NPC_INTERACTION_POSITION,
    prompt: "IX와 대화하기",
    radius: IX_NPC_INTERACTION_RADIUS,
    title: "IX — AI Onboarding Buddy",
    type: "npc",
  },
];

export const INTERACTION_TARGET_BY_ID = Object.fromEntries(
  INTERACTION_TARGETS.map((target) => [target.id, target]),
) as Record<InteractionTargetId, InteractionTarget>;

export function getInteractionDistanceSquared(
  position: HorizontalPosition,
  target: InteractionTarget,
): number {
  const distanceX = position.x - target.position[0];
  const distanceZ = position.z - target.position[2];

  return distanceX * distanceX + distanceZ * distanceZ;
}

export function isWithinInteractionRange(
  position: HorizontalPosition,
  target: InteractionTarget,
): boolean {
  return (
    getInteractionDistanceSquared(position, target) <=
    target.radius * target.radius + INTERACTION_DISTANCE_EPSILON
  );
}

export function findNearestInteractionTarget(
  position: HorizontalPosition,
  targets: readonly InteractionTarget[] = INTERACTION_TARGETS,
): InteractionTarget | null {
  let nearestTarget: InteractionTarget | null = null;
  let nearestDistanceSquared = Number.POSITIVE_INFINITY;

  for (const target of targets) {
    const distanceSquared = getInteractionDistanceSquared(position, target);

    if (
      distanceSquared <= target.radius * target.radius + INTERACTION_DISTANCE_EPSILON &&
      distanceSquared < nearestDistanceSquared
    ) {
      nearestTarget = target;
      nearestDistanceSquared = distanceSquared;
    }
  }

  return nearestTarget;
}
