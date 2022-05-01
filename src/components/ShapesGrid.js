import React, { forwardRef } from "react";
import Shape from "./Shape";

const ShapesGrid = forwardRef((props, ref) => {
  const rows = 8;
  const cols = 15;
  const size = 0.5;
  const gap = 1;
  
  const width =
    (cols - 1) * (gap + size);
  const height =
    (rows - 1) * (gap + size);

  return (
    <group ref={ref} position={[-width / 2, height / 2, 0]}>
      {Array(rows)
        .fill()
        .map((_, i) => {
          return (
            <group key={i} position={[0, -i * (size + gap), 0]}>
              {Array(cols)
                .fill()
                .map((_, j) => {
                  return (
                    <Shape
                      key={j}
                      size={size}
                      position={[
                        j * (size + gap) +
                          ((i % 2) * (size + gap)) / 2,
                        0,
                        0,
                      ]}
                    />
                  );
                })}
            </group>
          );
        })}
    </group>
  );
});

export default ShapesGrid;
