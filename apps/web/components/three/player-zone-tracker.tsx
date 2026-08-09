"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Vector3, type Group } from "three";

import { findZoneAtPosition, type ZoneId } from "@/features/zones/zones";
import { useWorldStore } from "@/stores/world-store";

type PlayerZoneTrackerProps = {
  targetRef: RefObject<Group | null>;
};

export function PlayerZoneTracker({ targetRef }: PlayerZoneTrackerProps) {
  const currentZoneRef = useRef<ZoneId | null>(null);
  const playerPositionRef = useRef(new Vector3());
  const setCurrentZone = useWorldStore((state) => state.setCurrentZone);

  useEffect(
    () => () => {
      setCurrentZone(null);
    },
    [setCurrentZone],
  );

  useFrame(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const playerPosition = playerPositionRef.current;
    target.getWorldPosition(playerPosition);

    const nextZone = findZoneAtPosition(playerPosition);

    if (nextZone !== currentZoneRef.current) {
      currentZoneRef.current = nextZone;
      setCurrentZone(nextZone);
    }
  });

  return null;
}
