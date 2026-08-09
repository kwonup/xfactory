"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Vector3, type Group } from "three";

import {
  findNearestInteractionTarget,
  type InteractionTargetId,
} from "@/features/interaction/interaction-targets";
import { useWorldStore } from "@/stores/world-store";

type PlayerInteractionTrackerProps = {
  targetRef: RefObject<Group | null>;
};

export function PlayerInteractionTracker({ targetRef }: PlayerInteractionTrackerProps) {
  const currentTargetIdRef = useRef<InteractionTargetId | null>(null);
  const playerPositionRef = useRef(new Vector3());
  const resetInteraction = useWorldStore((state) => state.resetInteraction);
  const setInteractionTarget = useWorldStore((state) => state.setInteractionTarget);

  useEffect(
    () => () => {
      currentTargetIdRef.current = null;
      resetInteraction();
    },
    [resetInteraction],
  );

  useFrame(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const playerPosition = playerPositionRef.current;
    target.getWorldPosition(playerPosition);

    const nextTargetId = findNearestInteractionTarget(playerPosition)?.id ?? null;

    if (nextTargetId !== currentTargetIdRef.current) {
      currentTargetIdRef.current = nextTargetId;
      setInteractionTarget(nextTargetId);
    }
  });

  return null;
}
