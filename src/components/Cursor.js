import React, { useLayoutEffect, useRef } from "react";
import lerp from "../util/lerp";
import "./Cursor.scss";

let targetX = 0;
let targetY = 0;
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

const Cursor = () => {
  const cursorRef1 = useRef(null);
  const cursorRef2 = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const deltaRef = useRef(0);

  const position = () => {
    cursorRef2.current.style.left = targetX + "px";
    cursorRef2.current.style.top = targetY + "px";

    const delta = performance.now() - deltaRef.current;
    deltaRef.current = performance.now();
    mouseRef.current.x = lerp(mouseRef.current.x, targetX, 0.01 * delta);
    mouseRef.current.y = lerp(mouseRef.current.y, targetY, 0.01 * delta);

    cursorRef1.current.style.left = mouseRef.current.x + "px";
    cursorRef1.current.style.top = mouseRef.current.y + "px";

    requestAnimationFrame(position);
  };
  useLayoutEffect(() => {
    requestAnimationFrame(position);
  });
  return (
    <>
      <div ref={cursorRef1} className="Cursor1"></div>
      <div ref={cursorRef2} className="Cursor2"></div>
    </>
  );
};

export default Cursor;
