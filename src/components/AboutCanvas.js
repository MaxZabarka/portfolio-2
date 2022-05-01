import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import useBackgroundPlane from "../hooks/useBackgroundPlane";
import useDampedMouse from "../hooks/useDampedMouse";
import useMouseObject from "../hooks/useMouseObject";
import radians from "../util/radians";
import AboutScene from "./AboutScene";
import David from "./David";
import clamp from "../util/clamp";
const BACKGROUND_DISTANCE = 100;
const LIGHT_RADIUS = 0.1;
const MARGIN_Y = 2;
const MARGIN_X = 2;
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

  useFrame(({ camera }) => {
    const ang_rad = (camera.fov * Math.PI) / 180;
    const distance = camera.position.z;
    const fov_y = distance * Math.tan(ang_rad / 2);
    const fov_x = distance * Math.tan(ang_rad / 2) * camera.aspect;
    const scale = Math.min(fov_x * 0.6, 1);
    davidRef.current.scale.set(scale, scale, scale);

    //electronics
    davidRef.current.children[0].position.set(
      Math.min(-1, -fov_x + fov_x * 0.7),
      -fov_y + 1,
      0
    );

    //shoes
    davidRef.current.children[1].position.set(
      Math.max(1, fov_x - fov_x * 0.5),
      fov_y - 2.5,
      0
    );

    //headphones
    davidRef.current.children[2].position.set(
      Math.min(-2, -fov_x + fov_x * 0.3),
      -0.5,
      0
    );

    //controller
    davidRef.current.children[3].position.set(
      Math.min(-1, -fov_x + fov_x * 0.7),
      fov_y - 2,
      0
    );

    //david
    davidRef.current.children[4].position.set(
      Math.max(1, fov_x - fov_x * 0.4),
      -fov_y + 1.5,
      0
    );

    console.log("davidRef.current.children", davidRef.current.children);
    // return;
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
        position={[0, 0, 0]}
        distance={3}
        intensity={2}
        color="#9074f0"
      />

      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={1} />
      </mesh>
      <group position={[0, 0.7, 0]}>
        {/* back light */}
        <pointLight
          intensity={0}
          distance={50}
          position={[5, 0, 3]}
          color="#b0a0eb"
        />
        <pointLight
          intensity={0}
          distance={50}
          position={[-5, 0, -3]}
          color="#b0a0eb"
        />
        {/* key light  */}
        {/* <pointLight intensity={0.3} distance={50} position={[1, 2, 2]} /> */}
        {/* fill light  */}
        <pointLight
          intensity={0.2}
          distance={50}
          position={[0, 0, 10]}
          color="#b0a0eb"
        />
        {/* bottom light */}
        {/* <pointLight
          intensity={0.2}
          distance={50}
          position={[3, -10, 0]}
          color="white"
        /> */}
        {/* <rectAreaLight intensity={1} position={[0, 0, 3]} width={3} height={3} /> */}
        {/* <David
          ref={davidRef}
          position={[3, -1, 0]}
          rotation={[0, radians(-50), 0]}
        /> */}
      </group>
      <AboutScene ref={davidRef} />

      {/* <group>
        {Array(30)
          .fill()
          .map(() => {
            const range = 30;
            return (
              // <mesh
              //   position={[
              //     (Math.random() - 0.5) * range,
              //     (Math.random() - 0.5) * range,
              //     (Math.random() - 0.5) * range,
              //   ]}
              // >
              //   <sphereGeometry args={[0.02, 8 , 8]} />
              //   <meshBasicMaterial color="white" />
              // </mesh>
              <pointLight
                intensity={1}
                distance={1.3}
                position={[
                  (Math.random()-0.5)*range,
                  (Math.random()-0.5)*range,
                  -99.99,
                ]}
              />
            );
          })}
      </group> */}
    </>
  );
};

export default AboutCanvas;
