import React from "react";
import "./NavBar.scss"

const NavBar = () => {
  return (
    <nav className="NavBar">
      <div className="brand">
        <h1>MAX ZABARKA</h1>
      </div>
      <ul className="links">
        <li>Home</li>
        <li>About</li>
        <li>Work</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default NavBar;
