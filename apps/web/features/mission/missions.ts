export type MissionId =
  | "discover-interx"
  | "explore-smart-factory"
  | "understand-ai-sdm"
  | "meet-ix";

export type MissionEventId =
  | "vision-display-reviewed"
  | "smart-factory-reviewed"
  | "ai-sdm-reviewed"
  | "ix-chat-response-received";

export type MissionDefinition = {
  completionEventId: MissionEventId;
  id: MissionId;
  objective: string;
  order: number;
  title: string;
};

export type MissionProgress = {
  completedCount: number;
  percentage: number;
  totalCount: number;
};

export const MISSIONS: readonly MissionDefinition[] = [
  {
    completionEventId: "vision-display-reviewed",
    id: "discover-interx",
    objective: "Company Vision Display 확인하기",
    order: 1,
    title: "Discover INTERX",
  },
  {
    completionEventId: "smart-factory-reviewed",
    id: "explore-smart-factory",
    objective: "Smart Factory 제조 설비 안내 확인하기",
    order: 2,
    title: "Explore Smart Factory",
  },
  {
    completionEventId: "ai-sdm-reviewed",
    id: "understand-ai-sdm",
    objective: "AI / SDM Monitor 안내 확인하기",
    order: 3,
    title: "Understand AI / SDM",
  },
  {
    completionEventId: "ix-chat-response-received",
    id: "meet-ix",
    objective: "IX와 대화하고 성공한 답변 받기",
    order: 4,
    title: "Meet IX",
  },
];

export const MISSION_BY_ID = Object.fromEntries(
  MISSIONS.map((mission) => [mission.id, mission]),
) as Record<MissionId, MissionDefinition>;

export const MISSION_ID_BY_EVENT = Object.fromEntries(
  MISSIONS.map((mission) => [mission.completionEventId, mission.id]),
) as Record<MissionEventId, MissionId>;

export function getMissionProgress(
  completedMissionIds: readonly MissionId[],
): MissionProgress {
  const completedCount = new Set(completedMissionIds).size;
  const totalCount = MISSIONS.length;

  return {
    completedCount,
    percentage: Math.round((completedCount / totalCount) * 100),
    totalCount,
  };
}

export function getCurrentMissionId(
  completedMissionIds: readonly MissionId[],
): MissionId | null {
  const completedMissionIdSet = new Set(completedMissionIds);

  return MISSIONS.find((mission) => !completedMissionIdSet.has(mission.id))?.id ?? null;
}

export function isMissionCompleted(
  completedMissionIds: readonly MissionId[],
  missionId: MissionId,
): boolean {
  return completedMissionIds.includes(missionId);
}
