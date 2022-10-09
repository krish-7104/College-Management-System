import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import StudentCard from "./StudentCard";
import "../../style/StudentHome.css";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Notice from "./Notice";
import Material from "./Material";
import Timetable from "./Timetable";
import Marks from "./Marks";
import { useNavigate } from "react-router-dom";
const StudentHome = () => {
  const navigate = useNavigate();
  const [selectedBtn, setSeletedBtn] = useState("");
  let loginId = sessionStorage.getItem("loginid");
  let branch = sessionStorage.getItem("branch");
  const [timetable, setTimeTable] = useState("");
  const [details, setDetails] = useState([
    {
      fullname: "",
      e_no: "",
      gender: "",
      phoneno: "",
      branch: "",
      semester: "",
      category: "",
      dob: "",
      email: "",
      photo:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
  ]);

  useEffect(() => {
    // if (sessionStorage.getItem("loginid") !== null) {
    // if (sessionStorage.getItem("loginid").includes("@")) {
    //   sessionStorage.clear();
    //   navigate("/");
    // } else {
    const q1 = query(
      collection(db, `students_details/${branch}/individual_student/`)
    );
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (data.data().e_no === loginId) {
          setDetails(() => [
            {
              fullname: data.data().first_name + " " + data.data().last_name,
              e_no: loginId,
              gender: data.data().gender,
              phoneno: data.data().phone_no,
              branch: branch,
              semester: data.data().current_sem,
              category: data.data().category,
              photo: data.data().photo,
              email: data.data().email,
              dob: data.data().birth_date,
            },
          ]);
        }
      });
    });
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (data.id === branch) {
          setTimeTable(data.data().timetable);
        }
      });
    });
    // }
    // } else {
    //   sessionStorage.clear();
    //   navigate("/");
    // }
  }, [branch]);

  const ResetActiveMenu = () => {
    let btnsCont = document.getElementById("studentList");
    if (btnsCont !== null) {
      let btns = btnsCont.getElementsByClassName("studentMenuList");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
      }
    }
  };
  const menuSelectedHandlerValue = () => {
    ResetActiveMenu();
    if (selectedBtn === "material") {
      ResetActiveMenu();
      let btn = document.getElementById("material");
      btn.classList.add("active");
      return <Material />;
    } else if (selectedBtn === "marks") {
      let btn = document.getElementById("marks");
      btn.classList.add("active");
      return (
        <Marks
          semester={"Semester" + " " + details[0].semester.toString()}
          branch={branch}
          enrollment={loginId}
        />
      );
    } else if (selectedBtn === "notice") {
      ResetActiveMenu();
      let btn = document.getElementById("notices");
      btn.classList.add("active");
      return <Notice />;
    } else if (selectedBtn === "timetable") {
      ResetActiveMenu();
      let btn = document.getElementById("timetable");
      btn.classList.add("active");
      return <Timetable ttlink={timetable} title={branch + "Timetable"} />;
    }
  };
  return (
    <>
      <Navbar title="Student Login - CMS" showText={details[0].e_no} />
      <section className="studentContainer">
        <StudentCard allData={details} />
        <div className="studentBtnsArea">
          <ul className="studentList" id="studentList">
            <li
              id="timetable"
              className="studentMenuList"
              onClick={() => setSeletedBtn("timetable")}
            >
              Timetable
            </li>
            <li
              id="material"
              className="studentMenuList"
              onClick={() => setSeletedBtn("material")}
            >
              Material
            </li>
            <li
              id="marks"
              className="studentMenuList"
              onClick={() => setSeletedBtn("marks")}
            >
              View Marks
            </li>
            <li
              id="notices"
              className="studentMenuList"
              onClick={() => setSeletedBtn("notice")}
            >
              Notices
            </li>
          </ul>
        </div>
        <section className="studentView" id="studentView">
          {menuSelectedHandlerValue()}
        </section>
      </section>
    </>
  );
};

export default StudentHome;
