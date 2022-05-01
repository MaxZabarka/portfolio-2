import { Canvas } from "@react-three/fiber";
import React from "react";
import useBackgroundPlane from "../hooks/useBackgroundPlane";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useMouseObject from "../hooks/useMouseObject";
import "./About.scss";
import AboutCanvas from "./AboutCanvas";

const About = (props) => {
  const aboutRef = useIntersectionObserver(props.onScrollIn);
  return (
    <div ref={aboutRef} className="About">
      <div className="page-1">
        <div className="content">
          <h1>I DESIGN AND BUILD DIGITAL PRODUCTS</h1>
          <p>
            I AM A DESIGNER AND FULL STACK DEVELOPER WITH A WIDE RANGE OF
            EXPERIENCE IN VARIOUS DIGITAL AND ARTISTIC DISCIPLINES.
          </p>
        </div>
      </div>
      <div className="about-canvas-wrapper">
        <Canvas
          camera={{ fov: 15, position: [0, 0, 25] }}
          className="about-canvas"
        >
          <AboutCanvas />
        </Canvas>
      </div>
    </div>
  );
};

export default About;
