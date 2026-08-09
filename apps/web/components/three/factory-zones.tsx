import type { ReactNode } from "react";

import { CORE_VALUE_STATIONS } from "@/features/core-values/value-stations";

type Position = [number, number, number];

type BuildingProps = {
  accent: string;
  children?: ReactNode;
  position: Position;
  roof: string;
  size: Position;
  wall: string;
};

function Building({ accent, children, position, roof, size, wall }: BuildingProps) {
  return (
    <group position={position}>
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={wall} roughness={0.88} flatShading />
      </mesh>
      <mesh position={[0, size[1] + 0.16, 0]} castShadow>
        <boxGeometry args={[size[0] + 0.28, 0.28, size[2] + 0.28]} />
        <meshStandardMaterial color={roof} roughness={0.82} flatShading />
      </mesh>
      <mesh position={[0, size[1] * 0.58, size[2] / 2 + 0.012]}>
        <boxGeometry args={[size[0] * 0.62, size[1] * 0.38, 0.04]} />
        <meshStandardMaterial color={accent} roughness={0.42} />
      </mesh>
      {children}
    </group>
  );
}

function WelcomePlaza() {
  const accent = "#4f9f74";

  return (
    <group position={[0, 0.28, 3.75]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.85, 1.85, 0.1, 28]} />
        <meshStandardMaterial color="#f0ead7" roughness={0.94} flatShading />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.46, 1.58, 32]} />
        <meshStandardMaterial color={accent} roughness={0.84} />
      </mesh>

      {[-1.2, 1.2].map((x) => (
        <mesh key={`welcome-post-${x}`} position={[x, 1.1, -1.15]} castShadow>
          <boxGeometry args={[0.16, 2.2, 0.16]} />
          <meshStandardMaterial color="#6e806f" roughness={0.86} />
        </mesh>
      ))}
      <mesh position={[0, 1.6, -1.15]} castShadow>
        <boxGeometry args={[2.7, 0.82, 0.18]} />
        <meshStandardMaterial color="#f8f4e8" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.6, -1.05]}>
        <boxGeometry args={[1.7, 0.12, 0.04]} />
        <meshStandardMaterial color={accent} roughness={0.66} />
      </mesh>

    </group>
  );
}

function CompanyVisionLab() {
  const accent = "#64b9d7";

  return (
    <group>
      <Building
        accent={accent}
        position={[-6.1, 0.28, -3.15]}
        roof="#3e7180"
        size={[4.45, 2.45, 3.15]}
        wall="#e8f1eb"
      >
        <mesh position={[-1.45, 0.76, 1.6]} castShadow>
          <boxGeometry args={[0.78, 1.45, 0.08]} />
          <meshStandardMaterial color="#4e786f" roughness={0.72} />
        </mesh>
        <mesh position={[1.55, 2.8, 0]} castShadow>
          <boxGeometry args={[0.62, 0.5, 0.62]} />
          <meshStandardMaterial color={accent} roughness={0.66} />
        </mesh>
      </Building>
    </group>
  );
}

