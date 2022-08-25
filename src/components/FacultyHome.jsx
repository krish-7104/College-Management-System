import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FacultyCard from "./Faculty/FacultyCard";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import "../style/FacultyHome.css";
const FacultyHome = () => {
  let loginId = localStorage.getItem("loginid");
  let department = localStorage.getItem("department");
  let counsellor = localStorage.getItem("counsellor");

  const [details, setDetails] = useState([
    {
      email: "",
      fullname: "",
      experience: "",
      gender: "",
      phoneno: "",
      department: "",
      dob: "",
      post: "",
      joining_date: "",
      photo:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
  ]);
  useEffect(() => {
    const q1 = query(
      collection(db, `faculty_details/${department}/faculty_info`)
    );
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        console.log(data.data().email, loginId);
        if (data.data().email === loginId) {
          setDetails(() => [
            {
              fullname:
                data.data().first_name +
                " " +
                data.data().middle_name +
                " " +
                data.data().last_name,
              email: loginId,
              experience: data.data().experience,
              department: department,
              dob: data.data().dob,
              post: data.data().post,
              joining_date: data.data().joining_date,
              gender: data.data().gender,
              phoneno: data.data().phoneno,
              photo: data.data().photo,
            },
          ]);
        }
      });
    });
  }, []);

  const uploadMarksClicked = () => {
    console.log("clicked");
  };
  const uploadNoticebtnClicked = () => {
    console.log("clicked");
  };
  const marksbtnClicked = () => {
    console.log("clicked");
  };
  const stundentListbtnClicked = () => {
    console.log("clicked");
  };
  const logoutHandler = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  const registerStudentClicked = () => {
    console.log("clicked");
  };
  return (
    <React.StrictMode>
      <Navbar title="Faculty" />
      <section className="facultyContainer">
        <FacultyCard allData={details} />
        <div className="facultyBtnsArea">
          <ul className="facultyList">
            <li id="uploadMarks" onClick={uploadMarksClicked}>
              Upload Marks
            </li>
            <li id="uploadNotice" onClick={uploadNoticebtnClicked}>
              Upload Notice
            </li>
            <li id="stundentList" onClick={stundentListbtnClicked}>
              Student List
            </li>
            <li
              id="registerStudent"
              className={counsellor === "true" ? "none" : "disable"}
              onClick={registerStudentClicked}
            >
              Register Student
            </li>
            <li id="logout" onClick={logoutHandler}>
              Log Out
            </li>
          </ul>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default FacultyHome;
