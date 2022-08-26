import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FacultyCard from "./Faculty/FacultyCard";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import "../style/FacultyHome.css";
import ShowNotice from "./Faculty/ShowNotice";
import UploadNotice from "./Faculty/UploadNotice";
import Admin from "./Faculty/Admin";
const FacultyHome = () => {
  let loginId = localStorage.getItem("loginid");
  let department = localStorage.getItem("department");
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

  const uploadNoticebtnClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("uploadNotice");
    ele2.classList.remove("disable");
    document.getElementById("registerStudent").classList.add("disable");
    document.getElementById("showNoticeFaculty").classList.add("disable");
  };
  const logoutHandler = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  const registerStudentClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("registerStudent");
    ele2.classList.remove("disable");
    document.getElementById("uploadNotice").classList.add("disable");
    document.getElementById("showNoticeFaculty").classList.add("disable");
  };
  const showNoticeFacultyClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("showNoticeFaculty");
    ele2.classList.remove("disable");
    document.getElementById("registerStudent").classList.add("disable");
    document.getElementById("uploadNotice").classList.add("disable");
  };
  return (
    <React.StrictMode>
      <Navbar title="Faculty" />
      <section className="facultyContainer">
        <FacultyCard allData={details} />
        <div className="facultyBtnsArea">
          <ul className="facultyList">
            <li id="uploadNoticeBtn" onClick={uploadNoticebtnClicked}>
              Upload Notice
            </li>
            <li id="showNoticeFacultyBtn" onClick={showNoticeFacultyClicked}>
              Show Notice
            </li>
            <li id="registerStudentBtn" onClick={registerStudentClicked}>
              Register Student
            </li>
            <li id="logout" onClick={logoutHandler}>
              Log Out
            </li>
          </ul>
        </div>
        <div className="facultyShowArea disable" id="facultyShowArea">
          <div className="uploadNotice disable" id="uploadNotice">
            <UploadNotice />
          </div>
          <div className="showNoticeFaculty disable" id="showNoticeFaculty">
            <ShowNotice />
          </div>
          <div className="registerStudent disable" id="registerStudent">
            <Admin />
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default FacultyHome;
