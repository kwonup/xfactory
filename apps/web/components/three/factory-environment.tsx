import { Edges, Grid, Html } from "@react-three/drei";
import type { ReactNode } from "react";

const FACTORY_WIDTH = 26;
const FACTORY_DEPTH = 24;

type Position = [number, number, number];

type AreaPlatformProps = {
  index: string;
  label: string;
  accent: string;
  position: Position;
  children: ReactNode;
};

type BeamProps = {
  position: Position;
  scale: Position;
};

function Beam({ position, scale }: BeamProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="#151c17" metalness={0.72} roughness={0.4} />
      <Edges color="#303b33" threshold={15} />
    </mesh>
  );
}

function FactoryShell() {
  const columnX = [-12, -6, 0, 6, 12];
  const roofZ = [-10.5, 0, 10.5];

  return (
    <group>
      <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[FACTORY_WIDTH, FACTORY_DEPTH]} />
        <meshStandardMaterial color="#090e0a" metalness={0.18} roughness={0.9} />
      </mesh>

      <Grid
        args={[FACTORY_WIDTH, FACTORY_DEPTH]}
        position={[0, 0, 0]}
        cellColor="#1b261e"
        cellSize={1}
        cellThickness={0.65}
        sectionColor="#465624"
        sectionSize={4}
        sectionThickness={1}
        fadeDistance={34}
        fadeStrength={1}
      />

      <Beam position={[0, 0.15, -11.6]} scale={[13, 0.3, 0.25]} />
      <Beam position={[0, 0.15, 11.6]} scale={[13, 0.3, 0.25]} />
      <Beam position={[-12.7, 0.15, 0]} scale={[0.25, 0.3, 11.5]} />
      <Beam position={[12.7, 0.15, 0]} scale={[0.25, 0.3, 11.5]} />

      {columnX.map((x) => (
        <group key={`columns-${x}`}>
          <Beam position={[x, 3.4, -11.2]} scale={[0.18, 3.4, 0.18]} />
          <Beam position={[x, 3.4, 11.2]} scale={[0.18, 3.4, 0.18]} />
        </group>
      ))}

      {roofZ.map((z) => (
        <group key={`roof-${z}`}>
          <Beam position={[0, 6.7, z]} scale={[12.2, 0.16, 0.16]} />
          <mesh position={[0, 6.45, z]}>
            <boxGeometry args={[5.2, 0.06, 0.3]} />
            <meshBasicMaterial color="#d8ff9a" toneMapped={false} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 3.15, -11.45]}>
        <boxGeometry args={[24.5, 6.2, 0.12]} />
        <meshStandardMaterial color="#0b110d" metalness={0.45} roughness={0.7} />
      </mesh>

      {[-8, -4, 0, 4, 8].map((x) => (
        <mesh key={`wall-panel-${x}`} position={[x, 3.5, -11.34]}>
          <boxGeometry args={[3.4, 2.7, 0.08]} />
          <meshStandardMaterial color="#101813" metalness={0.55} roughness={0.48} />
          <Edges color="#29362e" threshold={15} />
        </mesh>
      ))}
    </group>
  );
}

function AreaPlatform({ index, label, accent, position, children }: AreaPlatformProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[9.6, 0.08, 8.4]} />
        <meshStandardMaterial color="#0c120e" metalness={0.26} roughness={0.72} />
        <Edges color={accent} threshold={15} />
      </mesh>

      <mesh position={[0, 0.07, 3.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.4, 0.06]} />
        <meshBasicMaterial color={accent} transparent opacity={0.8} />
      </mesh>

      <group position={[-3.9, 0, -3.45]}>
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 3.1, 8]} />
          <meshStandardMaterial color="#1c261f" metalness={0.72} roughness={0.4} />
        </mesh>
        <mesh position={[0, 3.15, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      </group>

      <Html position={[0, 3.4, -3.55]} center distanceFactor={13}>
        <div className="factory-area-label" style={{ borderColor: accent }}>
          <span style={{ color: accent }}>{index}</span>
          <strong>{label}</strong>
        </div>
      </Html>

      {children}
    </group>
  );
}

function CompanyArea() {
  const accent = "#74eaff";

  return (
    <AreaPlatform index="AREA 01" label="COMPANY" accent={accent} position={[-6.4, 0, -6.1]}>
      <mesh position={[0, 1.35, -0.6]}>
        <boxGeometry args={[4.8, 2.7, 0.35]} />
        <meshStandardMaterial color="#101a1c" metalness={0.55} roughness={0.42} />
        <Edges color="#315760" threshold={15} />
      </mesh>
      <mesh position={[0, 1.45, -0.39]}>
        <planeGeometry args={[4.15, 1.8]} />
        <meshStandardMaterial
          color="#10282d"
          emissive={accent}
          emissiveIntensity={0.28}
          toneMapped={false}
        />
      </mesh>
      {[-1.7, 0, 1.7].map((x) => (
        <mesh key={`company-plinth-${x}`} position={[x, 0.32, 2]}>
          <boxGeometry args={[1.1, 0.64, 1.1]} />
          <meshStandardMaterial color="#111916" metalness={0.65} roughness={0.38} />
          <Edges color={accent} threshold={15} />
        </mesh>
      ))}
    </AreaPlatform>
  );
}

