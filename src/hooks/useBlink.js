import { useReducer, useRef } from "react";

const useBlink = () => {

  const ref = useRef(null);

  function blink() {
    if (ref.current) {
      const textArray = ref.current.innerText.split("");
      let innerHtml = "";
      textArray.forEach((char) => {
        innerHtml += `<span class="blink" style="animation-delay: ${
          Math.random()
        }s">${char}</span>`;
      });
      console.log("innerHtml", innerHtml);
      ref.current.innerHTML = innerHtml;
    } 
  }

  return [ref, blink];
};
export default useBlink;
