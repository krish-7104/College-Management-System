import React, { useState } from "react";
import Navbar from "../Navbar";
import "../../style/AdminHome.css";
import AddStudent from "./AddStudent";
import UploadNotice from "../Faculty/UploadNotice";
import StudentList from "../Faculty/StudentList";
const AdminHome = () => {
  const [selectedBtn, setSeletedBtn] = useState("");
  const ResetActiveMenu = () => {
    let btnsCont = document.getElementById("adminBtnArea");
    let btns = btnsCont.getElementsByClassName("adminPanelBtns");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
  };
  const menuSelectedHandlerValue = () => {
    if (selectedBtn === "student_detail") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelStudentDetialsBtn");
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
    }
  };
  return (
    <>
      <Navbar title="Admin Panel - CMS" />
      <div className="adminCards">
        <div className="adminCard">
          <p className="adminCardLabel">Total Students - 10</p>
        </div>
        <div className="adminCard">
          <p className="adminCardLabel">Total Faculty - 10</p>
        </div>
        <div className="adminCard">
          <p className="adminCardLabel">Total Subjects - 10</p>
        </div>
        <div className="adminCard">
          <p className="adminCardLabel">Total Branches - 10</p>
        </div>
      </div>
      <div className="mainAdminArea">
        <div className="adminAllBranchData">
          <p className="adminBranchDetailTitle">Branch And Students Detail</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
          <p className="adminBranchDetailLabel">CSE-IOT Branch : 20 Students</p>
        </div>

        <div className="adminBtnArea" id="adminBtnArea">
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("student_detail")}
            id="adminPanelStudentDetialsBtn"
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
        </div>
        <div className="facultyShowArea" id="facultyShowArea">
          {menuSelectedHandlerValue()}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
