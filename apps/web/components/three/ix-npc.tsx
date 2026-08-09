"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import { resolveIxAnimation } from "@/features/ix/ix-animation";
import { IX_NPC_TARGET_ID } from "@/features/ix/ix-config";
import { useWorldStore } from "@/stores/world-store";

type Position = [number, number, number];

type IxNameplateContentProps = {
  isConversationReady: boolean;
};

type IxNpcProps = {
  animation?: string | null;
  position?: Position;
};

export function IxNameplateContent({ isConversationReady }: IxNameplateContentProps) {
  return (
    <div
      className="ix-nameplate"
      data-state={isConversationReady ? "conversation-ready" : "idle"}
      role="status"
      aria-live="polite"
    >
      <span className="ix-nameplate-mark">IX</span>
      <span className="ix-nameplate-copy">
        <strong>AI ONBOARDING BUDDY</strong>
        <small>
          {isConversationReady
            ? "대화 채널 준비 · ESC로 닫기"
            : "가까이 다가가 E로 대화하기"}
        </small>
      </span>
      <span className="ix-nameplate-signal" aria-hidden="true" />
    </div>
  );
}

function IxHead() {
  return (
    <group position={[0, 1.52, 0]}>
      <mesh castShadow scale={[1, 0.82, 0.78]}>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#f5f1df" roughness={0.74} flatShading />
      </mesh>
      <mesh position={[0, -0.02, 0.43]} scale={[1, 0.72, 1]}>
        <boxGeometry args={[0.72, 0.4, 0.08]} />
        <meshStandardMaterial color="#29463f" roughness={0.46} />
      </mesh>
      {[-0.2, 0.2].map((x) => (
        <mesh key={`ix-eye-${x}`} position={[x, 0.02, 0.49]}>
          <sphereGeometry args={[0.065, 10, 8]} />
          <meshStandardMaterial
            color="#d9ff6f"
            emissive="#bde95d"
            emissiveIntensity={0.65}
            roughness={0.35}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.13, 0.495]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.09, 0.018, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#7fcf94" emissive="#5baf75" emissiveIntensity={0.22} />
      </mesh>
      {[-0.57, 0.57].map((x) => (
        <mesh
          key={`ix-ear-${x}`}
          position={[x, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.13, 10]} />
          <meshStandardMaterial color="#72b985" roughness={0.68} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function IxBody() {
  return (
    <group>
      <mesh position={[0, 0.75, 0]} scale={[0.72, 0.82, 0.58]} castShadow>
        <dodecahedronGeometry args={[0.68, 1]} />
        <meshStandardMaterial color="#4e9a68" roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, 0.78, 0.48]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.3, 0.11, 10]} />
        <meshStandardMaterial color="#f5f1df" roughness={0.72} flatShading />
      </mesh>
      <mesh position={[0, 0.79, 0.56]}>
        <octahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial
          color="#d9ff6f"
          emissive="#a8d84c"
          emissiveIntensity={0.42}
          roughness={0.45}
        />
      </mesh>
      {[-1, 1].map((direction) => (
        <group
          key={`ix-arm-${direction}`}
          position={[direction * 0.62, 0.87, 0]}
          rotation={[0, 0, direction * -0.22]}
        >
          <mesh position={[direction * 0.08, -0.28, 0]} castShadow>
            <capsuleGeometry args={[0.12, 0.38, 6, 10]} />
            <meshStandardMaterial color="#397b57" roughness={0.8} flatShading />
          </mesh>
          <mesh position={[direction * 0.13, -0.58, 0]} castShadow>
            <sphereGeometry args={[0.15, 10, 8]} />
            <meshStandardMaterial color="#f5f1df" roughness={0.78} flatShading />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.07, 8, 20]} />
        <meshStandardMaterial
          color="#9ed269"
          emissive="#7db74d"
          emissiveIntensity={0.16}
          roughness={0.62}
        />
      </mesh>
    </group>
  );
}

export function IxNpc({ animation: requestedAnimation, position = [0, 0, 0] }: IxNpcProps) {
  const rootRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const antennaSignalRef = useRef<Group>(null);
  const isConversationReady = useWorldStore(
    (state) => state.activeInteractionTargetId === IX_NPC_TARGET_ID,
  );
  const animation = resolveIxAnimation(requestedAnimation);

  useFrame(({ clock }) => {
    const root = rootRef.current;
    const head = headRef.current;
    const antennaSignal = antennaSignalRef.current;

    if (!root || !head || !antennaSignal || animation !== "idle") {
      return;
    }

    const elapsed = clock.elapsedTime;
    const idleWave = Math.sin(elapsed * 1.8);

    root.position.y = position[1] + idleWave * 0.035;
    head.rotation.y = Math.sin(elapsed * 0.72) * 0.11;
    head.rotation.z = idleWave * 0.025;

    const signalScale = 1 + Math.sin(elapsed * 2.4) * 0.08;
    antennaSignal.scale.setScalar(signalScale);
  });

  return (
    <group ref={rootRef} name="ix-npc" position={position}>
      <IxBody />
      <group ref={headRef}>
        <IxHead />
        <mesh position={[0, 2.08, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.38, 8]} />
          <meshStandardMaterial color="#43645b" roughness={0.7} />
        </mesh>
        <group ref={antennaSignalRef} position={[0, 2.3, 0]}>
          <mesh>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#d9ff6f"
              emissive="#acd94e"
              emissiveIntensity={0.7}
              roughness={0.38}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.025, 8, 18]} />
            <meshStandardMaterial
              color="#8bcf8d"
              emissive="#5eaa73"
              emissiveIntensity={0.22}
              transparent
              opacity={0.72}
            />
          </mesh>
        </group>
      </group>

      <Html center distanceFactor={8} position={[0, 2.85, 0]} zIndexRange={[6, 0]}>
        <IxNameplateContent isConversationReady={isConversationReady} />
      </Html>
    </group>
  );
}
