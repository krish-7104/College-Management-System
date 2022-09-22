import React from "react";
import { db } from "../../backend/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddStudent = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(
          db,
          `students_details/${
            document.getElementById("branch").value
          }/individual_student`,
          document.getElementById("e_no").value
        ),
        {
          first_name: document.getElementById("FirstName").value,
          e_no: document.getElementById("e_no").value,
          last_name: document.getElementById("LastName").value,
          birth_date: document.getElementById("DOB").value,
          current_sem: document.getElementById("currentSem").value,
          gender: document.getElementById("genderStu").value,
          phone_no: document.getElementById("phoneStu").value,
          photo: document.getElementById("photoStu").value,
          email: document.getElementById("e_no").value + "@cms.ac.in",
          category: document.getElementById("category").value,
        }
      );
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
    try {
      await setDoc(
        doc(db, `students_credentials`, document.getElementById("e_no").value),
        {
          password: "123456",
          branch: document.getElementById("branch").value,
          loginid: document.getElementById("e_no").value,
        }
      );
      toast.success("Data Uploaded Successfully!", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById("adminForm").reset();
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
  return (
    <>
      <section className="MainAdmin">
        <div className="adminContainer">
          <p className="adminTitle">Add Students</p>
          <form className="adminForm" id="adminForm" name="adminForm">
            <div className="addStudentInputs">
              <label htmlFor="FirstName">First Name</label>
              <input required type="text" id="FirstName" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="LastName">Last Name</label>
              <input required type="text" id="LastName" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="DOB">Date Of Birth</label>
              <input required type="text" id="DOB" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="currentSem">Current Semester</label>
              <input required type="number" id="currentSem" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="e_no">Enrollment No</label>
              <input required type="number" id="e_no" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="branch">Branch</label>
              <input required type="text" id="branch" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="genderStu">Gender</label>
              <input type="text" name="gender" id="genderStu" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="phoneStu">Phone Number</label>
              <input required type="number" id="phoneStu" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="category">Category</label>
              <input required type="category" id="category" />
            </div>
            <div className="addStudentInputs">
              <label htmlFor="photoStu">Profile Photo</label>
              <input required type="text" name="photo" id="photoStu" />
            </div>
            <button onClick={handleSubmit} id="submitDataAdmin">
              Upload Student Details
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};
export default AddStudent;
