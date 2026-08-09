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
      camera={{ fov: 40, near: 0.1, far: 100, position: [17, 15, 19] }}
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
