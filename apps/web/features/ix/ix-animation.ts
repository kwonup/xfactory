export const IX_SUPPORTED_ANIMATIONS = ["idle"] as const;

export type IxAnimation = (typeof IX_SUPPORTED_ANIMATIONS)[number];

export function resolveIxAnimation(animation?: string | null): IxAnimation {
  return animation === "idle" ? animation : "idle";
}
