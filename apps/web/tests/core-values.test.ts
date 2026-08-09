import { describe, expect, it } from "vitest";

import {
  CORE_VALUE_CLUSTERS,
  CORE_VALUES,
  CORE_VALUE_BY_ID,
} from "@/features/core-values/core-values";
import {
  CORE_VALUE_SCENARIOS,
  CORE_VALUE_SCENARIO_BY_VALUE_ID,
} from "@/features/core-values/core-value-scenarios";

describe("official Core Value definitions", () => {
  it("keeps all twelve official names and descriptions in source order", () => {
    expect(CORE_VALUES.map((value) => value.name)).toEqual([
      "선도적/정량 목표의식",
      "초효율적 시간관리",
      "최고수준의 결과지향",
      "가치중심적 문제해결",
      "근본적 비판 사고",
      "혁신 프로세스 가속화",
      "집요한 끈기",
      "자발적 성장동기",
      "미래낙관적 도전",
      "성장지향 피드백",
      "관계기반 전략소통",
      "강박적 호기심",
    ]);
    expect(CORE_VALUES.map((value) => value.order)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);

    for (const value of CORE_VALUES) {
      expect(value.officialDescription.length).toBeGreaterThan(0);
      expect(value.source).toBe("user-provided-official");
      expect(CORE_VALUE_BY_ID[value.id]).toBe(value);
    }
  });

  it("groups every value exactly once into four clusters of three", () => {
    const clusteredValueIds = CORE_VALUE_CLUSTERS.flatMap((cluster) => cluster.valueIds);

    expect(CORE_VALUE_CLUSTERS.map((cluster) => cluster.title)).toEqual([
      "Goal & Execution",
      "Problem Solving & Innovation",
      "Growth & Resilience",
      "Collaboration & Curiosity",
    ]);
    expect(CORE_VALUE_CLUSTERS.every((cluster) => cluster.valueIds.length === 3)).toBe(
      true,
    );
    expect(new Set(clusteredValueIds).size).toBe(12);
    expect(clusteredValueIds).toEqual(CORE_VALUES.map((value) => value.id));

    for (const cluster of CORE_VALUE_CLUSTERS) {
      for (const valueId of cluster.valueIds) {
        expect(CORE_VALUE_BY_ID[valueId].clusterId).toBe(cluster.id);
      }
    }
  });
});

describe("Core Value onboarding scenarios", () => {
  it("defines one demo scenario for every Core Value", () => {
    const scenarioIds = CORE_VALUE_SCENARIOS.map((scenario) => scenario.id);
    const scenarioValueIds = CORE_VALUE_SCENARIOS.map((scenario) => scenario.valueId);

    expect(CORE_VALUE_SCENARIOS).toHaveLength(12);
    expect(new Set(scenarioIds).size).toBe(12);
    expect(new Set(scenarioValueIds).size).toBe(12);
    expect(scenarioValueIds).toEqual(CORE_VALUES.map((value) => value.id));

    for (const scenario of CORE_VALUE_SCENARIOS) {
      expect(CORE_VALUE_SCENARIO_BY_VALUE_ID[scenario.valueId]).toBe(scenario);
      expect(scenario.contentStatus).toBe("[DEMO DATA]");
      expect(scenario.learningMode).toBe("reflection-not-assessment");
      expect(scenario.situation.length).toBeGreaterThan(0);
      expect(scenario.takeaway.length).toBeGreaterThan(0);
    }
  });

  it("provides three explanatory choices with one recommended behavior", () => {
    for (const scenario of CORE_VALUE_SCENARIOS) {
      const recommendedChoices = scenario.choices.filter((choice) => choice.recommended);

      expect(scenario.choices).toHaveLength(3);
      expect(recommendedChoices).toHaveLength(1);

      for (const choice of scenario.choices) {
        expect(choice.label.length).toBeGreaterThan(0);
        expect(choice.feedback.length).toBeGreaterThan(0);
      }
    }
  });

  it("does not introduce scoring, correctness or pass/fail fields", () => {
    const assessmentKeys = new Set(["score", "points", "correct", "pass", "fail"]);

    for (const scenario of CORE_VALUE_SCENARIOS) {
      for (const key of Object.keys(scenario)) {
        expect(assessmentKeys.has(key)).toBe(false);
      }

      for (const choice of scenario.choices) {
        for (const key of Object.keys(choice)) {
          expect(assessmentKeys.has(key)).toBe(false);
        }
      }
    }
  });
});
