import { Canvas } from "@react-three/fiber";
import React from "react";
import useBackgroundPlane from "../hooks/useBackgroundPlane";
import useMouseObject from "../hooks/useMouseObject";
import "./About.scss";
import AboutCanvas from "./AboutCanvas";

const About = () => {
  return (
    <div className="About">
      <Canvas className="about-canvas">
        <AboutCanvas />
      </Canvas>
    </div>
  );
};

export default About;
