export const MOVEMENT_KEYS = {
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "forward",
} as const;

export type MovementKey = keyof typeof MOVEMENT_KEYS;

export type PlayerKeyState = {
  backward: boolean;
  forward: boolean;
  left: boolean;
  right: boolean;
};

type MovementDirection = {
  x: number;
  z: number;
};

const EDITABLE_TAG_NAMES = new Set(["button", "input", "select", "textarea"]);
const EDITABLE_ROLES = new Set(["combobox", "searchbox", "spinbutton", "textbox"]);

export function createPlayerKeyState(): PlayerKeyState {
  return {
    backward: false,
    forward: false,
    left: false,
    right: false,
  };
}

export function isMovementKey(key: string): key is MovementKey {
  return key in MOVEMENT_KEYS;
}

export function setMovementKey(state: PlayerKeyState, key: MovementKey, pressed: boolean) {
  state[MOVEMENT_KEYS[key]] = pressed;
}

export function resetMovementKeys(state: PlayerKeyState) {
  state.backward = false;
  state.forward = false;
  state.left = false;
  state.right = false;
}

export function writeMovementDirection(state: PlayerKeyState, target: MovementDirection): boolean {
  const x = Number(state.right) - Number(state.left);
  const z = Number(state.backward) - Number(state.forward);
  const length = Math.hypot(x, z);

  if (length === 0) {
    target.x = 0;
    target.z = 0;
    return false;
  }

  target.x = x / length;
  target.z = z / length;
  return true;
}

export function dampAngle(current: number, target: number, smoothing: number, delta: number): number {
  const shortestAngle = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  const interpolation = 1 - Math.exp(-smoothing * delta);

  return current + shortestAngle * interpolation;
}

export function isEditableMovementTarget(target: EventTarget | null): boolean {
  if (!target || typeof target !== "object") {
    return false;
  }

  const element = target as {
    getAttribute?: (name: string) => string | null;
    isContentEditable?: boolean;
    tagName?: string;
  };
  const tagName = element.tagName?.toLowerCase();
  const role = element.getAttribute?.("role")?.toLowerCase();

  return Boolean(
    element.isContentEditable ||
      (tagName && EDITABLE_TAG_NAMES.has(tagName)) ||
      (role && EDITABLE_ROLES.has(role)),
  );
}
