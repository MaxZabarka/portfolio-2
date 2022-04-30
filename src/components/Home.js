import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import HomeCanvas from "./HomeCanvas";
import useBlink from "../hooks/useBlink";

const Home = () => {
  const [showTitle, setShowTitle] = useState(false);

  const [ref1, blink2] = useBlink();
  const [ref2, blink1] = useBlink();

  useEffect(() => {
    blink1();
    blink2();
  }, [blink1, blink2]);

  return (
    <div className="Home">
      <Canvas
        onCreated={() => {
          setTimeout(() => {
            setShowTitle(true);
          }, 1000);
        }}
        className="home-canvas"
        shadows
        camera={{ fov: 35, position: [0, 0, 13] }}
      >
        <HomeCanvas />
      </Canvas>
      <div className="title">
        <h1 ref={ref1} className={showTitle ? "" : "fade-left"}>
          LET'S TURN YOUR
        </h1>
        <h1 ref={ref2} className={showTitle ? "" : "fade-right"}>
          IDEAS INTO REALITY
        </h1>
        {showTitle && <h2>WEB DEVELOPER BASED IN CALGARY, ALBERTA</h2>}
      </div>
    </div>
  );
};

export default Home;
