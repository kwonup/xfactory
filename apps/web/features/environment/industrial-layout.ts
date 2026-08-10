export type IndustrialPosition = [number, number, number];

export type PerimeterFenceSegment = {
  id: string;
  length: number;
  position: IndustrialPosition;
  rotation: number;
};

export type RetainingWallSegment = {
  id: string;
  position: IndustrialPosition;
  size: IndustrialPosition;
};

export type RoadCrosswalk = {
  id: string;
  orientation: "east-west" | "north-south";
  position: IndustrialPosition;
};

export type PalletLoad = {
  id: string;
  position: IndustrialPosition;
  rotation: number;
};

export const PERIMETER_FENCE_SEGMENTS: readonly PerimeterFenceSegment[] = [
  { id: "fence-north-west", length: 14, position: [-8.2, 0, -14.35], rotation: 0 },
  { id: "fence-north-east", length: 14, position: [8.2, 0, -14.35], rotation: 0 },
  { id: "fence-south-west", length: 9.5, position: [-10.8, 0, 14.35], rotation: 0 },
  { id: "fence-south-east", length: 9.5, position: [10.8, 0, 14.35], rotation: 0 },
  {
    id: "fence-west",
    length: 20,
    position: [-16.35, 0, -0.2],
    rotation: Math.PI / 2,
  },
  {
    id: "fence-east",
    length: 20,
    position: [16.35, 0, -0.2],
    rotation: Math.PI / 2,
  },
];

export const RETAINING_WALL_SEGMENTS: readonly RetainingWallSegment[] = [
  { id: "retaining-north", position: [0, -0.02, -14.68], size: [31.5, 0.7, 0.38] },
  { id: "retaining-west", position: [-16.62, -0.04, 0], size: [0.38, 0.65, 26.8] },
  { id: "retaining-east", position: [16.62, -0.04, 0], size: [0.38, 0.65, 26.8] },
];

export const ROAD_CROSSWALKS: readonly RoadCrosswalk[] = [
  {
    id: "crosswalk-north",
    orientation: "north-south",
    position: [0, 0.2, -8.25],
  },
  {
    id: "crosswalk-south",
    orientation: "north-south",
    position: [0, 0.2, 7.25],
  },
  {
    id: "crosswalk-west",
    orientation: "east-west",
    position: [-11.5, 0.2, -0.5],
  },
  {
    id: "crosswalk-east",
    orientation: "east-west",
    position: [11.5, 0.2, -0.5],
  },
];

export const SAFETY_BOLLARD_POSITIONS: readonly IndustrialPosition[] = [
  [3.35, 0.66, -2.15],
  [3.35, 0.66, -4.08],
  [4.75, 0.66, -4.08],
  [7.1, 0.66, -4.08],
  [8.35, 0.66, -3.65],
  [8.35, 0.66, -2.25],
];

export const PALLET_LOADS: readonly PalletLoad[] = [
  {
    id: "smart-factory-pallet-load",
    position: [7.25, 0.48, -3.42],
    rotation: -0.08,
  },
];

export const INDUSTRIAL_DETAIL_COLLIDERS = [
  {
    id: "smart-factory-back-wall",
    minX: 3.45,
    maxX: 8.35,
    minZ: -4.88,
    maxZ: -4.5,
  },
  {
    id: "smart-factory-pallet-load",
    minX: 6.62,
    maxX: 7.88,
    minZ: -3.9,
    maxZ: -2.94,
  },
] as const;
