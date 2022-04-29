import React from "react";
import randomFromArray from "../util/randomFromArray";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { extend } from "@react-three/fiber";

extend({ RoundedBoxGeometry });

const Shape = (props) => {
  var geometries = [
    <sphereGeometry
      computeVertexNormals={true}
      args={[props.size / 2, 15, 15]}
    />,
    <roundedBoxGeometry
      computeVertexNormals={true}
      args={[
        props.size,
        props.size,
        props.size,
        4,
        0.08,
      ]}
    />,
    <torusGeometry
      computeVertexNormals={true}
      args={[props.size * 0.4, props.size * 0.2, 12, 24]}
    />,
    <coneGeometry
      computeVertexNormals={true}
      args={[props.size * 0.6, props.size, 10, 2]}
    />,
  ];
  return (
    <mesh position={props.position}>
      <meshStandardMaterial flatShading={false} roughness={0.3} />

      {randomFromArray(geometries)}
    </mesh>
  );
};

export default Shape;
