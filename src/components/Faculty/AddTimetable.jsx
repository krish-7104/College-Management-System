import React, { useState, useEffect } from "react";
import { db } from "../../backend/firebase";
import {
  collection,
  setDoc,
  onSnapshot,
  query,
  doc,
  Timestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
const AddTimetable = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const callBranchDataFromDatabase = () => {
    const q2 = query(collection(db, `students_details/`));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setBranches((prev) => [...prev, data.id]);
      });
    });
  };
  const branchSelectHandler = (e) => {
    setSelectedBranch(e.target.value);
  };
  useEffect(() => {
    callBranchDataFromDatabase();
  }, []);

  const addTimetableToServer = async () => {
    try {
      await setDoc(doc(db, "students_details", selectedBranch), {
        timetable: document.getElementById("timetableLink").value,
        updated: Timestamp.now(),
      });
      document.getElementById("timetableLink").value = "";
      toast.success("Timetable Upload Successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      toast.warn("TimeTable Upload Failed, Try Again!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <section className="AddTimetableSec">
      <p className="timetableAdd">Add Timetable</p>
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
      <div className="addTimetableInputArea">
        <input
          type="text"
          id="timetableLink"
          name="timetableLink"
          className="timetableInput"
          placeholder="Timetable Link"
        />
        <button className="addTimetableBtn" onClick={addTimetableToServer}>
          Add Timetable
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddTimetable;
