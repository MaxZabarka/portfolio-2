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
// limit number of objects for performance
// performance optimizations
// optimize traversal
// touchstart event
// only add light once mouse moved
// magnetic mouse interactions