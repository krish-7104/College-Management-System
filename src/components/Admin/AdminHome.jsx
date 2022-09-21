import React, { useState } from "react";
import Navbar from "../Navbar";
import "../../style/AdminHome.css";
import AddStudent from "./AddStudent";
import UploadNotice from "../Faculty/UploadNotice";
import StudentList from "../Faculty/StudentList";
import AddSubject from "./AddSubject";
import { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const AdminHome = () => {
  const [selectedBtn, setSeletedBtn] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [branchCount, setbranchCount] = useState(0);
  const [subjectCount, setsubjectCount] = useState(0);
  const [facultyCount, setfacultyCount] = useState(0);
  useEffect(() => {
    const student = query(collection(db, `students_credentials/`));
    onSnapshot(student, (querySnapshot) => {
      setStudentCount(querySnapshot.docs.length);
    });
    const faculty = query(collection(db, `faculty_credentials/`));
    onSnapshot(faculty, (querySnapshot) => {
      setfacultyCount(querySnapshot.docs.length);
    });
    const subjects = query(collection(db, `subjects/`));
    onSnapshot(subjects, (querySnapshot) => {
      setsubjectCount(querySnapshot.docs.length);
    });
    const branches = query(collection(db, `students_details/`));
    onSnapshot(branches, (querySnapshot) => {
      setbranchCount(querySnapshot.docs.length);
    });
  }, []);

  const ResetActiveMenu = () => {
    let btnsCont = document.getElementById("adminBtnArea");
    let btns = btnsCont.getElementsByClassName("adminPanelBtns");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
  };
  const menuSelectedHandlerValue = () => {
    if (selectedBtn === "add_student") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelAddStudentBtn");
      btn.classList.add("active");
      return <AddStudent />;
    } else if (selectedBtn === "add_faculty") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelAddFacultyBtm");
      btn.classList.add("active");
      return <div>Hello Faculty</div>;
    } else if (selectedBtn === "add_notice") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelAddNoticeBtn");
      btn.classList.add("active");
      return <UploadNotice />;
    } else if (selectedBtn === "view_student") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelStudentListBtn");
      btn.classList.add("active");
      return <StudentList />;
    } else if (selectedBtn === "add_subject") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelAddSubjectBtn");
      btn.classList.add("active");
      return <AddSubject />;
    }
  };
  return (
    <>
      <Navbar title="Admin Panel - CMS" />
      <section className="mainAdminPanelContainer">
        <div className="adminCards">
          <div className="adminCard">
            <p className="adminCardLabel">Total Students - {studentCount}</p>
          </div>
          <div className="adminCard">
            <p className="adminCardLabel">Total Faculty - {facultyCount}</p>
          </div>
          <div className="adminCard">
            <p className="adminCardLabel">Total Subjects - {subjectCount}</p>
          </div>
          <div className="adminCard">
            <p className="adminCardLabel">Total Branches - {branchCount}</p>
          </div>
        </div>
        <div className="adminAllBranchData">
          <p className="adminBranchDetailTitle">Branch And Students Detail</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
        </div>

        <div className="adminBtnArea" id="adminBtnArea">
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("add_student")}
            id="adminPanelAddStudentBtn"
          >
            Student Details
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("add_faculty")}
            id="adminPanelAddFacultyBtm"
          >
            Add Faculty
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("add_notice")}
            id="adminPanelAddNoticeBtn"
          >
            Add Notice
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("view_student")}
            id="adminPanelStudentListBtn"
          >
            View Student List
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("add_subject")}
            id="adminPanelAddSubjectBtn"
          >
            Add Subject
          </button>
        </div>
        <div className="facultyShowArea" id="facultyShowArea">
          {menuSelectedHandlerValue()}
        </div>
      </section>
    </>
  );
};

export default AdminHome;
