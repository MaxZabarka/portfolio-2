import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import lerp from "../util/lerp";




let pageY = 0;
let prevScrollY = window.scrollY;

//because when you reload in the middle of the page for some reason the value is 0 at first? only affects chrome
setTimeout(() => {
  prevScrollY = window.scrollY
}, 100)

console.log('init prevScrollY', prevScrollY)
const useDampedMouse = (damp, canvasClassName) => {
  const dampedMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = document.querySelector("." + canvasClassName);
    const mouseMoveHandler = (e) => {
      const distanceFromTop =
        window.pageYOffset + target.getBoundingClientRect().top;

      const heightRatio = target.clientHeight / window.innerHeight;
      pageY = e.pageY;

      // + 10 for scroll bar
      mouse.current.x = (e.pageX / (window.innerWidth - 10) - 0.5) * 2;
      // /1.1 for 110vh
      mouse.current.y =
        ((e.pageY - distanceFromTop) / window.innerHeight / heightRatio - 0.5) *
        -2;
    };
    const scrollHandler = (e) => {

      const distanceFromTop =
        window.pageYOffset + target.getBoundingClientRect().top;

      const heightRatio = target.clientHeight / window.innerHeight;
      const scrollAmount = prevScrollY - window.scrollY;
      prevScrollY = window.scrollY;

      // /1.1 for 110vh
      mouse.current.y =
        ((pageY - scrollAmount - distanceFromTop) /
          window.innerHeight /
          heightRatio -
          0.5) *
        -2;
      pageY -= scrollAmount
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("scroll", scrollHandler, false);
    // document.addEventListener("touchstart", (e) => {
    //   const touch = e.changedTouches[0];
    //   mouse.x = (touch.pageX / (window.innerWidth + 10) - 0.5) * 2;
    //   // /1.1 for 110vh
    //   mouse.y = (touch.pageY / window.innerHeight / 1.1 - 0.5) * -2;
    // });
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
