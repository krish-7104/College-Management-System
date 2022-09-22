import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import FacultyCard from "./FacultyCard";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import "../../style/FacultyHome.css";
import UploadNotice from "./UploadNotice";
import UploadMaterial from "./UploadMaterial";
import UploadMarks from "./UploadMarks";
import StudentList from "./StudentList";
import { useNavigate } from "react-router-dom";
import AddTimetable from "./AddTimetable";
const FacultyHome = () => {
  const navigate = useNavigate();
  let loginId = sessionStorage.getItem("loginid");
  let department = sessionStorage.getItem("department");
  const [selectedBtn, setSeletedBtn] = useState("");
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
      emp_id: "",
      photo:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
  ]);
  useEffect(() => {
    if (sessionStorage.getItem("loginid") !== null) {
      if (!sessionStorage.getItem("loginid").includes("@")) {
        sessionStorage.clear();
        navigate("/");
      } else {
        const q1 = query(
          collection(db, `faculty_details/${department}/individual_faculty`)
        );
        onSnapshot(q1, (querySnapshot) => {
          querySnapshot.docs.forEach((data) => {
            if (data.data().email === loginId) {
              setDetails(() => [
                {
                  fullname:
                    data.data().first_name + " " + data.data().last_name,
                  email: loginId,
                  department: department,
                  dob: data.data().birth_date,
                  post: data.data().post,
                  gender: data.data().gender,
                  phoneno: data.data().phone_no,
                  photo: data.data().photo,
                  emp_id: data.data().emp_no,
                },
              ]);
            }
          });
        });
      }
    } else {
      sessionStorage.clear();
      navigate("/");
    }
  }, [department, loginId]);

  const ResetActiveMenu = () => {
    let btnsCont = document.getElementById("facultyList");
    let btns = btnsCont.getElementsByClassName("facultyMenuList");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
  };
  const menuSelectedHandlerValue = () => {
    if (selectedBtn === "material") {
      ResetActiveMenu();
      let btn = document.getElementById("uploadMaterialFacultyBtn");
      btn.classList.add("active");
      return <UploadMaterial />;
    } else if (selectedBtn === "notice") {
      ResetActiveMenu();
      let btn = document.getElementById("uploadNoticeBtn");
      btn.classList.add("active");
      return <UploadNotice />;
    } else if (selectedBtn === "marks") {
      ResetActiveMenu();
      let btn = document.getElementById("uploadMarksFacultyBtn");
      btn.classList.add("active");
      return <UploadMarks />;
    } else if (selectedBtn === "student-list") {
      ResetActiveMenu();
      let btn = document.getElementById("viewStudentFacultyBtn");
      btn.classList.add("active");
      return <StudentList />;
    } else if (selectedBtn === "add-timetable") {
      ResetActiveMenu();
      let btn = document.getElementById("addTimetableFacultyBtn");
      btn.classList.add("active");
      return <AddTimetable />;
    }
  };
  return (
    <>
      <Navbar title="Faculty Login - CMS" />
      <section className="facultyContainer">
        <FacultyCard allData={details} />
        <div className="facultyBtnsArea">
          <ul className="facultyList" id="facultyList">
            <li
              id="uploadNoticeBtn"
              className="facultyMenuList"
              onClick={() => setSeletedBtn("notice")}
            >
              Upload Notice
            </li>
            <li
              id="uploadMaterialFacultyBtn"
              className="facultyMenuList"
              onClick={() => setSeletedBtn("material")}
            >
              Upload Material
            </li>
            <li
              id="uploadMarksFacultyBtn"
              className="facultyMenuList"
              onClick={() => setSeletedBtn("marks")}
            >
              Upload Marks
            </li>
            <li
              id="viewStudentFacultyBtn"
              className="facultyMenuList"
              onClick={() => setSeletedBtn("student-list")}
            >
              Student List
            </li>
            <li
              id="addTimetableFacultyBtn"
              className="facultyMenuList"
              onClick={() => setSeletedBtn("add-timetable")}
            >
              Add Timetable
            </li>
          </ul>
        </div>
        <div className="facultyShowArea" id="facultyShowArea">
          {menuSelectedHandlerValue()}
        </div>
      </section>
    </>
  );
};

export default FacultyHome;
