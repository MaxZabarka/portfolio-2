import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import React, { useRef } from "react";
import { PlaneGeometry } from "three";
import { Stats } from "@react-three/drei";

import { Mesh } from "three";
import radians from "../util/radians";

import ShapesGrid from "./ShapesGrid";
import Post from "./Post";
import clamp from "../util/clamp";
import lerp from "../util/lerp";
import map from "../util/map";
import useMouseObject from "../hooks/useMouseObject";
import useDampedMouse from "../hooks/useDampedMouse";
import useBackgroundPlane from "../hooks/useBackgroundPlane";

const BACKGROUND_DISTANCE = 0;
const LIGHT_RADIUS = 0.05;
const mouse = { x: 0, y: 0 };

function HomeCanvas() {
  const mouseLights = useMouseObject(BACKGROUND_DISTANCE + LIGHT_RADIUS, "home-canvas");
  const dampedMouse = useDampedMouse(3, "home-canvas");
  const planeRef = useBackgroundPlane(2);
  const shapesRef = useRef(null);

  useFrame((state, delta) => {
    const { camera } = state;

    //camera looking
    // camera.rotation.y = dampedMouse.x * -0.02;
    // camera.rotation.x = dampedMouse.y * 0.02;

    // Shape transforms
    const ang_rad = (camera.fov * Math.PI) / 180;
    const fov_y_cursor = camera.position.z * Math.tan(ang_rad / 2) * 2;
    const cursorPosition = new Vector3(
      (fov_y_cursor * camera.aspect * dampedMouse.x) / 2,
      (fov_y_cursor * dampedMouse.y) / 2,
      0
    );

    shapesRef.current.traverse((shape) => {
      if (!(shape instanceof Mesh)) {
        return;
      }

      const shapePosition = new Vector3();
      shapePosition.setFromMatrixPosition(shape.matrixWorld);

      const mouseDistance = cursorPosition.distanceTo(shapePosition);

      const maxPositionY = 5;
      const minPositionY = 0;
      const startDistance = 5;
      const endDistance = 0;
      const z = map(
        mouseDistance,
        startDistance,
        endDistance,
        minPositionY,
        maxPositionY
      );

      shape.position.z = lerp(
        shape.position.z,
        clamp(z, 1, maxPositionY),
        delta * 3
      );

      const scaleFactor = lerp(
        shape.scale.x,
        clamp(z * 0.7, 1, Infinity),
        delta * 5
      );
      shape.scale.set(scaleFactor, scaleFactor, scaleFactor);

      shape.rotation.x = map(shape.position.z, 0, 1, radians(90), radians(0));
      shape.rotation.y = map(shape.position.z, 0, 1, radians(45), radians(0));
      shape.rotation.z = map(shape.position.z, 0, 1, radians(180), radians(0));
    });
  });

  return (
    <>
      <ShapesGrid ref={shapesRef} />
      <group ref={mouseLights}>
        <pointLight
          position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
          intensity={0.3}
          color="white"
        />
        <pointLight position={[0, 0, 4]} intensity={0.1} color="white" />
      </group>

      <rectAreaLight position={[0, 0, 11]} args={["#00068A", 5, 100, 100]} />
      <pointLight position={[0, 0, 11]} intensity={1} color="#00068A" />
      <pointLight position={[5, 5, 0.5]} color="#986400" intensity={1} />
      <pointLight position={[-5, -5, 0.5]} color="#986400" intensity={1} />

      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={1} />
      </mesh>
      {/* <Stats showPanel={0} className="stats" /> */}
      {/* <OrbitControls /> */}
      <Post />
    </>
  );
}

export default React.memo(HomeCanvas);
