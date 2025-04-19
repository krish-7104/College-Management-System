import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { baseApiURL } from "../../baseUrl";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";

const Student = () => {
  const [data, setData] = useState({
    name: "",
    studentId: "",
  });
  const [student, setStudent] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getStudentHandler();
  }, []);

  const getStudentHandler = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/student`);
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
        "Content-Type": "application/json",
      };
      let response;
      if (isEditing) {
        response = await axios.patch(
          `${baseApiURL()}/student/${selectedStudentId}`,
          data,
          {
            headers: headers,
          }
        );
      } else {
        response = await axios.post(`${baseApiURL()}/student`, data, {
          headers: headers,
        });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", studentId: "" });
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedStudentId(null);
        getStudentHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const deleteStudentHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedStudentId(id);
  };

  const editStudentHandler = (student) => {
    setData({
      name: student.name,
      studentId: student.studentId,
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
      };
      const response = await axios.delete(
        `${baseApiURL()}/student/${selectedStudentId}`,
        {
          headers: headers,
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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      <Heading title="Student Details" />
      <button
        onClick={() => {
          setShowAddForm(!showAddForm);
          if (!showAddForm) {
            setData({ name: "", studentId: "" });
            setIsEditing(false);
            setSelectedStudentId(null);
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
          <div className="w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm">
              Enter Student Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="studentId" className="leading-7 text-sm">
              Enter Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={data.studentId}
              onChange={(e) => setData({ ...data, studentId: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
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
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left font-semibold">
                  Student Name
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Student ID
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Created At
                </th>
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {student &&
                student.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6">{item.studentId}</td>
                    <td className="py-3 px-6">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center flex justify-center gap-4">
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
