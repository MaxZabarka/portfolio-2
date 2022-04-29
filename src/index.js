import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas shadows camera={{ fov: 35, position: [0, 0, 13] }}>
      <App />
    </Canvas>
    <div className="home">
      <span>
        <h1>LETS TURN YOUR IDEAS INTO REALITY</h1>
        <h2>WEB DEVELOPER BASED IN CALGARY, ALBERTA</h2>
      </span>
    </div>
  </React.StrictMode>
);
