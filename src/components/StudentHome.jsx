import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import StudentCard from "./Student/StudentCard";
import "../style/StudentHome.css";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Notice from "./Student/Notice";
import Material from "./Student/Material";
import Marks from "./Student/Marks";
import Timetable from "./Student/Timetable";

const StudentHome = () => {
  let loginId = localStorage.getItem("loginid");
  let branch = localStorage.getItem("branch");
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
      photo:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
  ]);
  useEffect(() => {
    const q1 = query(
      collection(db, `students_details/${branch}/individual_student/`)
    );
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (data.data().e_no === loginId) {
          setDetails(() => [
            {
              fullname:
                data.data().first_name +
                " " +
                data.data().middle_name +
                " " +
                data.data().last_name,
              e_no: loginId,
              gender: data.data().gender,
              phoneno: data.data().phone_no,
              branch: branch,
              semester: data.data().current_sem,
              category: data.data().category,
              photo: data.data().photo,
              dob: data.data().birth_date,
            },
          ]);
        }
      });
    });
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const materialbtnClicked = () => {
    let ele = document.getElementById("studentView");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("materialArea");
    ele2.classList.remove("disable");
    document.getElementById("marksArea").classList.add("disable");
    document.getElementById("noticeArea").classList.add("disable");
    document.getElementById("timetableArea").classList.add("disable");
  };
  const marksbtnClicked = () => {
    let ele = document.getElementById("studentView");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("marksArea");
    ele2.classList.remove("disable");
    document.getElementById("noticeArea").classList.add("disable");
    document.getElementById("materialArea").classList.add("disable");
    document.getElementById("timetableArea").classList.add("disable");
  };
  const noticesbtnClicked = () => {
    let ele = document.getElementById("studentView");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("noticeArea");
    ele2.classList.remove("disable");
    document.getElementById("marksArea").classList.add("disable");
    document.getElementById("materialArea").classList.add("disable");
    document.getElementById("timetableArea").classList.add("disable");
  };

  const timetablebtnClicked = () => {
    let ele = document.getElementById("studentView");
    ele.classList.remove("disable");
    let ele2 = document.getElementById("timetableArea");
    ele2.classList.remove("disable");
    document.getElementById("marksArea").classList.add("disable");
    document.getElementById("noticeArea").classList.add("disable");
    document.getElementById("materialArea").classList.add("disable");
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (data.id === branch) {
          // window.open(data.data().timetable);
          setTimeTable(data.data().timetable);
        }
      });
    });
  };

  return (
    <React.StrictMode>
      <Navbar title="Students" />
      <section className="studentContainer">
        <StudentCard allData={details} />
        <div className="studentBtnsArea">
          <ul className="studentList">
            <li id="timetable" onClick={timetablebtnClicked}>
              Timetable
            </li>
            <li id="material" onClick={materialbtnClicked}>
              Material
            </li>
            <li id="marks" onClick={marksbtnClicked}>
              View Marks
            </li>
            <li id="notices" onClick={noticesbtnClicked}>
              Notices
            </li>
            <li id="logout" onClick={logoutHandler}>
              Log Out
            </li>
          </ul>
        </div>
        <section className="studentView disable" id="studentView">
          <div className="notice" id="noticeArea">
            <Notice />
          </div>
          <div className="material disable" id="materialArea">
            <Material />
          </div>
          <div className="marks disable" id="marksArea">
            <Marks />
            UNDER DEVELOPMENT.... 🚀
          </div>
          <div className="timetable disable" id="timetableArea">
            <Timetable ttlink={timetable} title={`timetable of ${branch}`} />
          </div>
        </section>
      </section>
    </React.StrictMode>
  );
};

export default StudentHome;