function Conveyor() {
  return (
    <group position={[0.4, 0.8, 0.7]}>
      <mesh>
        <boxGeometry args={[5.7, 0.24, 1.45]} />
        <meshStandardMaterial color="#1b211d" metalness={0.7} roughness={0.35} />
        <Edges color="#8e6526" threshold={15} />
      </mesh>
      {[-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((x) => (
        <mesh key={`roller-${x}`} position={[x, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 1.18, 12]} />
          <meshStandardMaterial color="#4a514c" metalness={0.86} roughness={0.26} />
        </mesh>
      ))}
      {[-2.4, 2.4].map((x) => (
        <group key={`conveyor-leg-${x}`}>
          <mesh position={[x, -0.52, -0.5]}>
            <boxGeometry args={[0.16, 0.85, 0.16]} />
            <meshStandardMaterial color="#202823" metalness={0.75} roughness={0.32} />
          </mesh>
          <mesh position={[x, -0.52, 0.5]}>
            <boxGeometry args={[0.16, 0.85, 0.16]} />
            <meshStandardMaterial color="#202823" metalness={0.75} roughness={0.32} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RobotArm() {
  const accent = "#ffb44f";

  return (
    <group position={[-2.6, 0.15, -1.5]}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.65, 0.82, 0.44, 16]} />
        <meshStandardMaterial color="#242b26" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, -0.28]}>
        <cylinderGeometry args={[0.22, 0.3, 1.65, 12]} />
        <meshStandardMaterial color={accent} metalness={0.35} roughness={0.48} />
      </mesh>
      <mesh position={[0.55, 1.85, 0]} rotation={[0, 0, -0.95]}>
        <cylinderGeometry args={[0.16, 0.22, 1.5, 12]} />
        <meshStandardMaterial color="#d78331" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[1.12, 2.2, 0]}>
        <sphereGeometry args={[0.24, 14, 14]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

function SmartFactoryArea() {
  return (
    <AreaPlatform
      index="AREA 02"
      label="SMART FACTORY"
      accent="#ffb44f"
      position={[6.4, 0, -6.1]}
    >
      <Conveyor />
      <RobotArm />
    </AreaPlatform>
  );
}

function ServerRack({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.35, 2.5, 1.1]} />
        <meshStandardMaterial color="#11151c" metalness={0.72} roughness={0.36} />
        <Edges color="#42366c" threshold={15} />
      </mesh>
      {[0.55, 1.05, 1.55, 2.05].map((y) => (
        <mesh key={`rack-light-${y}`} position={[0, y, 0.56]}>
          <boxGeometry args={[0.82, 0.06, 0.025]} />
          <meshBasicMaterial color="#a98cff" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function AiSdmArea() {
  const accent = "#a98cff";

  return (
    <AreaPlatform index="AREA 03" label="AI / SDM" accent={accent} position={[-6.4, 0, 5.1]}>
      <ServerRack position={[-2.3, 0, -0.65]} />
      <ServerRack position={[2.3, 0, -0.65]} />
      <group position={[0, 0, 0.9]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.78, 1.05, 1.8, 24]} />
          <meshStandardMaterial color="#171321" metalness={0.58} roughness={0.35} />
          <Edges color={accent} threshold={15} />
        </mesh>
        <mesh position={[0, 1.88, 0]}>
          <torusGeometry args={[0.72, 0.07, 10, 36]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
        <mesh position={[0, 2.45, 0]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshBasicMaterial color={accent} wireframe toneMapped={false} />
        </mesh>
      </group>
    </AreaPlatform>
  );
}

function IxArea() {
  const accent = "#c7ff2d";

  return (
    <AreaPlatform index="AREA 04" label="IX AREA" accent={accent} position={[6.4, 0, 5.1]}>
      <group position={[0, 0.05, 0.5]}>
        <mesh>
          <cylinderGeometry args={[2.45, 2.45, 0.18, 48]} />
          <meshStandardMaterial color="#11180d" metalness={0.52} roughness={0.46} />
          <Edges color={accent} threshold={15} />
        </mesh>
        <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.65, 1.72, 64]} />
          <meshBasicMaterial color={accent} transparent opacity={0.86} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.68, 0.88, 1.2, 24]} />
          <meshStandardMaterial color="#1a2316" metalness={0.62} roughness={0.36} />
          <Edges color="#638019" threshold={15} />
        </mesh>
      </group>
    </AreaPlatform>
  );
}

export function FactoryEnvironment() {
  return (
    <group>
      <FactoryShell />
      <CompanyArea />
      <SmartFactoryArea />
      <AiSdmArea />
      <IxArea />
    </group>
  );
}
