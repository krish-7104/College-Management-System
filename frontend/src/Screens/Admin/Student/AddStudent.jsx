import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddStudent = () => {
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: "",
  });
  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Photo To Storage");
      const storageRef = ref(
        storage,
        `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Profile Uploaded To Storage");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

  useEffect(() => {
    getBranchData();
  }, []);

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(
              `${baseApiURL()}/student/auth/register`,
              { loginid: data.enrollmentNo, password: 112233 },
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  enrollmentNo: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  semester: "",
                  branch: "",
                  gender: "",
                  profile: "",
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={addStudentProfile}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="firstname" className="leading-7 text-sm ">
          Enter First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="middlename" className="leading-7 text-sm ">
          Enter Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          value={data.middleName}
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="lastname" className="leading-7 text-sm ">
          Enter Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
          Enter Enrollment No
        </label>
        <input
          type="number"
          id="enrollmentNo"
          value={data.enrollmentNo}
          onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="email" className="leading-7 text-sm ">
          Enter Email Address
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="phoneNumber" className="leading-7 text-sm ">
          Enter Phone Number
        </label>
        <input
          type="number"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="semester" className="leading-7 text-sm ">
          Select Semester
        </label>
        <select
          id="semester"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={data.semester}
          onChange={(e) => setData({ ...data, semester: e.target.value })}
        >
          <option defaultValue>-- Select --</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="branch" className="leading-7 text-sm ">
          Select Branch
        </label>
        <select
          id="branch"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={data.branch}
          onChange={(e) => setData({ ...data, branch: e.target.value })}
        >
          <option defaultValue>-- Select --</option>
          {branch?.map((branch) => {
            return (
              <option value={branch.name} key={branch.name}>
                {branch.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="gender" className="leading-7 text-sm ">
          Select Gender
        </label>
        <select
          id="gender"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option defaultValue>-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="file" className="leading-7 text-sm ">
          Select Profile
        </label>
        <label
          htmlFor="file"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
        >
          Upload
          <span className="ml-2">
            <FiUpload />
          </span>
        </label>
        <input
          hidden
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      {data.profile && (
        <div className="w-full flex justify-center items-center">
          <img src={data.profile} alt="student" className="h-36" />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
      >
        Add New Student
      </button>
    </form>
  );
};

export default AddStudent;
