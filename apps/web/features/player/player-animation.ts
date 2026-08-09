export const PLAYER_ANIMATIONS = ["idle", "walk"] as const;

export type PlayerAnimation = (typeof PLAYER_ANIMATIONS)[number];

export function resolvePlayerAnimation(animation?: string | null): PlayerAnimation {
  return animation === "walk" ? "walk" : "idle";
}
