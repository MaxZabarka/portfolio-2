import { extend, useFrame, useThree } from "@react-three/fiber";
import "./App.scss";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { PlaneGeometry } from "three";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { easeOutElastic } from "./util/easings";
import clamp from "./util/clamp";
import { Vector2 } from "three";
import { MeshBasicMaterial } from "three";
import { Mesh } from "three";
import gsap, { Back, random } from "gsap";
import map from "./util/map";
import radians from "./util/radians";
import randomFromArray from "./util/randomFromArray";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";

extend({ RoundedBoxGeometry });
function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
const BACKGROUND_DISTANCE = 0;
const LIGHT_RADIUS = 0.05;
// const LIGHT_RADIUS = 12;

function App() {
  const [gridConfig, setGridConfig] = useState({
    rows: 10,
    cols: 20,
    gap_size: 0.7,
    shape_size: 0.5,
  });

  var geometries = [
    <sphereGeometry
      computeVertexNormals={true}
      args={[gridConfig.shape_size / 2, 15, 15]}
    />,
    <roundedBoxGeometry
      computeVertexNormals={true}
      args={[
        gridConfig.shape_size,
        gridConfig.shape_size,
        gridConfig.shape_size,
        4,
        0.08,
      ]}
    />,
    <torusGeometry
      computeVertexNormals={true}
      args={[gridConfig.shape_size * 0.4, gridConfig.shape_size * 0.2, 12, 24]}
    />,
    <coneGeometry
      computeVertexNormals={true}
      args={[gridConfig.shape_size * 0.6, gridConfig.shape_size, 15, 5]}
    />,
  ];

  const testRef = useRef(null);

  const grid_width =
    (gridConfig.cols - 1) * (gridConfig.gap_size + gridConfig.shape_size);
  const grid_height =
    (gridConfig.rows - 1) * (gridConfig.gap_size + gridConfig.shape_size);

  const mouseLights = useRef(null);
  const planeRef = useRef(null);
  const shapesRef = useRef(null);

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
  });
  const testMaterial = new MeshBasicMaterial({ color: "red" });
  const testMaterial2 = new MeshBasicMaterial({ color: "blue" });

  useFrame((state, delta) => {
    const { mouse, camera } = state;

    // cursor stuff
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

    const fov_y_cursor = camera.position.z * Math.tan(ang_rad / 2) * 2;
    const cursorPosition = new Vector3(
      (fov_y_cursor * camera.aspect * mouse.x) / 2,
      (fov_y_cursor * mouse.y) / 2,
      0
    );

    shapesRef.current.traverse((shape) => {
      // row.traverse((shape) => {
      // col.traverse((shape) => {
      if (!(shape instanceof Mesh)) {
        return;
      }

      const shapePosition = new Vector3();
      shapePosition.setFromMatrixPosition(shape.matrixWorld);

      const mouseDistance = cursorPosition.distanceTo(shapePosition);

      const maxPositionY = 5;
      const minPositionY = 0;
      const startDistance = 4;
      const endDistance = 0;
      const z = map(
        mouseDistance,
        startDistance,
        endDistance,
        minPositionY,
        maxPositionY
      );

      gsap.to(shape.position, 0.4, { z: z < 1 ? 1 : z });
      // create a scale factor based on the mesh.position.y
      const scaleFactor = z * 0.6;
      // to keep our scale to a minimum size of 1 we check if the scaleFactor is below 1
      const scale = scaleFactor < 1 ? 1 : scaleFactor;

      // animates the mesh scale properties
      gsap.to(shape.scale, 0.4, {
        x: scale,
        y: scale,
        z: scale,
      });
      // rotate our element
      const rotateFactor = shape.position.z * 0.3;
      gsap.to(shape.rotation, 0.7, {
        ease: Back.easeOut.config(1.7),
        x: map(shape.position.z, 0, 1, radians(90), radians(0)),
        z: map(shape.position.z, 0, 1, radians(45), radians(0)),
        y: map(shape.position.z, 0, 1, radians(180), radians(0)),
      });
    });
    // });
    // });
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={mouseLights}>
        <pointLight
          position={[0, 0, -BACKGROUND_DISTANCE + LIGHT_RADIUS]}
          intensity={0.3}
          color="white"
        />
      </group>
      <rectAreaLight position={[0, 0, 11]} args={["#00068A", 5, 100, 100]} />
      <pointLight position={[0, 0, 11]} intensity={1} color="#00068A" />

      <pointLight position={[5, 5, 0.5]} color="#986400" intensity={1} />
      <pointLight position={[-5, -5, 0.5]} color="#986400" intensity={1} />

      {/* <pointLight position={[-5, 5, 1]} color="#00068A" intensity={0} />
        <pointLight position={[5, -5, 2]} color="#00068A" intensity={0} /> */}

      {/* <pointLight position={[0, -10, 10]} color="#986400" intensity={0.3} /> */}
      {/* <pointLight position={[11, 0, 2]} color="#986400" intensity={0.3} /> */}

      {/* <pointLight position={[0, 5, 3]} color="#00068A" intensity={1} />
      <pointLight position={[0, -5, 3]} color="#986400" intensity={1} />

      <pointLight position={[-5.5, 0, 3]} color="#00068A" intensity={1} />
      <pointLight position={[5.5, 0, 3]} color="#986400" intensity={1} /> */}

      <mesh position={[0, 10, 10]}>
        <meshBasicMaterial color="red" />
        <boxGeometry args={[0.3, 0.3, 0.3]} />
      </mesh>
      <mesh position={[0, -10, 10]}>
        <meshBasicMaterial color="red" />
        <boxGeometry args={[0.3, 0.3, 0.3]} />
      </mesh>
      <mesh position={[-11, 0, 10]}>
        <meshBasicMaterial color="red" />
        <boxGeometry args={[0.3, 0.3, 0.3]} />
      </mesh>

      <group ref={shapesRef} position={[-grid_width / 2, grid_height / 2, 0]}>
        {Array(gridConfig.rows)
          .fill()
          .map((_, i) => {
            return (
              <group
                position={[
                  0,
                  -i * (gridConfig.shape_size + gridConfig.gap_size),
                  0,
                ]}
              >
                {Array(gridConfig.cols)
                  .fill()
                  .map((_, j) => {
                    return (
                      <mesh
                        position={[
                          j * (gridConfig.shape_size + gridConfig.gap_size) +
                            ((i % 2) *
                              (gridConfig.shape_size + gridConfig.gap_size)) /
                              2,
                          0,
                          0,
                        ]}
                      >
                        <meshStandardMaterial
                          flatShading={false}
                          roughness={0.3}
                        />
                        {/* <sphereGeometry
                          computeVertexNormals={true}
                          args={[gridConfig.shape_size / 2, 15, 15]}
                        /> */}
                        {randomFromArray(geometries)}
                      </mesh>
                    );
                  })}
              </group>
            );
          })}
      </group>
      <mesh position={[0, 0, -BACKGROUND_DISTANCE]} ref={planeRef}>
        <meshStandardMaterial flatShading={false} roughness={1} />
        {/* <planeGeometry args={[1, 1]} /> */}
      </mesh>
      {/* <mesh ref={testRef}>
        <meshBasicMaterial color="red" />
        <boxGeometry args={[1, 1, 1]} />
      </mesh> */}
      <EffectComposer>
        {/* <DepthOfField
          focusDistance={1}
          focalLength={0.1}
        /> */}
        <Bloom luminanceThreshold={0.4} intensity={3} luminanceSmoothing={1} />
        <Vignette eskil={false} offset={0.3}  darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default App;
