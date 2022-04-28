import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { Vector3 } from "three";
import { useRef } from "react";
import { PlaneGeometry } from "three";
import { OrbitControls } from "@react-three/drei";
import { easeOutElastic } from "./util/easings";
import clamp from "./util/clamp";

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
const GAP_SIZE = 0.5;
const BACKGROUND_DISTANCE = 10;
const LIGHT_RADIUS = 2;

function App() {
  const rows = 5;
  const cols = 5;

  const mouseLights = useRef(null);
  const planeRef = useRef(null);
  const shapesRef = useRef(null);
  const lightSpeed = useRef({ x: 0, y: 0 });

  useThree(({ camera }) => {
    const ang_rad = (camera.fov * Math.PI) / 180;
    const fov_y_incomplete = Math.tan(ang_rad / 2) * 2;

    if (planeRef.current) {
      const distance = camera.position.z - planeRef.current.position.z;
      console.log("distance", distance);
      console.log("distance", distance);
      const fov_y = distance * fov_y_incomplete;

      const planeGeometry = new PlaneGeometry(fov_y * camera.aspect, fov_y);
      planeRef.current.geometry = planeGeometry;
    }
    // if (shapesRef.current) {
    //   shapesRef.current.position.y = fov_y / 2;
    //   shapesRef.current.position.x = (-fov_y * camera.aspect) / 2;
    // }
  });

  useFrame((state, delta) => {
    const { mouse, camera } = state;

    const ang_rad = (camera.fov * Math.PI) / 180;
    const distance = BACKGROUND_DISTANCE + camera.position.z + LIGHT_RADIUS;
    const fov_y = distance * Math.tan(ang_rad / 2) * 2;

    const target = {
      y: (fov_y * mouse.y) / 2,
      x: (fov_y * camera.aspect * mouse.x) / 2,
    };
    const ACCELERATION = 0.002;
    const MAX_SPEED = Infinity;

    const x_distance_to_target = Math.abs(
      mouseLights.current.position.x - target.x
    );
    if (mouseLights.current.position.x > target.x) {
      lightSpeed.current.x = clamp(
        lightSpeed.current.x - ACCELERATION * delta * 200,
        -MAX_SPEED,
        MAX_SPEED
      );
    } else {
      lightSpeed.current.x = clamp(
        lightSpeed.current.x + ACCELERATION * delta * 200,
        -MAX_SPEED,
        MAX_SPEED
      );
    }
    if (x_distance_to_target < 1 && (lightSpeed.current.x > 0.005 || lightSpeed.current.x < -0.005) ) {
      lightSpeed.current.x = lightSpeed.current.x*0.95;
    }

    // y
    const y_distance_to_target = Math.abs(
      mouseLights.current.position.y - target.y
    );
    if (mouseLights.current.position.y > target.y) {
      lightSpeed.current.y = clamp(
        lightSpeed.current.y - ACCELERATION * delta * 200,
        -MAX_SPEED,
        MAX_SPEED
      );
    } else {
      lightSpeed.current.y = clamp(
        lightSpeed.current.y + ACCELERATION * delta * 200,
        -MAX_SPEED,
        MAX_SPEED
      );
    }
    if (y_distance_to_target < 1 && (lightSpeed.current.y > 0.005 || lightSpeed.current.y < -0.005) ) {
      lightSpeed.current.y = lightSpeed.current.y*0.95;
    }
    mouseLights.current.position.x += lightSpeed.current.x * delta *150;
    mouseLights.current.position.y += lightSpeed.current.y * delta * 150;
    
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={mouseLights}>
        <pointLight
          position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
          intensity={1}
        />
      </group>
      <group ref={shapesRef}>
        {Array(5)
          .fill()
          .map((_, i) => {
            return (
              <group position={[0, -i * (1 + GAP_SIZE), 0]}>
                {Array(10)
                  .fill()
                  .map((_, j) => {
                    return (
                      <mesh position={[j * (1 + GAP_SIZE), 0, 0]}>
                        <meshStandardMaterial
                          flatShading={false}
                          roughness={0}
                        />
                        <sphereGeometry
                          computeVertexNormals={true}
                          args={[0.5, 15, 15]}
                        />
                      </mesh>
                    );
                  })}
              </group>
            );
          })}
      </group>
      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={0} />
        {/* <planeGeometry args={[1, 1]} /> */}
      </mesh>
    </>
  );
}

export default App;
