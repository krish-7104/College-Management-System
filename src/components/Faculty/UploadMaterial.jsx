import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const UploadMaterial = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    getAllSubjects();
  }, []);

  let semester = [1, 2, 3, 4, 5, 6, 7, 8];

  const getAllSubjects = async () => {
    const querySnapshot = await getDocs(collection(db, "subjects"));
    querySnapshot.forEach((doc) => {
      if (doc.data().name !== "") {
        setSubjects((subjects) => [...subjects, doc.data().name]);
      }
    });
  };

  const submitBtnClickedMaterial = async () => {
    let uploadDate = Timestamp.now();
    let title = document.getElementById("materialTitleAdd");
    let link = document.getElementById("materialLinkAdd");
    let subject = document.getElementById("materialSubjectAdd");
    let semester = document.getElementById("materialSemester");

    if (title.value !== "") {
      try {
        await addDoc(collection(db, "materials"), {
          title: title.value,
          link: link.value,
          subject: subject.value,
          semester: semester.value,
          timestamp: uploadDate,
        });
        title.value = "";
        link.value = "";
        subject.value = "";
        toast.success("Material Upload Successfully!", {
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
        toast.warn("Material Upload Failed, Try Again!", {
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
    } else {
      toast.warn("Enter Material Title Please!", {
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
    <>
      <div className="materialAddForm">
        <p className="materialAddtitle">Upload Material</p>
        <div className="addmaterialTitleInput">
          <label htmlFor="materialTitleAdd" className="materialLabel">
            Material Title
          </label>
          <input type="text" required id="materialTitleAdd" />
        </div>
        <div className="addmaterialTitleInput">
          <label htmlFor="materialLinkAdd" className="materialLabel">
            Material Link
          </label>
          <input type="text" id="materialLinkAdd" />
        </div>
        <div className="addmaterialTitleInput">
          <label htmlFor="materialSubjectAdd" className="materialLabel">
            Subject Name
          </label>
          <select name="subjects" id="materialSubjectAdd">
            {subjects &&
              subjects.map((ele) => {
                return <option value={ele}>{ele}</option>;
              })}
          </select>
        </div>
        <div className="addmaterialTitleInput">
          <label htmlFor="materialSemester" className="materialLabel">
            Semester
          </label>
          <select name="subjects" id="materialSemester">
            {semester.map((ele) => {
              return <option value={ele}>{ele}</option>;
            })}
          </select>
        </div>
        <button id="uploadMaterialSubmitBtn" onClick={submitBtnClickedMaterial}>
          Upload material
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadMaterial;
