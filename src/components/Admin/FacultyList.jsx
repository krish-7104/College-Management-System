import React, { useState, useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const FacultyList = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const callBranchDataFromDatabase = () => {
    const q2 = query(collection(db, `faculty_details/`));
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

  const callStudentListDataFromDatabase = () => {
    const q2 = query(
      collection(db, `faculty_details/${selectedBranch}/individual_faculty/`)
    );
    onSnapshot(q2, (querySnapshot) => {
      let data = document.getElementById("showListSec");
      let html = `<div class="studentListTable">
        <p class="studentBranchShowTitle">
        Faculty Of ${selectedBranch}
        </p>`;
      querySnapshot.docs.forEach((data) => {
        html += ` <div class="facultyListShowCardStudentView">
        <img
          class="facultylistViewProfile"
          src=${data.data().photo}
          alt="faculty list data"
        />
        <p class="facultyListShowEnrollment">
        <small>Emp No.</small>
        ${data.data().emp_no}
        </p>
        <p class="facultyListShowName">
        <small>Full Name</small>
        ${data.data().first_name + " " + data.data().last_name}</p>
        <p class="facultyListShowPhoneNo">
        <small>Phone No.</small>
        ${data.data().phone_no}
        </p>
        <p class="facultyListShowPost">
        <small>Post</small>
        ${data.data().post === "Head Of Department" ? "HOD" : data.data().post}
        </p>
        <a class="facultyListShowEmail" href="mailto:${data.data().email}">
        <small>Email</small>
        ${data.data().email}
        </a>
      </div>`;
      });
      if (html.endsWith("</p>")) {
        html = "No Faculty Detail Found!";
      }
      data.innerHTML = html;
    });
  };
  return (
    <section className="facultyListViewFaculty">
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
        <button
          id="getStudentDataBtn"
          onClick={() => callStudentListDataFromDatabase()}
        >
          Get Faculty Data
        </button>
      </div>
      <div className="showListSec" id="showListSec"></div>
    </section>
  );
};

export default FacultyList;
