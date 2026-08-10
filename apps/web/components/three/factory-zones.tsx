import type { ReactNode } from "react";

import { CORE_VALUE_STATIONS } from "@/features/core-values/value-stations";
import {
  INDUSTRIAL_BUILDING_BY_ID,
  PALLET_LOADS,
  SAFETY_BOLLARD_POSITIONS,
  type IndustrialBuildingDefinition,
  type PalletLoad as PalletLoadDefinition,
} from "@/features/environment/industrial-layout";
import { IX_AREA_POSITION, IX_NPC_LOCAL_POSITION } from "@/features/ix/ix-config";

import { IxNpc } from "./ix-npc";

type Position = [number, number, number];

type IndustrialBuildingProps = Pick<
  IndustrialBuildingDefinition,
  "accent" | "baySide" | "position" | "roof" | "size" | "wall"
> & {
  children?: ReactNode;
};

function RoofVentilator({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.2, 10]} />
        <meshStandardMaterial color="#60716f" metalness={0.18} roughness={0.66} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.34, 10]} />
        <meshStandardMaterial color="#81908d" metalness={0.16} roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.54, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.17, 0.12, 10]} />
        <meshStandardMaterial color="#536461" metalness={0.18} roughness={0.64} />
      </mesh>
    </group>
  );
}

function IndustrialBuilding({
  accent,
  baySide,
  children,
  position,
  roof,
  size,
  wall,
}: IndustrialBuildingProps) {
  const frontZ = size[2] / 2 + 0.035;
  const bayX = size[0] * 0.18 * baySide;
  const serviceX = -size[0] * 0.35 * baySide;
  const claddingRibs = Array.from({ length: 11 }, (_, index) =>
    -size[0] / 2 + 0.25 + (index * (size[0] - 0.5)) / 10,
  );

  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[size[0] + 0.34, 0.16, size[2] + 0.34]} />
        <meshStandardMaterial color="#9fa7a3" roughness={0.94} />
      </mesh>
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={wall} roughness={0.88} flatShading />
      </mesh>
      <mesh position={[0, size[1] + 0.14, 0]} castShadow>
        <boxGeometry args={[size[0] + 0.3, 0.28, size[2] + 0.3]} />
        <meshStandardMaterial color={roof} roughness={0.82} flatShading />
      </mesh>

      {claddingRibs.map((x) => (
        <mesh key={`front-cladding-${x}`} position={[x, size[1] * 0.54, frontZ]}>
          <boxGeometry args={[0.035, size[1] * 0.9, 0.035]} />
          <meshStandardMaterial color="#c5cfcb" roughness={0.82} />
        </mesh>
      ))}

      <mesh position={[0, size[1] * 0.84, frontZ + 0.025]} castShadow>
        <boxGeometry args={[size[0] * 0.88, 0.32, 0.08]} />
        <meshStandardMaterial color={accent} roughness={0.66} />
      </mesh>

      <group position={[bayX, size[1] * 0.38, frontZ + 0.045]}>
        <mesh castShadow>
          <boxGeometry args={[1.55, size[1] * 0.62, 0.1]} />
          <meshStandardMaterial color="#718481" metalness={0.12} roughness={0.68} />
        </mesh>
        {[-0.48, -0.24, 0, 0.24, 0.48].map((y) => (
          <mesh key={`bay-door-joint-${y}`} position={[0, y, 0.065]}>
            <boxGeometry args={[1.42, 0.035, 0.025]} />
            <meshStandardMaterial color="#aebbb7" roughness={0.64} />
          </mesh>
        ))}
        <mesh position={[0, -size[1] * 0.33, 0.09]}>
          <boxGeometry args={[1.76, 0.1, 0.08]} />
          <meshStandardMaterial color="#e0ae3d" roughness={0.72} />
        </mesh>
      </group>

      <group position={[serviceX, size[1] * 0.4, frontZ + 0.055]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, size[1] * 0.67, 0.1]} />
          <meshStandardMaterial color="#536b69" roughness={0.7} />
        </mesh>
        <mesh position={[0, size[1] * 0.12, 0.07]}>
          <boxGeometry args={[0.34, 0.11, 0.03]} />
          <meshStandardMaterial color="#9ed5c9" emissive="#5b9e91" emissiveIntensity={0.12} />
        </mesh>
      </group>

      <group position={[-size[0] * 0.17, size[1] + 0.52, -size[2] * 0.12]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.46, 0.82]} />
          <meshStandardMaterial color="#aab7b3" metalness={0.12} roughness={0.72} />
        </mesh>
        {[-0.38, -0.12, 0.14, 0.4].map((x) => (
          <mesh key={`roof-vent-${x}`} position={[x, 0.01, 0.37]}>
            <boxGeometry args={[0.12, 0.22, 0.035]} />
            <meshStandardMaterial color="#637571" roughness={0.7} />
          </mesh>
        ))}
      </group>
      <RoofVentilator position={[size[0] * 0.27, size[1] + 0.28, -size[2] * 0.18]} />
      <RoofVentilator position={[size[0] * 0.39, size[1] + 0.28, -size[2] * 0.18]} />
      {children}
    </group>
  );
}

