"use client";

import { create } from "zustand";

import type { InteractionTargetId } from "@/features/interaction/interaction-targets";
import type { ZoneId } from "@/features/zones/zones";

type WorldStore = {
  activateInteractionTarget: () => void;
  activeInteractionTargetId: InteractionTargetId | null;
  closeInteraction: () => void;
  currentZone: ZoneId | null;
  interactionTargetId: InteractionTargetId | null;
  resetInteraction: () => void;
  setCurrentZone: (zone: ZoneId | null) => void;
  setInteractionTarget: (targetId: InteractionTargetId | null) => void;
};

export const useWorldStore = create<WorldStore>((set) => ({
  activateInteractionTarget: () =>
    set((state) =>
      state.activeInteractionTargetId || !state.interactionTargetId
        ? state
        : { activeInteractionTargetId: state.interactionTargetId },
    ),
  activeInteractionTargetId: null,
  closeInteraction: () => set({ activeInteractionTargetId: null }),
  currentZone: null,
  interactionTargetId: null,
  resetInteraction: () =>
    set({ activeInteractionTargetId: null, interactionTargetId: null }),
  setCurrentZone: (currentZone) => set({ currentZone }),
  setInteractionTarget: (interactionTargetId) =>
    set((state) =>
      state.interactionTargetId === interactionTargetId ? state : { interactionTargetId },
    ),
}));
