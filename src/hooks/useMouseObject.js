import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import lerp from "../util/lerp";
import useDampedMouse from "./useDampedMouse";

const useMouseObject = (backgroundDistance, canvasClassName) => {
  const dampedMouse = useDampedMouse(8, canvasClassName);
  const objectRef = useRef(null);

  useFrame((state, delta) => {
    const { camera } = state;

    // Mouse light
    const ang_rad = (camera.fov * Math.PI) / 180;
    const distance = backgroundDistance + camera.position.z;
    const fov_y_light = distance * Math.tan(ang_rad / 2) * 2;

    const target = {
      y: (fov_y_light * dampedMouse.y) / 2,
      x: (fov_y_light * camera.aspect * dampedMouse.x) / 2,
    };

    objectRef.current.position.x = target.x;
    objectRef.current.position.y = target.y;
  });
  return objectRef;
};
export default useMouseObject;
