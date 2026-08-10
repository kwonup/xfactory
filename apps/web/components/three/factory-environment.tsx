import {
  PERIMETER_FENCE_SEGMENTS,
  RETAINING_WALL_SEGMENTS,
  ROAD_CROSSWALKS,
} from "@/features/environment/industrial-layout";

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
        <meshStandardMaterial color="#82bc70" roughness={1} />
      </mesh>

      <Surface color="#9dce82" position={[0, 0.04, 0]} size={[32.8, 28.8]} thickness={0.08} />
    </group>
  );
}

function RoadCrosswalk({
  orientation,
  position,
}: {
  orientation: "east-west" | "north-south";
  position: Position;
}) {
  const barOffsets = [-0.72, -0.48, -0.24, 0, 0.24, 0.48, 0.72];

  return (
    <group position={position}>
      {barOffsets.map((offset) => (
        <Surface
          key={`crosswalk-${orientation}-${offset}`}
          color="#eef0e8"
          position={orientation === "north-south" ? [0, 0, offset] : [offset, 0, 0]}
          size={orientation === "north-south" ? [1.75, 0.14] : [0.14, 1.75]}
          thickness={0.025}
        />
      ))}
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

      <Surface color="#dce3df" position={[0, 0.18, -9.72]} size={[26, 0.08]} thickness={0.025} />
      <Surface color="#dce3df" position={[0, 0.18, -6.78]} size={[26, 0.08]} thickness={0.025} />
      <Surface color="#dce3df" position={[0, 0.18, 5.78]} size={[26, 0.08]} thickness={0.025} />
      <Surface color="#dce3df" position={[0, 0.18, 8.72]} size={[26, 0.08]} thickness={0.025} />

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

      {ROAD_CROSSWALKS.map((crosswalk) => (
        <RoadCrosswalk
          key={crosswalk.id}
          orientation={crosswalk.orientation}
          position={crosswalk.position}
        />
      ))}
    </group>
  );
}

function FactorySafetyMarkings() {
  const stripeOffsets = [-4.2, -3.72, -3.24, -2.76, -2.28, -1.8, -1.32, -0.84];

  return (
    <group>
      <Surface color="#e4b842" position={[3.08, 0.278, -2.52]} size={[0.11, 4.65]} thickness={0.025} />
      <Surface color="#e4b842" position={[8.72, 0.278, -2.52]} size={[0.11, 4.65]} thickness={0.025} />
      <Surface color="#e4b842" position={[5.9, 0.278, -0.24]} size={[5.75, 0.11]} thickness={0.025} />

      {stripeOffsets.map((z, index) => (
        <Surface
          key={`hazard-stripe-${z}`}
          color={index % 2 === 0 ? "#e7b83f" : "#4f595a"}
          position={[8.92, 0.28, z]}
          size={[0.22, 0.38]}
          thickness={0.028}
        />
      ))}

      {[-0.75, -0.25, 0.25, 0.75].map((x) => (
        <Surface
          key={`pedestrian-lane-${x}`}
          color="#f0ead8"
          position={[x, 0.279, 2.86]}
          size={[0.28, 2.35]}
          thickness={0.025}
        />
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

      <FactorySafetyMarkings />
    </group>
  );
}

function PerimeterFenceSegment({
  length,
  position,
  rotation,
}: {
  length: number;
  position: Position;
  rotation: number;
}) {
  const postCount = Math.floor(length / 2) + 1;
  const postPositions = Array.from(
    { length: postCount },
    (_, index) => -length / 2 + (length / (postCount - 1)) * index,
  );

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {postPositions.map((x) => (
        <group key={`fence-post-${x}`} position={[x, 0, 0]}>
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[0.1, 1.5, 0.1]} />
            <meshStandardMaterial color="#5d6d6b" roughness={0.78} />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.24, 0.18, 0.24]} />
            <meshStandardMaterial color="#b8bab3" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {[0.45, 0.85, 1.25].map((y) => (
        <mesh key={`fence-rail-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[length, 0.055, 0.055]} />
          <meshStandardMaterial color="#73817e" metalness={0.2} roughness={0.64} />
        </mesh>
      ))}
    </group>
  );
}

function IndustrialBoundary() {
  return (
    <group>
      {RETAINING_WALL_SEGMENTS.map((wall) => (
        <mesh key={wall.id} position={wall.position} receiveShadow>
          <boxGeometry args={wall.size} />
          <meshStandardMaterial color="#adb2aa" roughness={0.94} flatShading />
        </mesh>
      ))}
      {PERIMETER_FENCE_SEGMENTS.map((segment) => (
        <PerimeterFenceSegment
          key={segment.id}
          length={segment.length}
          position={segment.position}
          rotation={segment.rotation}
        />
      ))}
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
    { position: [-12.5, -2.05, -14.5], scale: [8, 1.55, 3.2] },
    { position: [3.5, -2.2, -15.2], scale: [10, 1.7, 3.3] },
    { position: [14.6, -2.05, -13.1], scale: [5.5, 1.5, 3.4] },
    { position: [-16.45, -2.15, 0], scale: [3.4, 1.55, 8.5] },
    { position: [16.45, -2.15, 1.5], scale: [3.4, 1.55, 8.5] },
  ];

  return (
    <group>
      {hills.map(({ position, scale }, index) => (
        <mesh key={`boundary-hill-${index}`} position={position} scale={scale} receiveShadow>
          <sphereGeometry args={[1, 16, 10]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#75ae6c" : "#80b875"} roughness={1} flatShading />
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
      <IndustrialBoundary />
      <BoundaryHills />
      <NatureDetails />
    </group>
  );
}