function Conveyor() {
  return (
    <group position={[5.85, 0.9, -1.9]}>
      <mesh castShadow>
        <boxGeometry args={[3.1, 0.22, 0.9]} />
        <meshStandardMaterial color="#668087" roughness={0.66} />
      </mesh>
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x) => (
        <mesh key={`factory-roller-${x}`} position={[x, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.72, 10]} />
          <meshStandardMaterial color="#b8c5c3" metalness={0.25} roughness={0.52} />
        </mesh>
      ))}
      {[-1.25, 1.25].map((x) => (
        <group key={`factory-conveyor-leg-${x}`}>
          <mesh position={[x, -0.45, -0.32]} castShadow>
            <boxGeometry args={[0.12, 0.7, 0.12]} />
            <meshStandardMaterial color="#53676c" roughness={0.72} />
          </mesh>
          <mesh position={[x, -0.45, 0.32]} castShadow>
            <boxGeometry args={[0.12, 0.7, 0.12]} />
            <meshStandardMaterial color="#53676c" roughness={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RobotArm() {
  return (
    <group position={[4.1, 0.38, -3.25]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.58, 0.4, 12]} />
        <meshStandardMaterial color="#526469" roughness={0.62} />
      </mesh>
      <mesh position={[0.08, 0.95, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.17, 0.22, 1.5, 10]} />
        <meshStandardMaterial color="#f0aa4f" roughness={0.66} flatShading />
      </mesh>
      <mesh position={[0.58, 1.62, 0]} rotation={[0, 0, -0.95]} castShadow>
        <cylinderGeometry args={[0.13, 0.17, 1.15, 10]} />
        <meshStandardMaterial color="#e18f42" roughness={0.66} flatShading />
      </mesh>
      <mesh position={[1.03, 1.88, 0]} castShadow>
        <sphereGeometry args={[0.2, 10, 8]} />
        <meshStandardMaterial color="#f6c66c" roughness={0.62} flatShading />
      </mesh>
    </group>
  );
}

function SmartFactory() {
  return (
    <group>
      <mesh position={[5.9, 0.35, -3.1]} receiveShadow>
        <boxGeometry args={[5.15, 0.14, 4.15]} />
        <meshStandardMaterial color="#d8d2c4" roughness={0.92} />
      </mesh>
      {[-1.95, 1.95].flatMap((x) =>
        [-1.45, 1.45].map((z) => (
          <mesh key={`factory-canopy-${x}-${z}`} position={[5.9 + x, 1.65, -3.1 + z]} castShadow>
            <boxGeometry args={[0.16, 2.6, 0.16]} />
            <meshStandardMaterial color="#5e7478" roughness={0.7} />
          </mesh>
        )),
      )}
      <mesh position={[5.9, 3, -3.1]} castShadow>
        <boxGeometry args={[4.7, 0.28, 3.55]} />
        <meshStandardMaterial color="#7ea5a4" roughness={0.78} flatShading />
      </mesh>
      <RobotArm />
      <Conveyor />
    </group>
  );
}

function AiSdmLab() {
  const accent = "#8878c7";

  return (
    <group>
      <Building
        accent={accent}
        position={[-6.05, 0.28, 2.5]}
        roof="#665a99"
        size={[4.35, 2.35, 3.2]}
        wall="#e9e5f0"
      >
        <mesh position={[0, 3.05, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1.15, 8]} />
          <meshStandardMaterial color="#576873" roughness={0.65} />
        </mesh>
        {[0.22, 0.42].map((radius, index) => (
          <mesh key={`ai-signal-${radius}`} position={[0, 3.55 + index * 0.26, 0]}>
            <torusGeometry args={[radius, 0.04, 8, 20]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} />
          </mesh>
        ))}
      </Building>
    </group>
  );
}

function CoreValuePark() {
  return (
    <group position={[0, 0.28, -0.45]}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.35, 2.35, 0.1, 28]} />
        <meshStandardMaterial color="#bdd89a" roughness={0.96} flatShading />
      </mesh>
      {CORE_VALUE_STATIONS.map((station) => (
        <group key={station.id} name={station.id} position={station.visualPosition}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.52, 0.78, 8]} />
            <meshStandardMaterial color={station.accent} roughness={0.8} flatShading />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <dodecahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color="#fff4c9"
              emissive={station.accent}
              emissiveIntensity={0.08}
              roughness={0.68}
              flatShading
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.5, 1.1, 12]} />
        <meshStandardMaterial color="#f3e7c5" roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow>
        <icosahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color="#f4ce62" roughness={0.64} flatShading />
      </mesh>
    </group>
  );
}

function GardenBench({ position, rotation = 0 }: { position: Position; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[1.25, 0.14, 0.45]} />
        <meshStandardMaterial color="#b78155" roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.87, -0.18]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[1.25, 0.55, 0.12]} />
        <meshStandardMaterial color="#b78155" roughness={0.84} />
      </mesh>
      {[-0.45, 0.45].map((x) => (
        <mesh key={`bench-leg-${x}`} position={[x, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.42, 0.34]} />
          <meshStandardMaterial color="#60706c" roughness={0.78} />
        </mesh>
      ))}
    </group>
  );
}

function IxArea() {
  const accent = "#59a56d";

  return (
    <group position={[6.05, 0.28, 2.65]}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.25, 2.25, 0.1, 28]} />
        <meshStandardMaterial color="#a9d69a" roughness={0.96} flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.28, 32]} />
        <meshStandardMaterial color="#e6dfc9" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.62, 0.92, 14]} />
        <meshStandardMaterial color="#e9e3d5" roughness={0.84} flatShading />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={accent} roughness={0.7} flatShading />
      </mesh>
      <GardenBench position={[0, 0, -1.5]} />
    </group>
  );
}

export function FactoryZones() {
  return (
    <group>
      <WelcomePlaza />
      <CompanyVisionLab />
      <SmartFactory />
      <AiSdmLab />
      <CoreValuePark />
      <IxArea />
    </group>
  );
}
