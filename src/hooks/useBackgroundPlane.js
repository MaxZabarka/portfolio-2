import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PlaneGeometry } from "three";

const useBackgroundPlane = (backgroundMargin) => {
  const planeRef = useRef(null);
  useThree(({ camera }) => {
    const ang_rad = (camera.fov * Math.PI) / 180;
    const fov_y_incomplete = Math.tan(ang_rad / 2) * 2;

    if (planeRef.current) {
      const distance = camera.position.z - planeRef.current.position.z;
      const fov_y = distance * fov_y_incomplete;

      const planeGeometry = new PlaneGeometry(
        fov_y * camera.aspect + backgroundMargin,
        fov_y + backgroundMargin
      );
      planeRef.current.geometry = planeGeometry;
    }
  });

  return planeRef;
};
export default useBackgroundPlane;
