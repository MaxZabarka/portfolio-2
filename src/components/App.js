import React, { useState } from "react";
import About from "./About";
import Cursor from "./Cursor";
import Home from "./Home";
import NavBar from "./NavBar";
const isTouchscreen = "ontouchstart" in window || navigator.maxTouchPoints;

const App = () => {
  const [activePage, setActivePage] = useState(null);
  return (
    <>
      <NavBar activePage={activePage}/>
      <Home
        onScrollIn={() => {
          setActivePage("Home");
        }}
      />
      <About
        onScrollIn={() => {
          setActivePage("About");
        }}
      />
      {!isTouchscreen && <Cursor />}
    </>
  );
};

export default App;
