import React from "react";
import "../../style/Admin.css";
import { db } from "../../backend/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(
        collection(
          db,
          `students_details/${
            document.getElementById("branch").value
          }/individual_student`
        ),
        {
          first_name: document.getElementById("FirstName").value,
          middle_name: document.getElementById("MiddleName").value,
          e_no: document.getElementById("e_no").value,
          last_name: document.getElementById("LastName").value,
          birth_date: document.getElementById("DOB").value,
          current_sem: document.getElementById("currentSem").value,
          gender: document.getElementById("genderStu").value,
          phone_no: document.getElementById("phoneStu").value,
          photo: document.getElementById("photoStu").value,
          email: document.getElementById("emailStu").value,
          category: document.getElementById("categoryStu").value,
        }
      );
    } catch (err) {
      alert(err);
    }
    try {
      await addDoc(collection(db, "students_credentials"), {
        password: "123456",
        branch: document.getElementById("branch").value,
        loginid: document.getElementById("e_no").value,
      });
      toast.success("Data Uploaded Successfully!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.adminForm.reset();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <React.StrictMode>
      <section className={props.type === "krish" ? "MainAdmin" : "none"}>
        <div className="adminContainer">
          <p className="adminTitle">Add Students</p>
          <form className="adminForm" name="adminForm">
            <input
              required
              type="text"
              placeholder="First Name"
              id="FirstName"
            />
            <input
              required
              type="text"
              placeholder="Middle Name"
              id="MiddleName"
            />
            <input required type="text" placeholder="Last Name" id="LastName" />
            <input required type="text" placeholder="Date Of Birth" id="DOB" />
            <input
              required
              type="number"
              placeholder="Current Semester"
              id="currentSem"
            />
            <input
              required
              type="number"
              placeholder="Enrollment No"
              id="e_no"
            />
            <input required type="text" placeholder="Branch" id="branch" />
            <input required type="text" placeholder="Gender" id="genderStu" />
            <input
              required
              type="number"
              placeholder="Phone Number"
              id="phoneStu"
            />
            <input
              required
              type="text"
              placeholder="Category"
              id="categoryStu"
            />
            <input
              required
              type="email"
              placeholder="Email Address"
              id="emailStu"
            />
            <input
              required
              type="text"
              placeholder="Profile Photo Link"
              name="photo"
              id="photoStu"
            />
            <button onClick={handleSubmit} id="submitDataAdmin">
              Upload Student
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </React.StrictMode>
  );
};
export default Admin;
