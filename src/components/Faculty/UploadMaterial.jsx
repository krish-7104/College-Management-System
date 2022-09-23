import React from "react";
import { db } from "../../backend/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadMaterial = () => {
  const submitBtnClickedMaterial = async () => {
    let uploadDate = Timestamp.now();
    let title = document.getElementById("materialTitleAdd");
    let link = document.getElementById("materialLinkAdd");
    let subject = document.getElementById("materialSubjectAdd");
    if (title.value !== "") {
      try {
        await addDoc(collection(db, "materials"), {
          title: title.value,
          link: link.value,
          subject: subject.value,
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
          <input type="text" id="materialSubjectAdd" />
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
