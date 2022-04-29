import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef } from "react";
import { PlaneGeometry } from "three";
import { Stats } from "@react-three/drei";

import { Mesh } from "three";
import radians from "../util/radians";

import ShapesGrid from "./ShapesGrid";
import Post from "./Post";
import clamp from "../util/clamp";
import lerp from "../util/lerp";
import map from "../util/map";

const BACKGROUND_DISTANCE = 0;
const LIGHT_RADIUS = 0.05;
const BACKGROUND_MARGIN = 5;

function HomeCanvas() {
  const mouseLights = useRef(null);
  const dampedMouse = useRef({ x: 0, y: 0 });
  const planeRef = useRef(null);
  const shapesRef = useRef(null);

  useThree(({ camera }) => {
    // Background plane resize
    const ang_rad = (camera.fov * Math.PI) / 180;
    const fov_y_incomplete = Math.tan(ang_rad / 2) * 2;

    if (planeRef.current) {
      const distance = camera.position.z - planeRef.current.position.z;
      const fov_y = distance * fov_y_incomplete;

      const planeGeometry = new PlaneGeometry(
        fov_y * camera.aspect + BACKGROUND_MARGIN,
        fov_y + BACKGROUND_MARGIN
      );
      planeRef.current.geometry = planeGeometry;
    }
  });

  useFrame((state, delta) => {
    const { mouse, camera } = state;

    //camera looking
    dampedMouse.current.x = lerp(dampedMouse.current.x, mouse.x, 3 * delta);
    dampedMouse.current.y = lerp(dampedMouse.current.y, mouse.y, 3 * delta);

    camera.rotation.y = dampedMouse.current.x * -0.01;
    camera.rotation.x = dampedMouse.current.y * 0.01;

    // Mouse light
    const ang_rad = (camera.fov * Math.PI) / 180;
    const distance = BACKGROUND_DISTANCE + camera.position.z + LIGHT_RADIUS;
    const fov_y_light = distance * Math.tan(ang_rad / 2) * 2;

    const target = {
      y: (fov_y_light * mouse.y) / 2,
      x: (fov_y_light * camera.aspect * mouse.x) / 2,
    };

    mouseLights.current.position.x = lerp(
      mouseLights.current.position.x,
      target.x,
      8 * delta
    );
    mouseLights.current.position.y = lerp(
      mouseLights.current.position.y,
      target.y,
      8 * delta
    );

    // Shape transforms
    const fov_y_cursor = camera.position.z * Math.tan(ang_rad / 2) * 2;
    const cursorPosition = new Vector3(
      (fov_y_cursor * camera.aspect * dampedMouse.current.x) / 2,
      (fov_y_cursor * dampedMouse.current.y) / 2,
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

      return;
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

export default HomeCanvas;
