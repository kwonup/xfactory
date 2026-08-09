import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CoreValueQuestModalContent } from "@/components/onboarding/core-value-quest-modal";
import { ValuePassportContent } from "@/components/onboarding/value-passport";
import { CORE_VALUE_SCENARIO_BY_VALUE_ID } from "@/features/core-values/core-value-scenarios";
import {
  getCoreValueProgress,
  getCoreValueStationProgress,
  isCoreValueQuestComplete,
} from "@/features/core-values/core-value-progress";
import {
  CORE_VALUE_CLUSTERS,
  CORE_VALUES,
  CORE_VALUE_CLUSTER_BY_ID,
} from "@/features/core-values/core-values";
import { CORE_VALUE_STATIONS } from "@/features/core-values/value-stations";
import { INTERACTION_TARGET_BY_ID } from "@/features/interaction/interaction-targets";
import { isPositionBlocked } from "@/features/player/player-collision";
import { useCoreValueStore } from "@/stores/core-value-store";

afterEach(() => {
  useCoreValueStore.getState().resetCoreValueQuest();
});

describe("Core Value Stations", () => {
  it("connects four reachable interaction targets to three values each", () => {
    expect(CORE_VALUE_STATIONS).toHaveLength(4);
    expect(CORE_VALUE_STATIONS.map((station) => station.clusterId)).toEqual(
      CORE_VALUE_CLUSTERS.map((cluster) => cluster.id),
    );

    for (const station of CORE_VALUE_STATIONS) {
      const target = INTERACTION_TARGET_BY_ID[station.id];
      const approachDirection = target.position[2] < 0 ? -1 : 1;
      const approachPosition = {
        x: target.position[0],
        z: target.position[2] + target.radius * 0.85 * approachDirection,
      };

      expect(CORE_VALUE_CLUSTER_BY_ID[station.clusterId].valueIds).toHaveLength(3);
      expect(target.type).toBe("core-value");
      expect(target.position).toBe(station.interactionPosition);
      expect(isPositionBlocked(approachPosition)).toBe(false);
    }
  });
});

describe("Core Value Quest progress", () => {
  it("derives station sequence and unique 0, 50 and 100 percent progress", () => {
    const firstStation = CORE_VALUE_STATIONS[0];
    const firstClusterValueIds = CORE_VALUE_CLUSTER_BY_ID[firstStation.clusterId].valueIds;

    expect(getCoreValueProgress([])).toEqual({
      completedCount: 0,
      percentage: 0,
      totalCount: 12,
    });
    expect(getCoreValueStationProgress(firstStation, []).nextValueId).toBe(
      firstClusterValueIds[0],
    );
    expect(
      getCoreValueStationProgress(firstStation, [firstClusterValueIds[0]]),
    ).toEqual({
      completedCount: 1,
      nextValueId: firstClusterValueIds[1],
      totalCount: 3,
    });
    expect(getCoreValueProgress(CORE_VALUES.slice(0, 6).map((value) => value.id)).percentage).toBe(
      50,
    );
    expect(getCoreValueProgress(CORE_VALUES.map((value) => value.id)).percentage).toBe(100);
    expect(isCoreValueQuestComplete(CORE_VALUES.map((value) => value.id))).toBe(true);
  });

  it("records each experience once and unlocks reflection only after all twelve", () => {
    const store = useCoreValueStore.getState();

    store.selectReflectionValue(CORE_VALUES[0].id);
    expect(useCoreValueStore.getState().reflectionValueId).toBeNull();

    for (const value of CORE_VALUES) {
      useCoreValueStore.getState().completeValueExperience(value.id);
      useCoreValueStore.getState().completeValueExperience(value.id);
    }

    expect(useCoreValueStore.getState().experiencedValueIds).toHaveLength(12);

    useCoreValueStore.getState().selectReflectionValue(CORE_VALUES[0].id);
    expect(useCoreValueStore.getState().reflectionValueId).toBe(CORE_VALUES[0].id);
  });
});

