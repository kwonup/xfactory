import { afterEach, describe, expect, it } from "vitest";

import { createInformationInteractionEvent } from "@/features/interaction/information-content";
import {
  MISSIONS,
  MISSION_ID_BY_EVENT,
  getCurrentMissionId,
  getMissionProgress,
  getMissionStatus,
  isMissionCompleted,
} from "@/features/mission/missions";
import { useMissionStore } from "@/stores/mission-store";

afterEach(() => {
  useMissionStore.getState().resetMissions();
});

describe("mission definitions", () => {
  it("defines four ordered missions with unique events", () => {
    const ids = MISSIONS.map((mission) => mission.id);
    const events = MISSIONS.map((mission) => mission.completionEventId);

    expect(ids).toEqual([
      "discover-interx",
      "explore-smart-factory",
      "understand-ai-sdm",
      "meet-ix",
    ]);
    expect(MISSIONS.map((mission) => mission.order)).toEqual([1, 2, 3, 4]);
    expect(new Set(ids).size).toBe(4);
    expect(new Set(events).size).toBe(4);
    expect(MISSION_ID_BY_EVENT["ix-chat-response-received"]).toBe("meet-ix");
  });

  it("derives the current mission from the first incomplete item", () => {
    expect(getCurrentMissionId([])).toBe("discover-interx");
    expect(getCurrentMissionId(["discover-interx", "understand-ai-sdm"])).toBe(
      "explore-smart-factory",
    );
    expect(getCurrentMissionId(MISSIONS.map((mission) => mission.id))).toBeNull();
  });

  it("distinguishes completed, current and pending states", () => {
    const completedMissionIds = ["discover-interx"] as const;
    const currentMissionId = getCurrentMissionId(completedMissionIds);

    expect(getMissionStatus("discover-interx", currentMissionId, completedMissionIds)).toBe(
      "completed",
    );
    expect(getMissionStatus("explore-smart-factory", currentMissionId, completedMissionIds)).toBe(
      "current",
    );
    expect(getMissionStatus("understand-ai-sdm", currentMissionId, completedMissionIds)).toBe(
      "pending",
    );
  });
});

describe("mission progress", () => {
  it("calculates unique completion count and percentage", () => {
    expect(getMissionProgress([])).toEqual({
      completedCount: 0,
      percentage: 0,
      totalCount: 4,
    });
    expect(
      getMissionProgress(["discover-interx", "discover-interx", "explore-smart-factory"]),
    ).toEqual({ completedCount: 2, percentage: 50, totalCount: 4 });
    expect(getMissionProgress(MISSIONS.map((mission) => mission.id)).percentage).toBe(100);
  });

  it("checks completion without depending on array order", () => {
    expect(isMissionCompleted(["understand-ai-sdm"], "understand-ai-sdm")).toBe(true);
    expect(isMissionCompleted(["understand-ai-sdm"], "discover-interx")).toBe(false);
  });
});

describe("mission store", () => {
  it("completes a mission from an information confirmation event", () => {
    const event = createInformationInteractionEvent("company-vision-display");

    useMissionStore.getState().completeMissionByEvent(event.missionEventId);

    expect(useMissionStore.getState().completedMissionIds).toEqual(["discover-interx"]);
  });

  it("ignores repeated completion of the same mission", () => {
    const store = useMissionStore.getState();

    store.completeMissionByEvent("smart-factory-reviewed");
    const firstCompletion = useMissionStore.getState().completedMissionIds;
    useMissionStore.getState().completeMissionByEvent("smart-factory-reviewed");

    expect(useMissionStore.getState().completedMissionIds).toBe(firstCompletion);
    expect(useMissionStore.getState().completedMissionIds).toEqual(["explore-smart-factory"]);
  });

  it("supports direct and future IX chat completion events", () => {
    const store = useMissionStore.getState();

    store.completeMission("understand-ai-sdm");
    useMissionStore.getState().completeMissionByEvent("ix-chat-response-received");

    expect(useMissionStore.getState().completedMissionIds).toEqual([
      "understand-ai-sdm",
      "meet-ix",
    ]);
  });
});
