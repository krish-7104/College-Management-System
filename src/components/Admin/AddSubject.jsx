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
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
const AddSubject = () => {
  const [SubjectData, setSubjectData] = useState([]);
  useEffect(() => {
    const q1 = query(collection(db, `subjects`), orderBy("id", "desc"));
    onSnapshot(q1, (querySnapshot) => {
      setSubjectData(
        querySnapshot.docs.map((doc) => ({
          allSubjects: doc.data(),
        }))
      );
    });
  }, []);
  const addSubjectSubmitBtnHandler = async () => {
    let sName = document.getElementById("subjectName").value;
    let sId = document.getElementById("subjectId").value;
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
  };
  const SubjectListView = (data) => {
    return (
      <li className="listShowSubjects" key={data.allSubjects.id}>
        {data.allSubjects.name + " - " + data.allSubjects.id}
      </li>
    );
  };
  return (
    <>
      <div className="addSubjectArea">
        <div className="subjectsList">
          <p className="subjectListTitle" id="subjectListTitle">
            Subject ID And Name
          </p>
          <ol>{SubjectData.map(SubjectListView)}</ol>
        </div>
        {console.log(SubjectData)}
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