describe("Core Value Quest UI", () => {
  it("renders an accessible reflection flow with explanatory feedback", () => {
    const station = CORE_VALUE_STATIONS[0];
    const firstValueId = CORE_VALUE_CLUSTER_BY_ID[station.clusterId].valueIds[0];
    const scenario = CORE_VALUE_SCENARIO_BY_VALUE_ID[firstValueId];
    const initialMarkup = renderToStaticMarkup(
      createElement(CoreValueQuestModalContent, {
        experiencedValueIds: [],
        onClose: vi.fn(),
        onContinue: vi.fn(),
        onSelectChoice: vi.fn(),
        selectedChoiceId: null,
        station,
      }),
    );
    const feedbackMarkup = renderToStaticMarkup(
      createElement(CoreValueQuestModalContent, {
        experiencedValueIds: [],
        onClose: vi.fn(),
        onContinue: vi.fn(),
        onSelectChoice: vi.fn(),
        selectedChoiceId: scenario.choices[0].id,
        station,
      }),
    );

    expect(initialMarkup).toContain('role="dialog"');
    expect(initialMarkup).toContain('aria-modal="true"');
    expect(initialMarkup).toContain("[DEMO DATA]");
    expect(initialMarkup).toContain("USER-PROVIDED OFFICIAL VALUE");
    expect(initialMarkup).toContain(scenario.title);
    expect(initialMarkup).toContain("신규 입사자인 당신은 4주 동안 진행할 AI 비전 PoC");
    expect(initialMarkup).toContain('role="group"');
    expect(initialMarkup.match(/aria-pressed="false"/g)).toHaveLength(3);
    expect(feedbackMarkup).toContain(scenario.choices[0].feedback);
    expect(feedbackMarkup).toContain(scenario.takeaway);
    expect(feedbackMarkup).toContain("선택은 평가나 점수로 사용되지 않습니다.");
    expect(feedbackMarkup).toContain("경험 기록하고 다음 가치 보기");
  });

  it("shows station completion after all three experiences", () => {
    const station = CORE_VALUE_STATIONS[0];
    const experiencedValueIds = CORE_VALUE_CLUSTER_BY_ID[station.clusterId].valueIds;
    const markup = renderToStaticMarkup(
      createElement(CoreValueQuestModalContent, {
        experiencedValueIds,
        onClose: vi.fn(),
        onContinue: vi.fn(),
        onSelectChoice: vi.fn(),
        selectedChoiceId: null,
        station,
      }),
    );

    expect(markup).toContain("STATION 01 COMPLETE");
    expect(markup).toContain("3가지 Core Value 경험");
    expect(markup).toContain("점수 또는 적합도를 판단하지 않습니다.");
  });

  it("renders twelve experience states and a non-assessment reflection", () => {
    const allValueIds = CORE_VALUES.map((value) => value.id);
    const emptyMarkup = renderToStaticMarkup(
      createElement(ValuePassportContent, {
        experiencedValueIds: [],
        onSelectReflection: vi.fn(),
        reflectionValueId: null,
      }),
    );
    const completedMarkup = renderToStaticMarkup(
      createElement(ValuePassportContent, {
        experiencedValueIds: allValueIds,
        onSelectReflection: vi.fn(),
        reflectionValueId: CORE_VALUES[0].id,
      }),
    );

    expect(emptyMarkup).toContain("VALUE PASSPORT");
    expect(emptyMarkup).toContain("0 / 12");
    expect(emptyMarkup).toContain('aria-valuenow="0"');
    expect(emptyMarkup.match(/미경험/g)).toHaveLength(12);
    expect(completedMarkup).toContain("12 / 12");
    expect(completedMarkup.match(/경험함/g)).toHaveLength(12);
    expect(completedMarkup).toContain("MY FIRST-WEEK ACTION");
    expect(completedMarkup).toContain('aria-pressed="true"');
    expect(completedMarkup).toContain("직원 성향 분석에 사용되지 않습니다.");
  });
});
