import React from "react";
import { db } from "../../backend/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadNotice = () => {
  const submitBtnClickedNotice = async () => {
    let uploadDate = Timestamp.now();
    let title = document.getElementById("noticeTitleAdd").value;
    let link = document.getElementById("noticeLinkAdd").value;
    if (link === "") {
      link = "no";
    }
    if (title.value !== "") {
      try {
        await addDoc(collection(db, "notices"), {
          title: title,
          link: link,
          timestamp: uploadDate,
        });
        toast.success("Notice Upload Successfully!", {
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
      toast.warn("Enter All Fields Please!", {
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
        </div>
        <br />
        <p className="leaveBlankMessage">Leave Blank If No Link Present</p>
        <button id="uploadNoticeSubmitBtn" onClick={submitBtnClickedNotice}>
          Upload Notice
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadNotice;
