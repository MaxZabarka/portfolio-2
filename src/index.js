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
      <nav>
        <div className="brand">
          <h1>MAX ZABARKA</h1>
        </div>
        <ul className="links">
          <li>About</li>
          <li>Work</li>
          <li>Contact</li>
        </ul>
      </nav>
      <span>
        <h1>LET'S TURN YOUR IDEAS INTO REALITY</h1>
        <h2>WEB DEVELOPER BASED IN CALGARY, ALBERTA</h2>
      </span>
    </div>
  </React.StrictMode>
);
