import React from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
const StudentList = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const callDataFromDatabase = () => {
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setBranches((prev) => [...prev, data.id]);
      });
    });
  };

  useEffect(() => {
    callDataFromDatabase();
  }, []);

  const branchSelectHandler = (e) => {
    setSelectedBranch(e.target.value);
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
      </div>
      <div className="showListSec">
        <div className="studentListTable">
          <p className="studentBranchShowTitle">
            Students Of {selectedBranch} Branch
          </p>
          <div className="studentListShowCard">
            <img
              className="studentlistViewProfile"
              src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="student list data"
            />
            <p className="studentListShowEnrollment">Lorem ipsum .</p>
            <p className="studentListShowName">Lorem, ipsum dolor.</p>
            <p className="studentListShowPhoneNo">09875432</p>
          </div>
          <div className="studentListShowCard">
            <img
              className="studentlistViewProfile"
              src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="student list data"
            />
            <p className="studentListShowEnrollment">Lorem ipsum .</p>
            <p className="studentListShowName">Lorem, ipsum dolor.</p>
            <p className="studentListShowPhoneNo">09875432</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
