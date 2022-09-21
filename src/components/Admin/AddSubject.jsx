import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
const AddSubject = () => {
  const [subjectName, setSubjectName] = useState([]);
  const [subjectId, setSubjectId] = useState([]);
  useEffect(() => {
    const q1 = query(collection(db, `subjects`));
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (!subjectName.includes(data.data().name)) {
          setSubjectName((prev) => [...prev, data.data().name]);
          setSubjectId((prev) => [...prev, data.data().id]);
        }
      });
    });
  }, []);
  const addSubjectSubmitBtnHandler = async () => {
    let sName = document.getElementById("subjectName").value;
    let sId = document.getElementById("subjectId").value;
    if (subjectId.includes(sId) && subjectName.includes(sName)) {
      alert("Subject Name And Id Already Exists");
    } else if (subjectId.includes(sId)) {
      alert("Subject Id Already Exists");
    } else if (subjectName.includes(sName)) {
      alert("Subject Name Already Exists");
    } else {
      try {
        await addDoc(collection(db, "subjects"), {
          id: sId,
          name: sName,
          updated: Timestamp.now(),
        });
        toast.success("Subject Added Successfully!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        toast.warn("Something Went Wrong!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <>
      <div className="addSubjectArea">
        <div className="subjectsList">
          <p className="subjectListTitle">Subject ID And Name</p>
          {subjectName.map((name, index) => {
            return <li key={index}>{subjectId[index] + " - " + name} </li>;
          })}
        </div>
        <div className="addSubjectSection">
          <div className="addSubjectInputArea">
            <label htmlFor="subjectId">Subject ID</label>
            <input type="number" name="subjectId" id="subjectId" />
          </div>
          <div className="addSubjectInputArea">
            <label htmlFor="subjectName">Subject Name</label>
            <input type="text" name="subjectName" id="subjectName" />
          </div>
          <button
            className="submitAddSubjectDetails"
            onClick={addSubjectSubmitBtnHandler}
          >
            Add Subject
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddSubject;
