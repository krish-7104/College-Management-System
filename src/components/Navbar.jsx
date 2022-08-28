import React from "react";
import "../style/Navbar.css";
const Navbar = (props) => {
  return (
    <React.StrictMode>
      <section className="navMain">
        <p className="navTitle">College Management System - {props.title}</p>
      </section>
    </React.StrictMode>
  );
};

export default Navbar;
