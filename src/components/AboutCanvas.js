import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import useBackgroundPlane from "../hooks/useBackgroundPlane";
import useDampedMouse from "../hooks/useDampedMouse";
import useMouseObject from "../hooks/useMouseObject";
import radians from "../util/radians";
import David from "./David";

const BACKGROUND_DISTANCE = 100;
const LIGHT_RADIUS = 0.1;
const AboutCanvas = () => {
  const mouseLights = useMouseObject(
    BACKGROUND_DISTANCE + LIGHT_RADIUS,
    "about-canvas"
  );
  const mouseLightForeground = useMouseObject(3, "about-canvas");
  const planeRef = useBackgroundPlane(2);
  const davidRef = useRef(null);
  const dampedMouse = useDampedMouse(3, "about-canvas");
  const initialDavidRotation = useRef(null);
  useFrame(() => {
    if (!initialDavidRotation.current) {
      initialDavidRotation.current = {
        x: davidRef.current.rotation.x,
        y: davidRef.current.rotation.y,
      };
    }
    davidRef.current.rotation.y =
      dampedMouse.x * 0.7 + initialDavidRotation.current.y;
    davidRef.current.rotation.x =
      dampedMouse.y * -0.4 + initialDavidRotation.current.x;
  });

  return (
    <>
      <pointLight
        ref={mouseLights}
        position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
        intensity={8}
        color="#9074f0"
      />
      <pointLight
        ref={mouseLightForeground}
        position={[0, 0, 1]}
        distance={2}
        intensity={1}
        color="#9074f0"
      />

      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={1} />
      </mesh>
    <group position={[0,0.7,0]}>
      {/* back light */}
      <pointLight
        intensity={0.3}
        distance={50}
        position={[1, 2, -1]}
        color="white"
      />
      {/* key light  */}
      <pointLight intensity={0.3} distance={50} position={[1, 2, 2]} />
      {/* fill light  */}
      <pointLight
        intensity={0.2}
        distance={50}
        position={[5, 2, 6]}
        color="#b0a0eb"
      />

      {/* bottom light */}
      <pointLight
        intensity={0.2}
        distance={50}
        position={[3, -10, 0]}
        color="white"
      />

      {/* <rectAreaLight intensity={1} position={[0, 0, 3]} width={3} height={3} /> */}
      <David
        ref={davidRef}
        position={[3, -1, 0]}
        rotation={[0, radians(-50), 0]}
      /></group>

    </>
  );
};

export default AboutCanvas;
