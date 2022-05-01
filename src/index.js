import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

//TODO
// add custom cursor
// limit number of objects for performance
// text animation
// delta time for gsap
// performance optimizations
// optimize traversal
// touchstart event
// only add light once mouse moved