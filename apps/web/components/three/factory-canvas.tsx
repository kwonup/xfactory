"use client";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { FOLLOW_CAMERA_FOV, FOLLOW_CAMERA_OFFSET } from "@/features/player/follow-camera";
import { PLAYER_SPAWN_POSITION } from "@/features/player/player-config";

import { FactoryScene } from "./factory-scene";

const INITIAL_CAMERA_POSITION: [number, number, number] = [
  PLAYER_SPAWN_POSITION[0] + FOLLOW_CAMERA_OFFSET.x,
  PLAYER_SPAWN_POSITION[1] + FOLLOW_CAMERA_OFFSET.y,
  PLAYER_SPAWN_POSITION[2] + FOLLOW_CAMERA_OFFSET.z,
];

function SceneLoadingFallback() {
  return (
    <Html center>
      <div className="scene-asset-loader" role="status" aria-live="polite">
        LOADING ASSETS
      </div>
    </Html>
  );
}

export default function FactoryCanvas() {
  return (
    <Canvas
      camera={{ fov: FOLLOW_CAMERA_FOV, near: 0.1, far: 100, position: INITIAL_CAMERA_POSITION }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows="basic"
    >
      <Suspense fallback={<SceneLoadingFallback />}>
        <FactoryScene />
      </Suspense>
    </Canvas>
  );
}
