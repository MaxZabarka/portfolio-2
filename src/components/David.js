
import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const David = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/assets/david.gltf");
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
      scale={0.2}
        castShadow
        receiveShadow
        geometry={
          nodes["appstorageapprawf3479520-7389-11ec-873d-5fe6ac4d76fesmk55"]
            .geometry
        }
        material={materials["Material.001"]}
      />
    </group>
  );
})

useGLTF.preload("/assets/david.gltf");
export default David