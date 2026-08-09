import {
  CORE_VALUES,
  CORE_VALUE_CLUSTER_BY_ID,
  type CoreValueId,
} from "./core-values";
import type { CoreValueStation } from "./value-stations";

export type CoreValueProgress = {
  completedCount: number;
  percentage: number;
  totalCount: number;
};

export type CoreValueStationProgress = {
  completedCount: number;
  nextValueId: CoreValueId | null;
  totalCount: number;
};

export function getCoreValueProgress(
  experiencedValueIds: readonly CoreValueId[],
): CoreValueProgress {
  const completedCount = new Set(experiencedValueIds).size;
  const totalCount = CORE_VALUES.length;

  return {
    completedCount,
    percentage: Math.round((completedCount / totalCount) * 100),
    totalCount,
  };
}

export function getCoreValueStationProgress(
  station: CoreValueStation,
  experiencedValueIds: readonly CoreValueId[],
): CoreValueStationProgress {
  const experiencedValueIdSet = new Set(experiencedValueIds);
  const valueIds = CORE_VALUE_CLUSTER_BY_ID[station.clusterId].valueIds;

  return {
    completedCount: valueIds.filter((valueId) => experiencedValueIdSet.has(valueId)).length,
    nextValueId: valueIds.find((valueId) => !experiencedValueIdSet.has(valueId)) ?? null,
    totalCount: valueIds.length,
  };
}

export function isCoreValueExperienced(
  experiencedValueIds: readonly CoreValueId[],
  valueId: CoreValueId,
): boolean {
  return experiencedValueIds.includes(valueId);
}

export function isCoreValueQuestComplete(
  experiencedValueIds: readonly CoreValueId[],
): boolean {
  return getCoreValueProgress(experiencedValueIds).completedCount === CORE_VALUES.length;
}
