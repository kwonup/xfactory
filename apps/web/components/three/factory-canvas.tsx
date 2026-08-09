"use client";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { FactoryScene } from "./factory-scene";

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
      camera={{ fov: 44, near: 0.1, far: 120, position: [14, 12, 18] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<SceneLoadingFallback />}>
        <FactoryScene />
      </Suspense>
    </Canvas>
  );
}
