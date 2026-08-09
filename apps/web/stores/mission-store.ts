"use client";

import { create } from "zustand";

import {
  MISSION_ID_BY_EVENT,
  type MissionEventId,
  type MissionId,
} from "@/features/mission/missions";

type MissionStore = {
  completeMission: (missionId: MissionId) => void;
  completeMissionByEvent: (eventId: MissionEventId) => void;
  completedMissionIds: MissionId[];
  resetMissions: () => void;
};

function appendMissionOnce(
  completedMissionIds: readonly MissionId[],
  missionId: MissionId,
): MissionId[] | null {
  return completedMissionIds.includes(missionId)
    ? null
    : [...completedMissionIds, missionId];
}

export const useMissionStore = create<MissionStore>((set) => ({
  completeMission: (missionId) =>
    set((state) => {
      const completedMissionIds = appendMissionOnce(state.completedMissionIds, missionId);

      return completedMissionIds ? { completedMissionIds } : state;
    }),
  completeMissionByEvent: (eventId) =>
    set((state) => {
      const completedMissionIds = appendMissionOnce(
        state.completedMissionIds,
        MISSION_ID_BY_EVENT[eventId],
      );

      return completedMissionIds ? { completedMissionIds } : state;
    }),
  completedMissionIds: [],
  resetMissions: () => set({ completedMissionIds: [] }),
}));
