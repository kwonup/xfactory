"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { Vector3, type Group } from "three";

import { resolvePlayerAnimation } from "@/features/player/player-animation";
import { movePlayerWithCollisions } from "@/features/player/player-collision";
import { PLAYER_SPAWN_POSITION, type PlayerPosition } from "@/features/player/player-config";
import { dampAngle, writeMovementDirection } from "@/features/player/player-controls";
import { usePlayerControls } from "@/hooks/use-player-controls";

type PlayerProps = {
  animation?: string | null;
  playerRef?: RefObject<Group | null>;
  position?: PlayerPosition;
};

const PLAYER_MOVE_SPEED = 3.2;
const PLAYER_ROTATION_SMOOTHING = 11;

function PlayerHead() {
  return (
    <group>
      <mesh position={[0, 2.08, 0]} castShadow>
        <sphereGeometry args={[0.48, 16, 12]} />
        <meshStandardMaterial color="#f2c6a0" roughness={0.86} flatShading />
      </mesh>

      {[-0.16, 0.16].map((x) => (
        <mesh key={`player-eye-${x}`} position={[x, 2.12, 0.445]}>
          <sphereGeometry args={[0.045, 10, 8]} />
          <meshStandardMaterial color="#263c38" roughness={0.7} />
        </mesh>
      ))}

      <mesh position={[0, 1.96, 0.466]} scale={[1, 0.5, 0.35]}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshStandardMaterial color="#d58472" roughness={0.75} />
      </mesh>

      <mesh position={[0, 2.4, 0]} scale={[1, 0.55, 1]} castShadow>
        <sphereGeometry args={[0.51, 16, 10]} />
        <meshStandardMaterial color="#ffd45c" roughness={0.72} flatShading />
      </mesh>
      <mesh position={[0, 2.32, 0.06]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} />
        <meshStandardMaterial color="#f5bd3f" roughness={0.72} flatShading />
      </mesh>
      <mesh position={[0, 2.42, 0.48]}>
        <boxGeometry args={[0.18, 0.18, 0.05]} />
        <meshStandardMaterial color="#3f8058" roughness={0.68} />
      </mesh>
    </group>
  );
}

function PlayerTorso() {
  return (
    <group>
      <mesh position={[0, 1.25, 0]} scale={[0.58, 0.68, 0.4]} castShadow>
        <sphereGeometry args={[0.72, 14, 10]} />
        <meshStandardMaterial color="#2e7d68" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[0, 1.26, 0.295]}>
        <boxGeometry args={[0.16, 0.72, 0.045]} />
        <meshStandardMaterial color="#d8f06b" roughness={0.72} />
      </mesh>
      <mesh position={[0.21, 1.43, 0.32]}>
        <boxGeometry args={[0.2, 0.14, 0.04]} />
        <meshStandardMaterial color="#f4fbef" roughness={0.78} />
      </mesh>
    </group>
  );
}

type LimbProps = {
  side: "left" | "right";
  limbRef: RefObject<Group | null>;
};

function PlayerArm({ side, limbRef }: LimbProps) {
  const direction = side === "left" ? -1 : 1;

  return (
    <group ref={limbRef} position={[direction * 0.54, 1.48, 0]} rotation={[0, 0, direction * -0.08]}>
      <mesh position={[0, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.42, 6, 10]} />
        <meshStandardMaterial color="#2e7d68" roughness={0.84} flatShading />
      </mesh>
      <mesh position={[0, -0.65, 0]} castShadow>
        <sphereGeometry args={[0.15, 12, 8]} />
        <meshStandardMaterial color="#f2c6a0" roughness={0.86} flatShading />
      </mesh>
    </group>
  );
}

function PlayerLeg({ side, limbRef }: LimbProps) {
  const direction = side === "left" ? -1 : 1;

  return (
    <group ref={limbRef} position={[direction * 0.22, 0.88, 0]}>
      <mesh position={[0, -0.32, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.4, 6, 10]} />
        <meshStandardMaterial color="#35566b" roughness={0.86} flatShading />
      </mesh>
      <mesh position={[0, -0.7, 0.08]} scale={[1, 0.75, 1.45]} castShadow>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color="#f4f0df" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

export function Player({
  animation: requestedAnimation,
  playerRef: externalPlayerRef,
  position = PLAYER_SPAWN_POSITION,
}: PlayerProps) {
  const internalPlayerRef = useRef<Group>(null);
  const playerRef = externalPlayerRef ?? internalPlayerRef;
  const leftArmRef = useRef<Group>(null);
  const rightArmRef = useRef<Group>(null);
  const leftLegRef = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);
  const movementDirectionRef = useRef(new Vector3());
  const controlsRef = usePlayerControls();

  useFrame(({ clock }, delta) => {
    const player = playerRef.current;
    const leftArm = leftArmRef.current;
    const rightArm = rightArmRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;

    if (!player || !leftArm || !rightArm || !leftLeg || !rightLeg) {
      return;
    }

    const elapsed = clock.elapsedTime;
    const movementDirection = movementDirectionRef.current;
    const isMoving = writeMovementDirection(controlsRef.current, movementDirection);

    if (isMoving) {
      movePlayerWithCollisions(player.position, movementDirection, PLAYER_MOVE_SPEED * delta);

      const targetRotation = Math.atan2(movementDirection.x, movementDirection.z);
      player.rotation.y = dampAngle(
        player.rotation.y,
        targetRotation,
        PLAYER_ROTATION_SMOOTHING,
        delta,
      );
    }

    const animation =
      requestedAnimation === undefined
        ? isMoving
          ? "walk"
          : "idle"
        : resolvePlayerAnimation(requestedAnimation);

    if (animation === "walk") {
      const stride = Math.sin(elapsed * 8);

      player.position.y = position[1] + Math.abs(stride) * 0.045;
      leftArm.rotation.x = stride * 0.55;
      rightArm.rotation.x = -stride * 0.55;
      leftLeg.rotation.x = -stride * 0.48;
      rightLeg.rotation.x = stride * 0.48;
      return;
    }

    const idleMotion = Math.sin(elapsed * 2.2);

    player.position.y = position[1] + idleMotion * 0.022;
    leftArm.rotation.x = idleMotion * 0.035;
    rightArm.rotation.x = -idleMotion * 0.035;
    leftLeg.rotation.x = 0;
    rightLeg.rotation.x = 0;
  });

  return (
    <group ref={playerRef} name="player" position={position}>
      <PlayerTorso />
      <PlayerHead />
      <PlayerArm side="left" limbRef={leftArmRef} />
      <PlayerArm side="right" limbRef={rightArmRef} />
      <PlayerLeg side="left" limbRef={leftLegRef} />
      <PlayerLeg side="right" limbRef={rightLegRef} />
    </group>
  );
}
