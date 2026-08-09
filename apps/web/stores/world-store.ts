"use client";

import { create } from "zustand";

import type { ZoneId } from "@/features/zones/zones";

type WorldStore = {
  currentZone: ZoneId | null;
  setCurrentZone: (zone: ZoneId | null) => void;
};

export const useWorldStore = create<WorldStore>((set) => ({
  currentZone: null,
  setCurrentZone: (currentZone) => set({ currentZone }),
}));
