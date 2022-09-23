import React, { useState, useEffect } from "react";
import "../../style/Login.css";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  sessionStorage.clear();
  const navigate = useNavigate();
  const notifyAlert = (text) => {
    toast.warn(text, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const [Admins, setAdmins] = useState([
    {
      loginid: "",
      password: "",
      rights: "",
      adminName: "",
    },
  ]);

  let k = 0;
  const loginValidate = () => {
    let userId = document.getElementById("loginid").value;
    let userPass = document.getElementById("password").value;
    let rightData = "";
    let adminName = "";
    if (userId !== "" && userPass !== "") {
      Admins.forEach((user) => {
        if (user.loginid === userId && user.password === userPass) {
          k = 1;
          rightData = user.rights;
          adminName = user.adminName;
        }
      });
      if (k === 1) {
        sessionStorage.setItem("loginid", userId);
        sessionStorage.setItem("rights", rightData);
        sessionStorage.setItem("name", adminName);

        navigate("/admin-home");
        k = 0;
      } else {
        notifyAlert("Incorrect Credentials!");
      }
    } else {
      notifyAlert("Enter Credentials Please!");
    }
  };

  const callCredentials = () => {
    const q1 = query(collection(db, `admin_credentials`));
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setAdmins((prevData) => [
          ...prevData,
          {
            loginid: data.data().loginid,
            password: data.data().password,
            rights: data.data().rights,
            adminName: data.data().name,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    callCredentials();
  }, []);

  return (
    <>
      <Navbar title="College Management System - Admin Login" showText="" />
      <section className="loginContainer">
        <div className="loginCard">
          <img id="loginImg" src={require("../../assets/admin.png")} alt="" />
          <div className="login">
            <label htmlFor="loginid">Admin Login Id</label>
            <input
              type="text"
              id="loginid"
              name="loginid"
              required
              autoComplete="off"
            />
            <label htmlFor="password">Admin Password</label>
            <input type="password" name="password" id="password" required />
            <button className="submitBtn" onClick={loginValidate}>
              Login
            </button>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AdminLogin;
