import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import HomeCanvas from "./HomeCanvas";
import useBlink from "../hooks/useBlink";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Home = (props) => {
  const [showTitle, setShowTitle] = useState(false);
  const homeRef = useIntersectionObserver(props.onScrollIn);
  // const [ref1, blink2] = useBlink();
  // const [ref2, blink1] = useBlink();

  // useEffect(() => {
  //   blink1();
  //   blink2();
  // }, [blink1, blink2]);

  return (
    <div ref={homeRef} className="Home">
      <Canvas
        onCreated={() => {
          setTimeout(() => {
            setShowTitle(true);
          }, 500);
        }}
        className="home-canvas"
        shadows
        camera={{ fov: 35, position: [0, 0, 13] }}
      >
        <HomeCanvas />
      </Canvas>
      <div className="title">
        <h1 className={showTitle ? "" : "fade-left"}>LET'S TURN YOUR</h1>
        <h1 className={showTitle ? "" : "fade-right"}>IDEAS INTO REALITY</h1>
        {showTitle && <h2>WEB DEVELOPER BASED IN CALGARY, ALBERTA</h2>}
      </div>
    </div>
  );
};

export default Home;
