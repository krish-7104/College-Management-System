import React from "react";
import "./style/Admin.css";
import { db } from "./backend/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(
        collection(
          db,
          `faculty_details/${
            document.getElementById("department").value
          }/faculty_info`
        ),
        {
          email: document.getElementById("emailFac").value,
          first_name: document.getElementById("FirstName").value,
          middle_name: document.getElementById("MiddleName").value,
          last_name: document.getElementById("LastName").value,
          photo: document.getElementById("photoFac").value,
          experience: document.getElementById("experience").value,
          birth_date: document.getElementById("DOB").value,
          joining_date: document.getElementById("joining_date").value,
          gender: document.getElementById("genderStu").value,
          phone_no: document.getElementById("phoneStu").value,
          post: document.getElementById("post").value,
        }
      );
    } catch (err) {
      alert(err);
    }
    try {
      await addDoc(collection(db, "faculty_credentials"), {
        password: "123456",
        department: document.getElementById("department").value,
        loginid: document.getElementById("emailFac").value,
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
      <section className="facultyAdminAdd">
        <div className="adminContainer">
          <p className="adminTitle">Add Faculty</p>
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
              type="text"
              placeholder="Joining Date"
              id="joining_date"
            />
            <input
              required
              type="number"
              placeholder="Experience"
              id="experience"
            />
            <input
              required
              type="text"
              placeholder="Department"
              id="department"
            />
            <input required type="text" placeholder="Gender" id="genderStu" />
            <input
              required
              type="number"
              placeholder="Phone Number"
              id="phoneStu"
            />
            <input required type="text" placeholder="Post" id="post" />
            <input
              required
              type="email"
              placeholder="Email Address"
              id="emailFac"
            />
            <input
              required
              type="text"
              placeholder="Profile Photo Link"
              name="photo"
              id="photoFac"
            />
            <button onClick={handleSubmit} id="submitDataAdmin">
              Upload Faculty
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </React.StrictMode>
  );
};
export default Admin;
