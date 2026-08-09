export type ZoneId =
  | "welcome-plaza"
  | "company-vision"
  | "smart-factory"
  | "ai-sdm"
  | "core-value-park"
  | "ix-area";

export type ZoneBounds = {
  maxX: number;
  maxZ: number;
  minX: number;
  minZ: number;
};

export type OnboardingZone = {
  accent: string;
  bounds: ZoneBounds;
  id: ZoneId;
  shortTitle: string;
  title: string;
};

type WorldPosition = {
  x: number;
  z: number;
};

export const ONBOARDING_ZONES: OnboardingZone[] = [
  {
    accent: "#4f9f74",
    bounds: { maxX: 2.7, maxZ: 5.2, minX: -2.7, minZ: 2.35 },
    id: "welcome-plaza",
    shortTitle: "WELCOME",
    title: "Welcome Plaza",
  },
  {
    accent: "#4f9dc4",
    bounds: { maxX: -3.15, maxZ: -0.35, minX: -9.1, minZ: -5.65 },
    id: "company-vision",
    shortTitle: "COMPANY",
    title: "Company Vision Lab",
  },
  {
    accent: "#e59a48",
    bounds: { maxX: 9.1, maxZ: -0.35, minX: 3.15, minZ: -5.65 },
    id: "smart-factory",
    shortTitle: "FACTORY",
    title: "Smart Factory",
  },
  {
    accent: "#8878c7",
    bounds: { maxX: -3.15, maxZ: 5.05, minX: -9.1, minZ: 0.15 },
    id: "ai-sdm",
    shortTitle: "AI / SDM",
    title: "AI / SDM Lab",
  },
  {
    accent: "#c79a45",
    bounds: { maxX: 2.75, maxZ: 2.05, minX: -2.75, minZ: -2.75 },
    id: "core-value-park",
    shortTitle: "VALUES",
    title: "Core Value Park",
  },
  {
    accent: "#59a56d",
    bounds: { maxX: 9.1, maxZ: 5.05, minX: 3.15, minZ: 0.15 },
    id: "ix-area",
    shortTitle: "IX",
    title: "IX Area",
  },
];

export const ONBOARDING_ZONE_BY_ID = Object.fromEntries(
  ONBOARDING_ZONES.map((zone) => [zone.id, zone]),
) as Record<ZoneId, OnboardingZone>;

export function isPositionInsideZone(position: WorldPosition, bounds: ZoneBounds): boolean {
  return (
    position.x >= bounds.minX &&
    position.x <= bounds.maxX &&
    position.z >= bounds.minZ &&
    position.z <= bounds.maxZ
  );
}

export function findZoneAtPosition(position: WorldPosition): ZoneId | null {
  return ONBOARDING_ZONES.find((zone) => isPositionInsideZone(position, zone.bounds))?.id ?? null;
}
