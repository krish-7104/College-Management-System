import React, { useState } from "react";
import "./Login.css";
const Login = () => {
  const [loginId, setLoginid] = useState();
  const [password, setPassword] = useState();
  const loginBtnHandler = () => {};
  return (
    <section className="mainSec">
      <h1 className="loginPageTitle">College Management System</h1>
      <div className="loginCard">
        <img
          id="loginImg"
          className="loginImg"
          src={require("../../Asset/login.png")}
          alt=""
        />
        <span className="divider"></span>
        <form className="loginForm">
          <p className="loginTitle">Login To System</p>
          <div className="inputDiv">
            <label htmlFor="loginId">Login ID</label>
            <input
              type="loginId"
              name="loginId"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginid(e.target.value)}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="loginInBtn" onClick={loginBtnHandler}>
            Login In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
