import { Canvas } from "@react-three/fiber";
import React from "react";
import useBackgroundPlane from "../hooks/useBackgroundPlane";
import useMouseObject from "../hooks/useMouseObject";

const BACKGROUND_DISTANCE = 0;
const LIGHT_RADIUS = 0.05;
const AboutCanvas = () => {
  const mouseLights = useMouseObject(
    BACKGROUND_DISTANCE + LIGHT_RADIUS,
    "about-canvas"
  );
  const planeRef = useBackgroundPlane(2);

  return (
    <>
      <color attach="background" args={["red"]} />
      <group ref={mouseLights}>
        <pointLight
          position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
          intensity={0.3}
          color="white"
        />
        <pointLight position={[0, 0, 1]} intensity={0.1} color="white" />
      </group>
      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={1} />
      </mesh>
    </>
  );
};

export default AboutCanvas;
