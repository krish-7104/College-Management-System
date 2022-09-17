import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FacultyCard from "./Faculty/FacultyCard";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import "../style/FacultyHome.css";
import UploadNotice from "./Faculty/UploadNotice";
import AddStudent from "./Faculty/AddStudent";
import UploadMaterial from "./Faculty/UploadMaterial";
import { useNavigate } from "react-router-dom";

const FacultyHome = () => {
  const navigate = useNavigate();
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
              dob: data.data().birth_date,
              post: data.data().post,
              joining_date: data.data().joining_date,
              gender: data.data().gender,
              phoneno: data.data().phone_no,
              photo: data.data().photo,
            },
          ]);
        }
      });
    });
  }, [loginId, department]);

  const uploadNoticebtnClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("uploadNotice");
    ele2.classList.remove("disable");
    document.getElementById("registerStudent").classList.add("disable");
    document.getElementById("showNoticeFaculty").classList.add("disable");
  };
  const registerStudentClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("registerStudent");
    ele2.classList.remove("disable");
    document.getElementById("uploadNotice").classList.add("disable");
    document.getElementById("showNoticeFaculty").classList.add("disable");
  };
  const updateMaterialbtnClicked = () => {
    let ele = document.getElementById("facultyShowArea");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("showNoticeFaculty");
    ele2.classList.remove("disable");
    document.getElementById("registerStudent").classList.add("disable");
    document.getElementById("uploadNotice").classList.add("disable");
  };
  return (
    <>
      <Navbar title="Faculty" />
      <section className="facultyContainer">
        <FacultyCard allData={details} />
        <div className="facultyBtnsArea">
          <ul className="facultyList">
            <li id="uploadNoticeBtn" onClick={uploadNoticebtnClicked}>
              Upload Notice
            </li>
            <li
              id="uploadMaterialFacultyBtn"
              onClick={updateMaterialbtnClicked}
            >
              Upload Material
            </li>
            <li id="registerStudentBtn" onClick={registerStudentClicked}>
              Register Student
            </li>
          </ul>
        </div>
        <div className="facultyShowArea disable" id="facultyShowArea">
          <div className="uploadNotice disable" id="uploadNotice">
            <UploadNotice />
          </div>
          <div className="showNoticeFaculty disable" id="showNoticeFaculty">
            <UploadMaterial />
          </div>
          <div className="registerStudent disable" id="registerStudent">
            <AddStudent />
          </div>
        </div>
      </section>
    </>
  );
};

export default FacultyHome;
