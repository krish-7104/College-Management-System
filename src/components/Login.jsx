import React, { useState, useEffect } from "react";
import "../style/Login.css";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Login = () => {
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
  const [selectType, setSelectType] = useState("students");
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
      counsellor: "",
    },
  ]);
  let k = 0;
  const loginValidate = () => {
    let userId = document.getElementById("loginid").value;
    let userPass = document.getElementById("password").value;
    let branch = "";
    let department = "";
    let counsellor = "";
    if (selectType === "students") {
      if (userId !== "" && userPass !== "") {
        students.forEach((user) => {
          if (user.loginid === userId && user.password === userPass) {
            k = 1;
            branch = user.branch;
          }
        });
        if (k === 1) {
          localStorage.setItem("loginid", userId);
          localStorage.setItem("branch", branch);
          window.open("/students-home", "_self");
          k = 0;
        } else {
          notifyAlert("Incorrect Credentials!");
        }
      } else {
        notifyAlert("Enter Credentials Please!");
      }
    } else if (selectType === "faculty") {
      if (userId !== "" && userPass !== "") {
        faculty.forEach((user) => {
          if (user.loginid === userId && user.password === userPass) {
            k = 1;
            department = user.department;
            counsellor = user.counsellor;
          }
        });
        if (k === 1) {
          localStorage.setItem("loginid", userId);
          localStorage.setItem("department", department);
          localStorage.setItem("counsellor", counsellor);
          window.open("/faculty-home", "_self");
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
            counsellor: data.data().counsellor,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    callCredentials();
  }, []);

  const studentEventHandler = () => {
    setSelectType("students");
    let ele1 = document.getElementById("studentSelect");
    let ele2 = document.getElementById("facultySelect");
    ele2.classList.remove("activeBtn");
    ele1.classList.add("activeBtn");
  };
  const facultyEventHandler = () => {
    setSelectType("faculty");
    let ele1 = document.getElementById("studentSelect");
    let ele2 = document.getElementById("facultySelect");
    ele1.classList.remove("activeBtn");
    ele2.classList.add("activeBtn");
  };

  return (
    <React.StrictMode>
      <Navbar title="Login" />
      <section className="loginContainer">
        <div className="loginCard">
          <div className="select">
            <button
              className="selectBtn activeBtn"
              id="studentSelect"
              onClick={studentEventHandler}
            >
              Students
            </button>
            <hr />
            <button
              className="selectBtn"
              id="facultySelect"
              onClick={facultyEventHandler}
            >
              Faculty
            </button>
          </div>
          <hr />
          <div className="login">
            <label htmlFor="loginid">Login Id</label>
            <input type="text" id="loginid" name="loginid" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
            <button className="submitBtn" onClick={loginValidate}>
              Login
            </button>
          </div>
        </div>
        <ToastContainer />
      </section>
    </React.StrictMode>
  );
};

export default Login;
