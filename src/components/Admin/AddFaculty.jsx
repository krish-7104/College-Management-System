import React from "react";
import "../../style/AdminHome.css";
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
          `faculty_details/${
            document.getElementById("department").value
          }/individual_faculty`,
          document.getElementById("emp_no").value
        ),
        {
          first_name: document.getElementById("FirstName").value,
          last_name: document.getElementById("LastName").value,
          birth_date: document.getElementById("DOB").value,
          post: document.getElementById("post").value,
          emp_no: document.getElementById("emp_no").value,
          gender: document.getElementById("genderFac").value,
          phone_no: document.getElementById("phoneNo").value,
          photo: document.getElementById("photoStu").value,
          email: document.getElementById("email").value,
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
        doc(db, `faculty_credentials`, document.getElementById("emp_no").value),
        {
          password: "654321",
          department: document.getElementById("department").value,
          loginid: document.getElementById("email").value,
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
          <p className="adminTitle">Add Faculty</p>
          <form className="adminForm" name="adminForm">
            <div className="addFacultyInputs">
              <label htmlFor="FirstName">First Name</label>
              <input required type="text" id="FirstName" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="LastName">Last Name</label>
              <input required type="text" id="LastName" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="DOB">Date Of Birth</label>
              <input required type="text" id="DOB" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="department">Department</label>
              <input required type="text" id="department" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="post">Post</label>
              <input required type="text" id="post" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="emp_no">Employee No</label>
              <input required type="number" id="emp_no" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="genderFac">Gender</label>
              <input type="text" name="gender" id="genderFac" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="phoneNo">Phone Number</label>
              <input required type="number" id="phoneNo" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="email">Email</label>
              <input required type="email" id="email" />
            </div>
            <div className="addFacultyInputs">
              <label htmlFor="photoStu">Profile Photo</label>
              <input required type="text" name="photo" id="photoStu" />
            </div>
            <button onClick={handleSubmit} id="submitDataAdmin">
              Upload Faculty Details
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};
export default AddStudent;
