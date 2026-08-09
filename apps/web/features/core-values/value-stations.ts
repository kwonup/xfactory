import type { CoreValueClusterId } from "./core-values";

export type CoreValueStationId =
  | "core-value-station-goal-execution"
  | "core-value-station-problem-solving"
  | "core-value-station-growth-resilience"
  | "core-value-station-collaboration";

export type CoreValueStation = {
  accent: string;
  clusterId: CoreValueClusterId;
  id: CoreValueStationId;
  interactionPosition: [number, number, number];
  order: number;
  prompt: string;
  title: string;
  visualPosition: [number, number, number];
};

export const CORE_VALUE_STATIONS: readonly CoreValueStation[] = [
  {
    accent: "#f2b65d",
    clusterId: "goal-execution",
    id: "core-value-station-goal-execution",
    interactionPosition: [-1.3, 1, -1.3],
    order: 1,
    prompt: "Goal & Execution Quest 시작하기",
    title: "Goal & Execution Station",
    visualPosition: [-1.3, 0.45, -0.85],
  },
  {
    accent: "#72b8c8",
    clusterId: "problem-solving-innovation",
    id: "core-value-station-problem-solving",
    interactionPosition: [1.3, 1, -1.3],
    order: 2,
    prompt: "Problem Solving Quest 시작하기",
    title: "Problem Solving & Innovation Station",
    visualPosition: [1.3, 0.45, -0.85],
  },
  {
    accent: "#7eb778",
    clusterId: "growth-resilience",
    id: "core-value-station-growth-resilience",
    interactionPosition: [-1.3, 1, 0.4],
    order: 3,
    prompt: "Growth & Resilience Quest 시작하기",
    title: "Growth & Resilience Station",
    visualPosition: [-1.3, 0.45, 0.85],
  },
  {
    accent: "#a988c5",
    clusterId: "collaboration-curiosity",
    id: "core-value-station-collaboration",
    interactionPosition: [1.3, 1, 0.4],
    order: 4,
    prompt: "Collaboration Quest 시작하기",
    title: "Collaboration & Curiosity Station",
    visualPosition: [1.3, 0.45, 0.85],
  },
];

export const CORE_VALUE_STATION_BY_ID = Object.fromEntries(
  CORE_VALUE_STATIONS.map((station) => [station.id, station]),
) as Record<CoreValueStationId, CoreValueStation>;

const CORE_VALUE_STATION_ID_SET = new Set<CoreValueStationId>(
  CORE_VALUE_STATIONS.map((station) => station.id),
);

export function isCoreValueStationId(value: string): value is CoreValueStationId {
  return CORE_VALUE_STATION_ID_SET.has(value as CoreValueStationId);
}
