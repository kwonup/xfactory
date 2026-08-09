"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { PerspectiveCamera, Vector3, type Group } from "three";

import {
  FOLLOW_CAMERA_FOV,
  FOLLOW_CAMERA_LOOK_OFFSET,
  FOLLOW_CAMERA_OFFSET,
  FOLLOW_CAMERA_POSITION_RESPONSE,
  FOLLOW_CAMERA_TARGET_RESPONSE,
  getCameraSmoothingFactor,
} from "@/features/player/follow-camera";
import { PLAYER_SPAWN_POSITION } from "@/features/player/player-config";

type PlayerFollowCameraProps = {
  targetRef: RefObject<Group | null>;
};

export function PlayerFollowCamera({ targetRef }: PlayerFollowCameraProps) {
  const initializedRef = useRef(false);
  const playerPositionRef = useRef(new Vector3());
  const desiredPositionRef = useRef(new Vector3());
  const desiredLookTargetRef = useRef(new Vector3());
  const smoothedLookTargetRef = useRef(new Vector3());

  useFrame(({ camera }, delta) => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const playerPosition = playerPositionRef.current;
    const desiredPosition = desiredPositionRef.current;
    const desiredLookTarget = desiredLookTargetRef.current;
    const smoothedLookTarget = smoothedLookTargetRef.current;

    target.getWorldPosition(playerPosition);
    playerPosition.y = PLAYER_SPAWN_POSITION[1];

    desiredPosition.set(
      playerPosition.x + FOLLOW_CAMERA_OFFSET.x,
      playerPosition.y + FOLLOW_CAMERA_OFFSET.y,
      playerPosition.z + FOLLOW_CAMERA_OFFSET.z,
    );
    desiredLookTarget.set(
      playerPosition.x + FOLLOW_CAMERA_LOOK_OFFSET.x,
      playerPosition.y + FOLLOW_CAMERA_LOOK_OFFSET.y,
      playerPosition.z + FOLLOW_CAMERA_LOOK_OFFSET.z,
    );

    if (!initializedRef.current) {
      camera.position.copy(desiredPosition);
      smoothedLookTarget.copy(desiredLookTarget);
      initializedRef.current = true;

      if (camera instanceof PerspectiveCamera) {
        camera.fov = FOLLOW_CAMERA_FOV;
        camera.updateProjectionMatrix();
      }
    } else {
      camera.position.lerp(
        desiredPosition,
        getCameraSmoothingFactor(FOLLOW_CAMERA_POSITION_RESPONSE, delta),
      );
      smoothedLookTarget.lerp(
        desiredLookTarget,
        getCameraSmoothingFactor(FOLLOW_CAMERA_TARGET_RESPONSE, delta),
      );
    }

    camera.lookAt(smoothedLookTarget);
  });

  return null;
}
