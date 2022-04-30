import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import lerp from "../util/lerp";

const useDampedMouse = (damp, canvasClassName) => {
  const dampedMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = document.querySelector("."+canvasClassName)

    window.addEventListener("mousemove", (e) => {
      const distanceFromTop =
        window.pageYOffset + target.getBoundingClientRect().top;

      const heightRatio = target.clientHeight / window.innerHeight;

      // + 10 for scroll bar
      mouse.current.x = (e.pageX / (window.innerWidth - 10) - 0.5) * 2;
      // /1.1 for 110vh
      mouse.current.y =
        ((e.pageY - distanceFromTop) / window.innerHeight / heightRatio - 0.5) *
        -2;
      console.log("mouse", mouse.current);
    })

    document.addEventListener("touchstart", (e) => {
      const touch = e.changedTouches[0];
      mouse.x = (touch.pageX / (window.innerWidth + 10) - 0.5) * 2;
      // /1.1 for 110vh
      mouse.y = (touch.pageY / window.innerHeight / 1.1 - 0.5) * -2;
    });
  }, []);

  useFrame((_, delta) => {
    dampedMouse.current.x = lerp(
      dampedMouse.current.x,
      mouse.current.x,
      damp * delta
    );
    dampedMouse.current.y = lerp(
      dampedMouse.current.y,
      mouse.current.y,
      damp * delta
    );
  });

  return dampedMouse.current;
};
export default useDampedMouse;
