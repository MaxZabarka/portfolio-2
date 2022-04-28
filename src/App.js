import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { Vector3 } from "three";
import { useRef } from "react";
import { PlaneGeometry } from "three";
import { OrbitControls } from "@react-three/drei";
import { easeOutElastic } from "./util/easings";

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

  useFrame((state) => {
    const { mouse, camera } = state;
    // dampedMouse.current.x += easeOutElastic(mouse.x - dampedMouse.current.x) * 0.01;
    // dampedMouse.current.y += easeOutElastic(mouse.y - dampedMouse.current.y) * 0.01;
    // const completion = mouse.x - dampedMouse.current.x;
    // console.log("completion", 1 - Math.abs(completion));
    // dampedMouse.current.x += easeOutElastic(completion)*0.1;

    // let completion += completion - mouse.x
    // console.log('completion', completion)


    var vector = new Vector3(
      x,
      y,
      BACKGROUND_DISTANCE
    );
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance =
      -(camera.position.z + BACKGROUND_DISTANCE + LIGHT_RADIUS) / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    mouseLights.current.position.set(pos.x, pos.y);
    // console.log("pos", pos);
  });

  return (
    <>
      <OrbitControls />
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
