import React, { useState, useEffect } from "react";
import "../style/Login.css";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Login = () => {
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
  const [students, setStudents] = useState([
    {
      loginid: "",
      password: "",
      branch: "",
    },
  ]);
  const [faculty, setFaculty] = useState([
    {
      loginid: "",
      password: "",
      department: "",
    },
  ]);
  let k = 0;
  const loginValidate = () => {
    sessionStorage.clear();
    let userId = document.getElementById("loginid").value;
    let userPass = document.getElementById("password").value;
    let branch = "";
    let department = "";
    if (!userId.includes("@")) {
      if (userId !== "" && userPass !== "") {
        students.forEach((user) => {
          if (user.loginid === userId && user.password === userPass) {
            k = 1;
            branch = user.branch;
          }
        });
        if (k === 1) {
          sessionStorage.setItem("loginid", userId);
          sessionStorage.setItem("branch", branch);
          sessionStorage.setItem("type", "student");
          navigate("/students-home");
          k = 0;
        } else {
          notifyAlert("Incorrect Credentials!");
        }
      } else {
        notifyAlert("Enter Credentials Please!");
      }
    } else {
      if (userId !== "" && userPass !== "") {
        faculty.forEach((user) => {
          if (user.loginid === userId && user.password === userPass) {
            k = 1;
            department = user.department;
          }
        });
        if (k === 1) {
          sessionStorage.setItem("loginid", userId);
          sessionStorage.setItem("department", department);
          sessionStorage.setItem("type", "faculty");
          navigate("/faculty-home");
          k = 0;
        } else {
          notifyAlert("Incorrect Credentials!");
        }
      } else {
        notifyAlert("Enter Credentials Please!");
      }
    }
  };

  const callCredentials = () => {
    const q1 = query(collection(db, `students_credentials`));
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setStudents((prevData) => [
          ...prevData,
          {
            loginid: data.data().loginid,
            password: data.data().password,
            branch: data.data().branch,
          },
        ]);
      });
    });
    const q2 = query(collection(db, `faculty_credentials`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setFaculty((prevData) => [
          ...prevData,
          {
            loginid: data.data().loginid,
            password: data.data().password,
            department: data.data().department,
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
      <Navbar title="College Management System" showText="" />
      <section className="loginContainer">
        <div className="loginCard">
          <img id="loginImg" src={require("../assets/classPng.png")} alt="" />
          <div className="login">
            <label htmlFor="loginid">Login Id</label>
            <input
              type="text"
              id="loginid"
              name="loginid"
              required
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
            <button className="submitBtn" onClick={loginValidate}>
              Login
            </button>
          </div>
        </div>
        <div className="myProfile">
          <a
            className="portfolioLink"
            href="https://krishjotaniya.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <p className="profileTitle">Developed By Krish Jotaniya</p>
          </a>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
