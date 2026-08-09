import { isEditableMovementTarget } from "@/features/player/player-controls";

export type InteractionKeyboardAction = "activate" | "close";

type InteractionKeyboardEvent = {
  altKey?: boolean;
  code?: string;
  ctrlKey?: boolean;
  key: string;
  metaKey?: boolean;
  repeat?: boolean;
  target: EventTarget | null;
};

export function getInteractionKeyboardAction(
  event: InteractionKeyboardEvent,
): InteractionKeyboardAction | null {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return null;
  }

  if (event.key === "Escape") {
    return "close";
  }

  if (
    event.repeat ||
    isEditableMovementTarget(event.target) ||
    (event.code !== "KeyE" && event.key.toLowerCase() !== "e")
  ) {
    return null;
  }

  return "activate";
}
