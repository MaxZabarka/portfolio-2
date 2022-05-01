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
          <h1>
            I design and build
            <br />
            <bold>digital products</bold>
          </h1>
          <p>
            I am a designer and developer with a wide range of experience in
            various digital and artistic disciplines
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
