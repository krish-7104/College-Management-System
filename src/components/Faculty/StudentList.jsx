import React, { useState, useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const StudentList = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const callBranchDataFromDatabase = () => {
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setBranches((prev) => [...prev, data.id]);
      });
    });
  };

  useEffect(() => {
    callBranchDataFromDatabase();
  }, []);

  const branchSelectHandler = (e) => {
    setSelectedBranch(e.target.value);
  };
  const semesterSelectHandler = (e) => {
    setSelectedSemester(e.target.value);
  };
  const callStudentListDataFromDatabase = () => {
    const q2 = query(
      collection(db, `students_details/${selectedBranch}/individual_student/`)
    );
    onSnapshot(q2, (querySnapshot) => {
      let data = document.getElementById("showListSec");
      let html = `<div class="studentListTable">
        <p class="studentBranchShowTitle">
        Students Of ${selectedBranch}
        </p>`;
      querySnapshot.docs.forEach((data) => {
        if (
          data.data().current_sem.toString() === selectedSemester.toString()
        ) {
          html += ` <div class="studentListShowCardStudentView">
        <img
          class="studentlistViewProfile"
          src=${data.data().photo}
          alt="student list data"
        />
        <p class="studentListShowEnrollment">
        <small>E No.</small>
        ${data.data().e_no}
        </p>
        <p class="studentListShowName">
        <small>Full Name</small>
        ${data.data().first_name + " " + data.data().last_name}</p>
        <p class="studentListShowPhoneNo">
        <small>Phone No.</small>
        ${data.data().phone_no}
        </p>
      </div>`;
        }
      });
      if (html.endsWith("</p>")) {
        html = "No Students Detail Found!";
      }
      data.innerHTML = html;
    });
  };
  return (
    <section className="studentListViewFaculty">
      <div className="selectBranch">
        <select
          name="selectBranch"
          id="selectBranch"
          onChange={branchSelectHandler}
        >
          <option value="null">--- Select Branch ---</option>
          {branches.map((branch, index) => {
            return (
              <option key={index} value={branch}>
                {branch}
              </option>
            );
          })}
        </select>
        <select
          name="selectSemester"
          id="selectSemester"
          onChange={semesterSelectHandler}
        >
          <option value="null">--- Select Semester ---</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
        <button
          id="getStudentDataBtn"
          onClick={() => callStudentListDataFromDatabase()}
        >
          Get Student Data
        </button>
      </div>
      <div className="showListSec" id="showListSec"></div>
    </section>
  );
};

export default StudentList;
