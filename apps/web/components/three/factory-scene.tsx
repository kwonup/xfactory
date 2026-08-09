import { Edges, Grid } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";

type FoundationBlockProps = {
  position: [number, number, number];
  scale: [number, number, number];
};

function SceneCamera() {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.lookAt(0, 0.5, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function FoundationBlock({ position, scale }: FoundationBlockProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="#121914" metalness={0.45} roughness={0.55} />
      <Edges color="#6d8729" threshold={15} />
    </mesh>
  );
}

export function FactoryScene() {
  return (
    <>
      <SceneCamera />
      <color attach="background" args={["#060a07"]} />
      <fog attach="fog" args={["#060a07", 18, 40]} />

      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#d9ffad", "#071009", 1.1]} />
      <directionalLight color="#eaffc0" intensity={2.6} position={[7, 10, 6]} />

      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#0a0f0b" metalness={0.15} roughness={0.9} />
      </mesh>

      <Grid
        args={[32, 32]}
        position={[0, 0, 0]}
        cellColor="#1d2a20"
        cellSize={1}
        cellThickness={0.7}
        sectionColor="#506324"
        sectionSize={4}
        sectionThickness={1.1}
        fadeDistance={32}
        fadeStrength={1}
      />

      <FoundationBlock position={[-3.8, 0.5, -2]} scale={[2.4, 1, 1.5]} />
      <FoundationBlock position={[0, 0.9, -3.4]} scale={[2.8, 1.8, 1.2]} />
      <FoundationBlock position={[3.8, 0.65, -1]} scale={[1.7, 1.3, 2]} />

      <mesh position={[0, 0.06, 2.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.65, 1.72, 64]} />
        <meshBasicMaterial color="#c7ff2d" transparent opacity={0.8} />
      </mesh>
    </>
  );
}
