"use client";

import { create } from "zustand";

import { isCoreValueQuestComplete } from "@/features/core-values/core-value-progress";
import type { CoreValueId } from "@/features/core-values/core-values";

type CoreValueStore = {
  completeValueExperience: (valueId: CoreValueId) => void;
  experiencedValueIds: CoreValueId[];
  reflectionValueId: CoreValueId | null;
  resetCoreValueQuest: () => void;
  selectReflectionValue: (valueId: CoreValueId) => void;
};

function appendValueOnce(
  experiencedValueIds: readonly CoreValueId[],
  valueId: CoreValueId,
): CoreValueId[] | null {
  return experiencedValueIds.includes(valueId)
    ? null
    : [...experiencedValueIds, valueId];
}

export const useCoreValueStore = create<CoreValueStore>((set) => ({
  completeValueExperience: (valueId) =>
    set((state) => {
      const experiencedValueIds = appendValueOnce(state.experiencedValueIds, valueId);

      return experiencedValueIds ? { experiencedValueIds } : state;
    }),
  experiencedValueIds: [],
  reflectionValueId: null,
  resetCoreValueQuest: () => set({ experiencedValueIds: [], reflectionValueId: null }),
  selectReflectionValue: (reflectionValueId) =>
    set((state) =>
      isCoreValueQuestComplete(state.experiencedValueIds) &&
      state.reflectionValueId !== reflectionValueId
        ? { reflectionValueId }
        : state,
    ),
}));
