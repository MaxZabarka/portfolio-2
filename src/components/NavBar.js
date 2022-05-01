import React from "react";
import "./NavBar.scss";

const NavBar = (props) => {
  return (
    <nav className="NavBar">
      <div className="brand">
        <h1>MAX ZABARKA</h1>
      </div>
      <ul className="links">
        <li className={props.activePage === "Home" ? "active" : ""}>Home</li>
        <li className={props.activePage === "About" ? "active" : ""}>About</li>
        <li className={props.activePage === "Work" ? "active" : ""}>Work</li>
        <li className={props.activePage === "Contact" ? "active" : ""}>
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
