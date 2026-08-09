import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";

import { FactoryEnvironment } from "./factory-environment";

function SceneCamera() {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.lookAt(0, 0.8, -0.5);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

export function FactoryScene() {
  return (
    <>
      <SceneCamera />
      <color attach="background" args={["#050806"]} />
      <fog attach="fog" args={["#050806", 24, 48]} />

      <ambientLight intensity={0.58} />
      <hemisphereLight args={["#d9ffad", "#071009", 0.95]} />
      <directionalLight color="#efffce" intensity={2.4} position={[9, 14, 7]} />

      <FactoryEnvironment />
    </>
  );
}
