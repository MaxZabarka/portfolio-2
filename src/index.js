import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import "./index.scss"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavBar/>
    <Home/>

  </React.StrictMode>
);

//TODO
// add custom cursor
// limit number of objects for performance
// text animation
// delta time for gsap
// performance optimizations
// optimize traversal
