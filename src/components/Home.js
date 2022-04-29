import { Canvas } from "@react-three/fiber";
import React from "react";
import "./Home.scss";
import HomeCanvas from "./HomeCanvas";

const Home = () => {
  return (
    <div className="Home">
      <Canvas className="bg" shadows camera={{ fov: 35, position: [0, 0, 13] }}>
        <HomeCanvas />
      </Canvas>
      <span>
        <h1>LET'S TURN YOUR</h1>
        <h1>IDEAS INTO REALITY</h1>
        <h2>WEB DEVELOPER BASED IN CALGARY, ALBERTA</h2>
      </span>
    </div>
  );
};

export default Home;
