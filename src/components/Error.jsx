import React from "react";
import { Link } from "react-router-dom";
import "../style/Error.css";
const Error = () => {
  document.title = "404 Error - Krish Jotaniya";
  return (
    <section className="errorSec">
      <div className="errorCard">
        <p className="errorTitle">404 Error</p>
        <p className="errorSubTitle"> Page Not Found</p>
        <img
          className="errorImg"
          src={require("../assets/error-Image.png")}
          alt=""
        />
        <button className="errorHomeBtn">
          <Link className="errorLink" to="/">
            Go To Home Page
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Error;
