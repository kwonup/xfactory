type Position = [number, number, number];

const TREE_POSITIONS: Position[] = [
  [-14.2, 0, -9.7],
  [-14.5, 0, 8.7],
  [-8.4, 0, 11.8],
  [8.6, 0, 11.6],
  [14.4, 0, 8.6],
  [14.3, 0, -9.5],
];

const BUSH_POSITIONS: Position[] = [
  [-11.1, 0, -11.3],
  [-5.5, 0, 11.8],
  [5.7, 0, 11.8],
  [11.1, 0, -11.2],
  [-14.4, 0, 3.8],
  [14.5, 0, 3.4],
];

type SurfaceProps = {
  color: string;
  position: Position;
  size: [number, number];
  thickness?: number;
};

function Surface({ color, position, size, thickness = 0.12 }: SurfaceProps) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[size[0], thickness, size[1]]} />
      <meshStandardMaterial color={color} roughness={0.92} />
    </mesh>
  );
}

function GrassIsland() {
  return (
    <group>
      <mesh position={[0, -0.38, 0]} receiveShadow>
        <boxGeometry args={[34, 0.8, 30]} />
        <meshStandardMaterial color="#8fcf75" roughness={1} />
      </mesh>

      <Surface color="#a8dc8a" position={[0, 0.04, 0]} size={[32.8, 28.8]} thickness={0.08} />
    </group>
  );
}

function RoadLoop() {
  const roadColor = "#657276";
  const sidewalkColor = "#e8e3d2";

  return (
    <group>
      <Surface color={roadColor} position={[0, 0.1, -8.25]} size={[26, 3]} />
      <Surface color={roadColor} position={[0, 0.1, 7.25]} size={[26, 3]} />
      <Surface color={roadColor} position={[-11.5, 0.1, -0.5]} size={[3, 12.5]} />
      <Surface color={roadColor} position={[11.5, 0.1, -0.5]} size={[3, 12.5]} />

      <Surface color={sidewalkColor} position={[0, 0.18, -6.42]} size={[20.8, 0.68]} />
      <Surface color={sidewalkColor} position={[0, 0.18, 5.42]} size={[20.8, 0.68]} />
      <Surface color={sidewalkColor} position={[-9.67, 0.18, -0.5]} size={[0.68, 11.2]} />
      <Surface color={sidewalkColor} position={[9.67, 0.18, -0.5]} size={[0.68, 11.2]} />

      {[-9, -6, -3, 0, 3, 6, 9].map((x) => (
        <group key={`horizontal-mark-${x}`}>
          <Surface color="#f7e7a8" position={[x, 0.19, -8.25]} size={[1.45, 0.1]} thickness={0.025} />
          <Surface color="#f7e7a8" position={[x, 0.19, 7.25]} size={[1.45, 0.1]} thickness={0.025} />
        </group>
      ))}

      {[-4.5, -1.5, 1.5, 4.5].map((z) => (
        <group key={`vertical-mark-${z}`}>
          <Surface color="#f7e7a8" position={[-11.5, 0.19, z]} size={[0.1, 1.35]} thickness={0.025} />
          <Surface color="#f7e7a8" position={[11.5, 0.19, z]} size={[0.1, 1.35]} thickness={0.025} />
        </group>
      ))}
    </group>
  );
}

function FactoryFloor() {
  return (
    <group>
      <Surface color="#d9d7ce" position={[0, 0.14, -0.5]} size={[18.6, 11.2]} thickness={0.2} />

      {[-6.2, 0, 6.2].map((x) => (
        <Surface
          key={`floor-joint-x-${x}`}
          color="#c4c4bc"
          position={[x, 0.255, -0.5]}
          size={[0.055, 10.7]}
          thickness={0.018}
        />
      ))}

      {[-3.9, 2.9].map((z) => (
        <Surface
          key={`floor-joint-z-${z}`}
          color="#c4c4bc"
          position={[0, 0.255, z]}
          size={[18.1, 0.055]}
          thickness={0.018}
        />
      ))}

      <mesh position={[0, 0.29, 4.62]} receiveShadow>
        <boxGeometry args={[5.4, 0.04, 0.3]} />
        <meshStandardMaterial color="#f2c94c" roughness={0.78} />
      </mesh>
    </group>
  );
}

function LowPolyTree({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.26, 1.7, 8]} />
        <meshStandardMaterial color="#8d6847" roughness={0.96} />
      </mesh>
      <mesh position={[0, 2.02, 0]} castShadow>
        <coneGeometry args={[1.05, 1.9, 7]} />
        <meshStandardMaterial color="#4d9c62" roughness={0.96} flatShading />
      </mesh>
      <mesh position={[0, 2.78, 0]} castShadow>
        <coneGeometry args={[0.72, 1.35, 7]} />
        <meshStandardMaterial color="#67b96f" roughness={0.96} flatShading />
      </mesh>
    </group>
  );
}

function Bush({ position }: { position: Position }) {
  return (
    <mesh position={[position[0], 0.42, position[2]]} scale={[1.1, 0.7, 0.85]} castShadow>
      <dodecahedronGeometry args={[0.65, 0]} />
      <meshStandardMaterial color="#63ad67" roughness={1} flatShading />
    </mesh>
  );
}

function BoundaryHills() {
  const hills: Array<{ position: Position; scale: Position }> = [
    { position: [-12.5, -1.6, -14.2], scale: [8, 2.4, 3.2] },
    { position: [3.5, -1.9, -15], scale: [10, 2.7, 3.3] },
    { position: [14.6, -1.6, -12.8], scale: [5.5, 2.2, 3.4] },
    { position: [-16.2, -1.8, 0], scale: [3.4, 2.2, 8.5] },
    { position: [16.2, -1.8, 1.5], scale: [3.4, 2.3, 8.5] },
  ];

  return (
    <group>
      {hills.map(({ position, scale }, index) => (
        <mesh key={`boundary-hill-${index}`} position={position} scale={scale} receiveShadow>
          <sphereGeometry args={[1, 16, 10]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#79bd6e" : "#83c777"} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function NatureDetails() {
  return (
    <group>
      {TREE_POSITIONS.map((position) => (
        <LowPolyTree key={`tree-${position.join("-")}`} position={position} />
      ))}
      {BUSH_POSITIONS.map((position) => (
        <Bush key={`bush-${position.join("-")}`} position={position} />
      ))}
    </group>
  );
}

export function FactoryEnvironment() {
  return (
    <group>
      <GrassIsland />
      <RoadLoop />
      <FactoryFloor />
      <BoundaryHills />
      <NatureDetails />
    </group>
  );
}
