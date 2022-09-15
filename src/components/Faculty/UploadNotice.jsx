import React from "react";
import { db } from "../../backend/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadNotice = () => {
  const submitBtnClickedNotice = async () => {
    let uploadDate = new Date().toLocaleDateString();
    let title = document.getElementById("noticeTitleAdd");
    let link = document.getElementById("noticeLinkAdd");
    if (title.value !== "") {
      if (link.value === "") {
        try {
          await addDoc(collection(db, "notices"), {
            title: title.value,
            link_present: false,
            timestamp: uploadDate,
          });
          alert("Data Added Successfully!");
          title.value = "";
          link.title = "";
        } catch (err) {
          toast.warn("Notice Upload Failed, Try Again!", {
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
        try {
          await addDoc(collection(db, "notices"), {
            title: title.value,
            link: link.value,
            link_present: true,
            timestamp: uploadDate,
          });
          alert("Data Added Successfully!");
        } catch (err) {
          toast.warn("Notice Upload Failed, Try Again!", {
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
      }
    } else {
      toast.warn("Enter Notice Title Please!", {
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
      <div className="noticeAddForm">
        <p className="noticeAddtitle">Upload Notice</p>
        <div className="addNoticeTitleInput">
          <label htmlFor="noticeTitleAdd" className="noticeLabel">
            Notice Title
          </label>
          <input type="text" required id="noticeTitleAdd" />
        </div>
        <div className="addNoticeTitleInput">
          <label htmlFor="noticeLinkAdd" className="noticeLabel">
            Notice Link
          </label>
          <input type="text" id="noticeLinkAdd" />
          <p>Leave Notice Link Empty If No Link Present</p>
        </div>
        <button id="uploadNoticeSubmitBtn" onClick={submitBtnClickedNotice}>
          Upload Notice
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadNotice;
