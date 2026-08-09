"use client";

import { useEffect, useRef } from "react";

import {
  createPlayerKeyState,
  isEditableMovementTarget,
  isMovementKey,
  resetMovementKeys,
  setMovementKey,
} from "@/features/player/player-controls";

export function usePlayerControls() {
  const keysRef = useRef(createPlayerKeyState());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !isMovementKey(event.key) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableMovementTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();
      setMovementKey(keysRef.current, event.key, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isMovementKey(event.key)) {
        return;
      }

      setMovementKey(keysRef.current, event.key, false);

      if (!isEditableMovementTarget(event.target)) {
        event.preventDefault();
      }
    };

    const resetKeys = () => {
      resetMovementKeys(keysRef.current);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", resetKeys);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", resetKeys);
    };
  }, []);

  return keysRef;
}