function IndustrialControlPanel({ accent, position }: { accent: string; position: Position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.82, 0.86, 0.18]} />
        <meshStandardMaterial color="#405854" metalness={0.12} roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.12, 0.105]}>
        <boxGeometry args={[0.62, 0.4, 0.04]} />
        <meshStandardMaterial color="#a8dcd2" emissive={accent} emissiveIntensity={0.14} roughness={0.4} />
      </mesh>
      {[-0.19, 0, 0.19].map((x, index) => (
        <mesh
          key={`panel-button-${x}`}
          position={[x, -0.23, 0.12]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.045, 0.045, 0.035, 10]} />
          <meshStandardMaterial
            color={index === 1 ? "#edc348" : accent}
            emissive={index === 1 ? "#c79725" : accent}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function ExteriorPipeBank({ accent, position }: { accent: string; position: Position }) {
  return (
    <group position={position}>
      {[-0.25, 0, 0.25].map((x, index) => (
        <group key={`service-pipe-${x}`} position={[x, 0, 0]}>
          <mesh position={[0, 0.62, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 1.24, 10]} />
            <meshStandardMaterial color={index === 1 ? accent : "#71817e"} metalness={0.18} roughness={0.62} />
          </mesh>
          <mesh position={[0, 1.22, -0.16]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <torusGeometry args={[0.16, 0.07, 8, 16, Math.PI / 2]} />
            <meshStandardMaterial color={index === 1 ? accent : "#71817e"} metalness={0.18} roughness={0.62} />
          </mesh>
        </group>
      ))}
      {[0.28, 0.88].map((y) => (
        <mesh key={`pipe-bracket-${y}`} position={[0, y, 0.02]}>
          <boxGeometry args={[0.72, 0.08, 0.12]} />
          <meshStandardMaterial color="#4e5c5a" roughness={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function ProcessVessel({ accent, position, scale = 1 }: { accent: string; position: Position; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 1.12, 12]} />
        <meshStandardMaterial color="#aab7b4" metalness={0.2} roughness={0.62} flatShading />
      </mesh>
      <mesh position={[0, 1.13, 0]} castShadow>
        <coneGeometry args={[0.34, 0.28, 12]} />
        <meshStandardMaterial color="#768784" metalness={0.18} roughness={0.62} />
      </mesh>
      {[0.22, 0.82].map((y) => (
        <mesh key={`vessel-band-${y}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.035, 7, 18]} />
          <meshStandardMaterial color={accent} roughness={0.6} />
        </mesh>
      ))}
      {[-0.2, 0.2].map((x) => (
        <mesh key={`vessel-leg-${x}`} position={[x, -0.18, 0]} castShadow>
          <boxGeometry args={[0.08, 0.36, 0.08]} />
          <meshStandardMaterial color="#4f5e5b" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function CoolingFanBank({ accent, position }: { accent: string; position: Position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.28, 0.86, 0.3]} />
        <meshStandardMaterial color="#7d8e8b" metalness={0.12} roughness={0.7} />
      </mesh>
      {[-0.37, 0.37].map((x) => (
        <group key={`cooling-fan-${x}`} position={[x, 0, 0.18]}>
          <mesh>
            <torusGeometry args={[0.25, 0.055, 8, 18]} />
            <meshStandardMaterial color="#435653" roughness={0.62} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.05, 10]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.12} />
          </mesh>
          {[0, Math.PI / 2].map((rotation) => (
            <mesh key={`fan-blade-${rotation}`} rotation={[0, 0, rotation]}>
              <boxGeometry args={[0.34, 0.055, 0.055]} />
              <meshStandardMaterial color="#526663" roughness={0.65} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function WelcomePlaza() {
  const accent = "#4f9f74";

  return (
    <group position={[0, 0.28, 3.75]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.85, 1.85, 0.1, 28]} />
        <meshStandardMaterial color="#c8cbc4" roughness={0.94} flatShading />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.46, 1.58, 32]} />
        <meshStandardMaterial color="#e2b63f" roughness={0.84} />
      </mesh>

      {[-1.2, 1.2].map((x) => (
        <group key={`welcome-gantry-${x}`}>
          <mesh position={[x, 1.1, -1.15]} castShadow>
            <boxGeometry args={[0.18, 2.2, 0.18]} />
            <meshStandardMaterial color="#536765" metalness={0.16} roughness={0.68} />
          </mesh>
          <mesh position={[x, 0.16, -1.15]} castShadow>
            <boxGeometry args={[0.42, 0.16, 0.42]} />
            <meshStandardMaterial color="#8f9995" roughness={0.82} />
          </mesh>
          <mesh position={[x, 2.38, -1.15]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.14, 10]} />
            <meshStandardMaterial color={x < 0 ? "#efbd45" : "#65b77c"} emissive={accent} emissiveIntensity={0.18} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.05, -1.15]} castShadow>
        <boxGeometry args={[2.58, 0.18, 0.18]} />
        <meshStandardMaterial color="#536765" metalness={0.16} roughness={0.68} />
      </mesh>
      {[-0.78, 0.78].map((x) => (
        <mesh key={`gantry-brace-${x}`} position={[x, 1.74, -1.15]} rotation={[0, 0, x < 0 ? -0.62 : 0.62]}>
          <boxGeometry args={[0.82, 0.1, 0.1]} />
          <meshStandardMaterial color="#687b78" metalness={0.12} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 1.58, -1.05]} castShadow>
        <boxGeometry args={[2.25, 0.58, 0.12]} />
        <meshStandardMaterial color="#eef0e8" roughness={0.76} />
      </mesh>
      <mesh position={[0, 1.58, -0.975]}>
        <boxGeometry args={[1.55, 0.1, 0.035]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.08} roughness={0.62} />
      </mesh>
    </group>
  );
}

function CompanyVisionLab() {
  const building = INDUSTRIAL_BUILDING_BY_ID["company-control-building"];

  return (
    <group>
      <IndustrialBuilding
        accent={building.accent}
        baySide={building.baySide}
        position={building.position}
        roof={building.roof}
        size={building.size}
        wall={building.wall}
      >
        <IndustrialControlPanel accent={building.accent} position={[-1.45, 1.12, 1.67]} />
        <ExteriorPipeBank accent={building.accent} position={[1.88, 0.18, 1.68]} />
        <ProcessVessel accent={building.accent} position={[1.58, 2.78, -0.48]} scale={0.78} />
      </IndustrialBuilding>
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

function SafetyBollards() {
  return (
    <group>
      {SAFETY_BOLLARD_POSITIONS.map((position) => (
        <group key={`safety-bollard-${position.join("-")}`} position={position}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.48, 10]} />
            <meshStandardMaterial color="#e9b73f" roughness={0.74} flatShading />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.105, 0.105, 0.08, 10]} />
            <meshStandardMaterial color="#4d5656" roughness={0.68} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PalletLoad({ position, rotation }: PalletLoadDefinition) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-0.38, 0, 0.38].map((z) => (
        <mesh key={`pallet-slat-${z}`} position={[0, 0, z]} castShadow>
          <boxGeometry args={[1.15, 0.1, 0.18]} />
          <meshStandardMaterial color="#9a6b42" roughness={0.9} />
        </mesh>
      ))}
      {[
        [-0.3, 0.3, -0.22],
        [0.3, 0.3, -0.22],
        [-0.3, 0.3, 0.25],
        [0.3, 0.3, 0.25],
        [0, 0.72, 0],
      ].map(([x, y, z], index) => (
        <mesh key={`pallet-box-${index}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.52, 0.48, 0.42]} />
          <meshStandardMaterial
            color={index === 4 ? "#7ca4a0" : "#c89559"}
            roughness={0.86}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function SmartFactoryShell() {
  return (
    <group>
      <mesh position={[5.9, 1.62, -4.69]} castShadow receiveShadow>
        <boxGeometry args={[4.9, 2.55, 0.28]} />
        <meshStandardMaterial color="#dfe7e3" roughness={0.82} flatShading />
      </mesh>
      {[4.82, 6.98].map((x) => (
        <group key={`loading-door-${x}`} position={[x, 1.42, -4.53]}>
          <mesh>
            <boxGeometry args={[1.72, 1.86, 0.06]} />
            <meshStandardMaterial color="#78908e" metalness={0.12} roughness={0.68} />
          </mesh>
          {[-0.65, -0.39, -0.13, 0.13, 0.39, 0.65].map((y) => (
            <mesh key={`loading-door-joint-${y}`} position={[0, y, 0.04]}>
              <boxGeometry args={[1.58, 0.035, 0.025]} />
              <meshStandardMaterial color="#aebbb8" roughness={0.62} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[5.9, 2.62, -4.49]}>
        <boxGeometry args={[4.42, 0.28, 0.08]} />
        <meshStandardMaterial color="#4e716d" roughness={0.62} />
      </mesh>
      {[-1.35, 0, 1.35].map((x) => (
        <mesh key={`canopy-skylight-${x}`} position={[5.9 + x, 3.16, -3.1]} castShadow>
          <boxGeometry args={[0.72, 0.08, 2.75]} />
          <meshStandardMaterial color="#b9d9d5" metalness={0.08} roughness={0.42} />
        </mesh>
      ))}
      {[-1.9, -0.95, 0, 0.95, 1.9].map((x) => (
        <mesh key={`canopy-roof-rib-${x}`} position={[5.9 + x, 3.2, -3.1]} castShadow>
          <boxGeometry args={[0.08, 0.12, 3.45]} />
          <meshStandardMaterial color="#536c6c" metalness={0.14} roughness={0.66} />
        </mesh>
      ))}
    </group>
  );
}

function FactoryPipeRack() {
  return (
    <group position={[5.9, 0.28, -4.5]}>
      {[-1.82, 1.82].map((x) => (
        <group key={`pipe-rack-frame-${x}`} position={[x, 0, 0]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[0.12, 2.4, 0.12]} />
            <meshStandardMaterial color="#4f605e" metalness={0.18} roughness={0.66} />
          </mesh>
          <mesh position={[0, 2.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.12, 0.9]} />
            <meshStandardMaterial color="#4f605e" metalness={0.18} roughness={0.66} />
          </mesh>
        </group>
      ))}
      {[-0.28, 0, 0.28].map((z, index) => (
        <mesh key={`pipe-rack-line-${z}`} position={[0, 2.28, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 3.76, 10]} />
          <meshStandardMaterial
            color={index === 0 ? "#e0a83f" : index === 1 ? "#5ca7bb" : "#7c8d89"}
            metalness={0.14}
            roughness={0.62}
          />
        </mesh>
      ))}
    </group>
  );
}

function FactoryExtractionUnits() {
  return (
    <group>
      <ProcessVessel accent="#e5a34c" position={[4.52, 3.22, -3.92]} scale={0.62} />
      <ProcessVessel accent="#5ca7bb" position={[7.38, 3.22, -3.92]} scale={0.62} />
      <mesh position={[5.95, 3.52, -4.18]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 2.5, 10]} />
        <meshStandardMaterial color="#70827e" metalness={0.16} roughness={0.62} />
      </mesh>
    </group>
  );
}

function VisionInspectionSystem() {
  return (
    <group>
      <group position={[6.52, 2.38, -1.9]}>
        <mesh position={[0, 0.34, 0]} castShadow>
          <boxGeometry args={[0.11, 0.68, 0.11]} />
          <meshStandardMaterial color="#536a69" roughness={0.68} />
        </mesh>
        <mesh position={[0, -0.04, 0]} castShadow>
          <boxGeometry args={[0.34, 0.25, 0.32]} />
          <meshStandardMaterial color="#eef1e8" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
          <meshStandardMaterial
            color="#9dda63"
            emissive="#7fb34d"
            emissiveIntensity={0.32}
            roughness={0.42}
          />
        </mesh>
      </group>
      <group position={[7.42, 1.72, -4.48]}>
        <mesh>
          <boxGeometry args={[1.02, 0.68, 0.09]} />
          <meshStandardMaterial color="#3c5552" roughness={0.58} />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <boxGeometry args={[0.82, 0.48, 0.035]} />
          <meshStandardMaterial
            color="#8ed1c4"
            emissive="#5ba696"
            emissiveIntensity={0.2}
            roughness={0.42}
          />
        </mesh>
      </group>
    </group>
  );
}

function ConveyorProducts() {
  return (
    <group>
      {[
        [5.12, 1.33, -1.9],
        [6.05, 1.31, -1.9],
      ].map((position, index) => (
        <mesh key={`conveyor-product-${index}`} position={position as Position} castShadow>
          <boxGeometry args={[0.48, 0.46, 0.5]} />
          <meshStandardMaterial
            color={index === 0 ? "#d5a05f" : "#7ca9a0"}
            roughness={0.82}
            flatShading
          />
        </mesh>
      ))}
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
        <meshStandardMaterial color="#6f8988" metalness={0.08} roughness={0.74} flatShading />
      </mesh>
      <SmartFactoryShell />
      <FactoryPipeRack />
      <FactoryExtractionUnits />
      <RobotArm />
      <Conveyor />
      <ConveyorProducts />
      <VisionInspectionSystem />
      <SafetyBollards />
      {PALLET_LOADS.map((palletLoad) => (
        <PalletLoad key={palletLoad.id} {...palletLoad} />
      ))}
    </group>
  );
}

function AiSdmLab() {
  const building = INDUSTRIAL_BUILDING_BY_ID["ai-automation-building"];

  return (
    <group>
      <IndustrialBuilding
        accent={building.accent}
        baySide={building.baySide}
        position={building.position}
        roof={building.roof}
        size={building.size}
        wall={building.wall}
      >
        <IndustrialControlPanel accent={building.accent} position={[0.5, 1.08, 1.7]} />
        <CoolingFanBank accent={building.accent} position={[0.55, 2.92, 0.38]} />
        <ExteriorPipeBank accent={building.accent} position={[1.72, 0.18, -1.64]} />
        <mesh position={[0, 3.05, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1.15, 8]} />
          <meshStandardMaterial color="#576873" roughness={0.65} />
        </mesh>
        {[0.22, 0.42].map((radius, index) => (
          <mesh key={`ai-signal-${radius}`} position={[0, 3.55 + index * 0.26, 0]}>
            <torusGeometry args={[radius, 0.04, 8, 20]} />
            <meshStandardMaterial
              color={building.accent}
              emissive={building.accent}
              emissiveIntensity={0.18}
            />
          </mesh>
        ))}
      </IndustrialBuilding>
    </group>
  );
}

function FactoryOperatorStation({
  accent,
  name,
  position,
}: {
  accent: string;
  name: string;
  position: Position;
}) {
  return (
    <group name={name} position={position}>
      <mesh position={[0, -0.04, 0]} castShadow>
        <boxGeometry args={[0.78, 0.62, 0.72]} />
        <meshStandardMaterial color="#536764" metalness={0.12} roughness={0.68} />
      </mesh>
      <mesh position={[0, -0.31, 0]}>
        <boxGeometry args={[0.9, 0.1, 0.84]} />
        <meshStandardMaterial color="#e3b63f" roughness={0.72} />
      </mesh>
      <group position={[0, 0.48, 0.14]} rotation={[-0.28, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.5, 0.14]} />
          <meshStandardMaterial color="#3f514f" metalness={0.12} roughness={0.62} />
        </mesh>
        <mesh position={[0, 0.03, 0.085]}>
          <boxGeometry args={[0.5, 0.26, 0.035]} />
          <meshStandardMaterial color="#b8e0d8" emissive={accent} emissiveIntensity={0.16} roughness={0.4} />
        </mesh>
      </group>
      <mesh position={[0.25, 0.91, -0.12]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 8]} />
        <meshStandardMaterial color="#465956" roughness={0.64} />
      </mesh>
      <mesh position={[0.25, 1.2, -0.12]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 10]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} roughness={0.42} />
      </mesh>
      <mesh position={[-0.31, -0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.32, 10]} />
        <meshStandardMaterial color={accent} metalness={0.12} roughness={0.6} />
      </mesh>
    </group>
  );
}

function CoreValueProcessManifold() {
  return (
    <group>
      <mesh position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.44, 0.5, 1.12, 12]} />
        <meshStandardMaterial color="#7d8d89" metalness={0.18} roughness={0.64} flatShading />
      </mesh>
      {[0.22, 0.82].map((y) => (
        <mesh key={`manifold-band-${y}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.46, 0.045, 8, 20]} />
          <meshStandardMaterial color="#4b5e5b" roughness={0.66} />
        </mesh>
      ))}
      <mesh position={[0, 1.24, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.34, 0.34, 10]} />
        <meshStandardMaterial color="#e0ae3d" roughness={0.62} flatShading />
      </mesh>
      <mesh position={[0, 1.54, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 10]} />
        <meshStandardMaterial color="#586966" roughness={0.62} />
      </mesh>
      <mesh position={[0, 1.71, 0]}>
        <torusGeometry args={[0.2, 0.045, 8, 18]} />
        <meshStandardMaterial color="#e0ae3d" roughness={0.6} />
      </mesh>
    </group>
  );
}

function CoreValuePark() {
  return (
    <group position={[0, 0.28, -0.45]}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.35, 2.35, 0.1, 28]} />
        <meshStandardMaterial color="#b8bcb6" roughness={0.94} flatShading />
      </mesh>
      <mesh position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.08, 2.2, 32]} />
        <meshStandardMaterial color="#e1b33c" roughness={0.76} />
      </mesh>
      {CORE_VALUE_STATIONS.map((station) => {
        const [x, , z] = station.visualPosition;
        const length = Math.hypot(x, z) - 0.34;
        const rotation = Math.atan2(x, z);

        return (
          <mesh
            key={`station-conduit-${station.id}`}
            position={[x / 2, 0.14, z / 2]}
            rotation={[0, rotation, 0]}
            castShadow
          >
            <boxGeometry args={[0.12, 0.1, length]} />
            <meshStandardMaterial color={station.accent} metalness={0.1} roughness={0.66} />
          </mesh>
        );
      })}
      {CORE_VALUE_STATIONS.map((station) => (
        <FactoryOperatorStation
          key={station.id}
          accent={station.accent}
          name={station.id}
          position={station.visualPosition}
        />
      ))}
      <CoreValueProcessManifold />
    </group>
  );
}

function IxServiceDock({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[1.2, 1.24, 0.38]} />
        <meshStandardMaterial color="#536865" metalness={0.12} roughness={0.66} />
      </mesh>
      <mesh position={[0, 0.76, 0.21]}>
        <boxGeometry args={[0.78, 0.42, 0.05]} />
        <meshStandardMaterial color="#a8ddd2" emissive="#4f9f74" emissiveIntensity={0.18} roughness={0.4} />
      </mesh>
      {[-0.34, 0, 0.34].map((x, index) => (
        <mesh key={`dock-status-${x}`} position={[x, 0.3, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.04, 10]} />
          <meshStandardMaterial
            color={index === 1 ? "#efbd45" : "#69bd7d"}
            emissive={index === 1 ? "#d49f27" : "#4d9d60"}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.36, 0.1, 0.56]} />
        <meshStandardMaterial color="#e1b33c" roughness={0.74} />
      </mesh>
      <mesh position={[0.64, 0.74, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 1.1, 10]} />
        <meshStandardMaterial color="#6e807c" metalness={0.12} roughness={0.64} />
      </mesh>
    </group>
  );
}

function IxArea() {
  return (
    <group position={IX_AREA_POSITION}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.25, 2.25, 0.1, 28]} />
        <meshStandardMaterial color="#b9beb7" roughness={0.94} flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.28, 32]} />
        <meshStandardMaterial color="#4f9f74" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.78, 0.28, 14]} />
        <meshStandardMaterial color="#d7dad3" roughness={0.84} flatShading />
      </mesh>
      <IxNpc position={IX_NPC_LOCAL_POSITION} />
      <IxServiceDock position={[0, 0, -1.5]} />
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
