import React, { useState, useEffect } from "react";
import { db } from "../../backend/firebase";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
const UploadMarks = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [examTypeSemester, setExamTypeSemester] = useState(null);

  const callBranchDataFromDatabase = () => {
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setBranches((prev) => [...prev, data.id]);
      });
    });
  };
  const callSubjectDataFromDatabase = () => {
    const q2 = query(collection(db, `subjects/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setSubjects((prev) => [...prev, data.data().name]);
      });
    });
  };
  useEffect(() => {
    callBranchDataFromDatabase();
    callSubjectDataFromDatabase();
  }, []);

  const branchSelectHandler = (e) => {
    setSelectedBranch(e.target.value);
  };
  const selectExamTypeHandler = (e) => {
    setExamTypeSemester(e.target.value);
  };
  const subjectSelectHandler = (e) => {
    setSelectedSubject(e.target.value);
  };
  const semesterSelectHandler = (e) => {
    setSelectedSemester(e.target.value);
  };
  const submitMarksOnDatabase = async () => {
    if (
      selectedBranch !== null &&
      selectedSemester !== null &&
      selectedSubject !== null &&
      examTypeSemester !== null
    ) {
      let allbtns = document.getElementsByClassName(
        "studentMarksUploadCardMarksUpload"
      );
      for (let i = 0; i < allbtns.length; i++) {
        let inputId = allbtns[i].childNodes[5].id;
        let mark = document.getElementById(inputId).value;
        console.log(inputId.replace("mark", ""));
        await setDoc(
          doc(
            db,
            `/students_details/${selectedBranch}/${examTypeSemester}/${inputId.replace(
              "mark",
              ""
            )}/Semester ${selectedSemester}/`,
            `${selectedSubject}`
          ),
          {
            marks: mark,
          }
        );
      }
    }
    alert("Marks Uploaded");
  };

  const callStudentListDataFromDatabase = () => {
    const q2 = query(
      collection(db, `students_details/${selectedBranch}/individual_student/`)
    );
    onSnapshot(q2, (querySnapshot) => {
      let data = document.getElementById("showStudentMarkUploadSec");
      let html = `<div class="studentListTable">
      <p class="studentBranchShowTitle">
      Upload Marks Of ${selectedSubject} - ${selectedBranch}
      </p>`;
      querySnapshot.docs.forEach((data) => {
        if (
          data.data().current_sem.toString() === selectedSemester.toString()
        ) {
          html += ` <div class="studentMarksUploadCardMarksUpload">
        <p class="studentMarksUploadEnrollment">
        ${data.data().e_no}
        </p>
        <p class="studentMarksUploadName">
        ${
          data.data().first_name +
          " " +
          data.data().middle_name +
          " " +
          data.data().last_name
        }</p>
        <input type="number" className='allMarksInput' name="marks" id='${
          data.data().e_no + "mark"
        }' placeholder="Enter Marks" />
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
    <section className="uploadMarksSection">
      <div className="selectBranch">
        <select
          name="selectBranch"
          id="selectBranch"
          onChange={branchSelectHandler}
        >
          <option value="null">--Select Branch--</option>
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
          <option value="null">--Select Semester--</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
        <select
          name="selectSubject"
          id="selectSubject"
          onChange={subjectSelectHandler}
        >
          <option value="null">--Select Subject--</option>
          {subjects.map((branch, index) => {
            return (
              <option key={index + 1} value={branch}>
                {branch}
              </option>
            );
          })}
        </select>
        <select
          name="selectExamType"
          id="selectExamType"
          onChange={selectExamTypeHandler}
        >
          <option value="null">--Select Exam--</option>
          <option value="midsem">Midsem</option>
          <option value="external">External</option>
        </select>
        <button
          id="getStudentDataBtn"
          onClick={() => callStudentListDataFromDatabase()}
        >
          Get Student Details
        </button>
      </div>
      <div
        className="showStudentMarkUploadSec"
        id="showStudentMarkUploadSec"
      ></div>
      <div className="uploadMarksSubmitArea">
        <button
          className="submitMarksUploadMarksSec"
          onClick={submitMarksOnDatabase}
        >
          Upload Marks Of Student
        </button>
      </div>
    </section>
  );
};

export default UploadMarks;
