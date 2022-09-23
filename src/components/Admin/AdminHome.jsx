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
import { CgDanger } from "react-icons/cg";
import AddFaculty from "./AddFaculty";
import FacultyList from "./FacultyList";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  const navigate = useNavigate();
  const [selectedBtn, setSeletedBtn] = useState("");
  const [branchWiseData, SetbranchWiseData] = useState([]);
  const [branchWiseStudentData, SetbranchWiseStudentData] = useState([]);
  const [branchCount, setbranchCount] = useState(0);
  const [subjectCount, setsubjectCount] = useState(0);
  const [facultyCount, setfacultyCount] = useState(0);
  const [studentCount, setstudentCount] = useState(0);
  const [totalStudent, setTotalStudents] = useState(0);
  const [adminDetails, setAdminDetials] = useState([]);
  const rights = sessionStorage.getItem("rights");
  const currentadminName = sessionStorage.getItem("name");

  useEffect(() => {
    if (sessionStorage.getItem("rights") === null) {
      sessionStorage.clear();
      navigate("/admin");
    } else {
      const faculty = query(collection(db, `faculty_credentials/`));
      onSnapshot(faculty, (querySnapshot) => {
        setfacultyCount(querySnapshot.docs.length);
      });
      const students = query(collection(db, `students_credentials/`));
      onSnapshot(students, (querySnapshot) => {
        setstudentCount(querySnapshot.docs.length);
      });
      const subjects = query(collection(db, `subjects/`));
      onSnapshot(subjects, (querySnapshot) => {
        setsubjectCount(querySnapshot.docs.length);
      });
      const branches = query(collection(db, `students_details/`));
      onSnapshot(branches, (querySnapshot) => {
        setbranchCount(querySnapshot.docs.length);
      });
      const branchWiseDetail = query(collection(db, `students_details/`));
      onSnapshot(branchWiseDetail, (querySnapshot) => {
        querySnapshot.forEach((data) => {
          SetbranchWiseData((prev) => [...prev, data.id]);
          const detailOfStudents = query(
            collection(db, `students_details/${data.id}/individual_student`)
          );
          onSnapshot(detailOfStudents, (querySnapshot) => {
            setTotalStudents(totalStudent + querySnapshot.docs.length);
            SetbranchWiseStudentData((prev) => [
              ...prev,
              querySnapshot.docs.length,
            ]);
          });
        });
      });
      const adminDetails = query(collection(db, `admin_credentials/`));
      onSnapshot(adminDetails, (querySnapshot) => {
        setAdminDetials(
          querySnapshot.docs.map((doc) => ({
            allAdmins: doc.data(),
            allId: doc.id,
          }))
        );
      });
    }
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
      return <AddFaculty />;
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
    } else if (selectedBtn === "view_faculty") {
      ResetActiveMenu();
      let btn = document.getElementById("adminPanelFacultyListBtn");
      btn.classList.add("active");
      return <FacultyList />;
    }
  };
  return (
    <>
      <Navbar title={`Admin Panel - CMS`} route="admin" />
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
        <div className="middleAdminCards">
          <div className="adminAllBranchData">
            <p className="adminBranchDetailTitle">Branch And Students Detail</p>
            {branchWiseData.map((branch, index) => {
              return (
                <p className="adminBranchDetailLabel" key={index}>
                  {branch} : {branchWiseStudentData[index]} Students
                </p>
              );
            })}
          </div>
          <div className="adminAllAdminData">
            <p className="adminDetailTitle">Admins Details</p>
            {adminDetails.map((admin) => {
              return (
                <p className="adminDetailLabel" key={admin.allId}>
                  <span className="adminEmail">
                    {admin.allAdmins.name === currentadminName
                      ? admin.allAdmins.name + " " + "(Active)"
                      : admin.allAdmins.name}
                  </span>
                  <span className="rightsInfo">
                    {admin.allAdmins.rights} Access
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <p
          className={
            rights === "limited" ? "rightsMessage " : "rightsMessage disable"
          }
        >
          <span id="rightIcon">
            <CgDanger />
          </span>
          Your Admin Rights Are Limited!
        </p>
        <div className="adminBtnArea" id="adminBtnArea">
          <button
            className={
              rights === "limited"
                ? "adminPanelBtns disable "
                : "adminPanelBtns"
            }
            onClick={() => setSeletedBtn("add_student")}
            id="adminPanelAddStudentBtn"
          >
            Add Student
          </button>
          <button
            className={rights === "limited" ? "disable" : "adminPanelBtns"}
            onClick={() => setSeletedBtn("add_faculty")}
            id="adminPanelAddFacultyBtm"
          >
            Add Faculty
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("add_subject")}
            id="adminPanelAddSubjectBtn"
          >
            Add Subject
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
            View Students
          </button>
          <button
            className="adminPanelBtns"
            onClick={() => setSeletedBtn("view_faculty")}
            id="adminPanelFacultyListBtn"
          >
            View Faculty
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
