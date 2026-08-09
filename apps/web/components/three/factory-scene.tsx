import { useRef } from "react";
import type { Group } from "three";

import { FactoryEnvironment } from "./factory-environment";
import { FactoryZones } from "./factory-zones";
import { Player } from "./player";
import { PlayerFollowCamera } from "./player-follow-camera";
import { PlayerZoneTracker } from "./player-zone-tracker";

export function FactoryScene() {
  const playerRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={["#d9eef4"]} />
      <fog attach="fog" args={["#d9eef4", 34, 66]} />

      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#f8fcff", "#7aa565", 1.35]} />
      <directionalLight
        castShadow
        color="#fff2cf"
        intensity={2.15}
        position={[-10, 18, 11]}
        shadow-camera-bottom={-18}
        shadow-camera-far={55}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={18}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />

      <FactoryEnvironment />
      <FactoryZones />
      <Player playerRef={playerRef} />
      <PlayerFollowCamera targetRef={playerRef} />
      <PlayerZoneTracker targetRef={playerRef} />
    </>
  );
}
