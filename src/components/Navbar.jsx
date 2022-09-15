import React from "react";
import "../style/Navbar.css";
const Navbar = (props) => {
  return (
    <>
      <section className="navMain">
        <p className="navTitle">College Management System - {props.title}</p>
      </section>
    </>
  );
};

export default Navbar;
