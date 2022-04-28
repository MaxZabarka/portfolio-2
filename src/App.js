import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { PlaneGeometry } from "three";
import { OrbitControls } from "@react-three/drei";
import { easeOutElastic } from "./util/easings";
import clamp from "./util/clamp";

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
const BACKGROUND_DISTANCE = 10;
const LIGHT_RADIUS = 0.03;

function App() {
  const [gridConfig, setGridConfig] = useState({
    rows: 10,
    cols: 10,
    gap_size: 0.5,
    shape_size: 1,
  })



  const grid_width = (gridConfig.cols-1) * (gridConfig.gap_size + gridConfig.shape_size) ;
  const grid_height = (gridConfig.rows-1) * (gridConfig.gap_size + gridConfig.shape_size);

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
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={mouseLights}>
        <pointLight
          position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
          intensity={2}
        />
        {/* <pointLight shadow={true}  position={[0, 0, 2]} intensity={0.5} /> */}
      </group>
      {/* <ambientLight intensity={0.1} /> */}
      <group ref={shapesRef} position={[-grid_width/2, grid_height / 2, 0]}>
        {Array(gridConfig.rows)
          .fill()
          .map((_, i) => {
            return (
              <group position={[0, -i * (1 + gridConfig.gap_size), 0]}>
                {Array(gridConfig.cols)
                  .fill()
                  .map((_, j) => {
                    return (
                      <mesh position={[j * (1 + gridConfig.gap_size), 0, 0]}>
                        <meshStandardMaterial
                          flatShading={false}
                          roughness={0.3}
                        />
                        <sphereGeometry
                          computeVertexNormals={true}
                          args={[gridConfig.shape_size/2, 15, 15]}
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
