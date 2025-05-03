import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { baseApiURL } from "../../baseUrl";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import axiosWrapper from "../../utils/AxiosWrapper";

const Student = () => {
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    semester: "",
    branchId: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    profile: "",
    status: "active",
    bloodGroup: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const [student, setStudent] = useState([]);
  const [branch, setBranches] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    getStudentHandler();
    getBranchHandler();
  }, []);

  const getBranchHandler = async () => {
    try {
      const response = await axiosWrapper.get(`/branch`);
      if (response.data.success) {
        setBranches(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching branches");
    }
  };

  const getStudentHandler = async () => {
    try {
      const response = await axiosWrapper.get(`/student`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setStudent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching students");
    }
  };

  const addStudentHandler = async () => {
    try {
      toast.loading(isEditing ? "Updating Student" : "Adding Student");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      };

      const formData = new FormData();
      for (const key in data) {
        if (key === "emergencyContact") {
          for (const subKey in data.emergencyContact) {
            formData.append(
              `emergencyContact[${subKey}]`,
              data.emergencyContact[subKey]
            );
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      if (file) {
        formData.append("file", file);
      }

      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/student/${selectedStudentId}`,
          formData,
          {
            headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/student/register`, formData, {
          headers,
        });
      }

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
        getStudentHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const deleteStudentHandler = (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedStudentId(id);
  };

  const editStudentHandler = (student) => {
    setData({
      firstName: student.firstName || "",
      middleName: student.middleName || "",
      lastName: student.lastName || "",
      phone: student.phone || "",
      semester: student.semester || "",
      branchId: student.branchId?._id || "",
      gender: student.gender || "",
      dob: student.dob?.split("T")[0] || "",
      address: student.address || "",
      city: student.city || "",
      state: student.state || "",
      pincode: student.pincode || "",
      country: student.country || "",
      profile: student.profile || "",
      status: student.status || "active",
      bloodGroup: student.bloodGroup || "",
      emergencyContact: {
        name: student.emergencyContact?.name || "",
        relationship: student.emergencyContact?.relationship || "",
        phone: student.emergencyContact?.phone || "",
      },
    });
    setSelectedStudentId(student._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Student");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axiosWrapper.delete(
        `/student/${selectedStudentId}`,
        {
          headers,
        }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Student has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getStudentHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      semester: "",
      branchId: "",
      gender: "",
      dob: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      profile: "",
      status: "active",
      bloodGroup: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    });
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedStudentId(null);
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleEmergencyContactChange = (field, value) => {
    setData({
      ...data,
      emergencyContact: { ...data.emergencyContact, [field]: value },
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      <Heading title="Student Details" />
      <button
        onClick={() => {
          if (showAddForm) {
            resetForm();
          } else {
            setShowAddForm(true);
          }
        }}
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        {showAddForm ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <IoMdAdd className="text-3xl" />
        )}
      </button>

      {showAddForm && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="grid grid-cols-2 gap-4 w-[60%]">
            <div>
              <label className="leading-7 text-sm">Upload Profile Photo</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            {[
              { label: "First Name", field: "firstName" },
              { label: "Middle Name", field: "middleName" },
              { label: "Last Name", field: "lastName" },
              { label: "Phone", field: "phone" },
              { label: "Address", field: "address" },
              { label: "City", field: "city" },
              { label: "State", field: "state" },
              { label: "Pincode", field: "pincode" },
              { label: "Country", field: "country" },
              { label: "DOB", field: "dob", type: "date" },
            ].map(({ label, field, type = "text" }) => (
              <div key={field}>
                <label className="leading-7 text-sm">{label}</label>
                <input
                  type={type}
                  value={data[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            ))}

            <div>
              <label className="leading-7 text-sm">Select Branch</label>
              <select
                value={data.branchId}
                onChange={(e) => handleInputChange("branchId", e.target.value)}
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select Branch</option>
                {branch.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="leading-7 text-sm">Semester</label>
              <select
                value={data.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem} Semester
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="leading-7 text-sm">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="leading-7 text-sm">Blood Group</label>
              <select
                value={data.bloodGroup}
                onChange={(e) =>
                  handleInputChange("bloodGroup", e.target.value)
                }
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {["name", "relationship", "phone"].map((field) => (
              <div key={field}>
                <label className="leading-7 text-sm">
                  Emergency {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  value={data.emergencyContact[field]}
                  onChange={(e) =>
                    handleEmergencyContactChange(field, e.target.value)
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            ))}
          </div>
          <button
            className="mt-6 bg-blue-500 px-6 py-3 text-white rounded-md hover:bg-blue-600"
            onClick={addStudentHandler}
          >
            {isEditing ? "Update Student" : "Add Student"}
          </button>
        </div>
      )}

      {!showAddForm && (
        <div className="mt-8 w-full">
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Enrollment No
                </th>
                <th className="py-4 px-6 text-left font-semibold">Email</th>
                <th className="py-4 px-6 text-left font-semibold">Phone</th>
                <th className="py-4 px-6 text-left font-semibold">Branch</th>
                <th className="py-4 px-6 text-left font-semibold">Semester</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {student &&
                student.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="py-4 px-6">
                      {`${item.firstName} ${item.middleName} ${item.lastName}`}
                    </td>
                    <td className="py-4 px-6">{item.enrollmentNo}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">{item.phone}</td>
                    <td className="py-4 px-6">{item.branchId?.name}</td>
                    <td className="py-4 px-6">{item.semester}</td>
                    <td className="py-4 px-6 text-center flex justify-center gap-4">
                      <button
                        className="text-xl hover:text-blue-500"
                        onClick={() => editStudentHandler(item)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-xl hover:text-red-500"
                        onClick={() => deleteStudentHandler(item._id)}
                      >
                        <MdOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};

export default Student;
