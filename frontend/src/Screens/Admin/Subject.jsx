import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import axiosWrapper from "../../utils/AxiosWrapper";

const Subject = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    branch: "",
    semester: "",
    credits: "",
  });
  const [subject, setSubject] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getSubjectHandler();
  }, []);

  const getSubjectHandler = async () => {
    try {
      const response = await axiosWrapper.get(`/subject`);
      if (response.data.success) {
        setSubject(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching subjects");
    }
  };

  const addSubjectHandler = async () => {
    try {
      toast.loading(isEditing ? "Updating Subject" : "Adding Subject");
      const headers = {
        "Content-Type": "application/json",
      };
      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/subject/${selectedSubjectId}`,
          data,
          {
            headers: headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/subject`, data, {
          headers: headers,
        });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", code: "", branch: "", semester: "", credits: "" });
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedSubjectId(null);
        getSubjectHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const deleteSubjectHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedSubjectId(id);
  };

  const editSubjectHandler = (subject) => {
    setData({
      name: subject.name,
      code: subject.code,
      branch: subject.branch?._id,
      semester: subject.semester,
      credits: subject.credits,
    });
    setSelectedSubjectId(subject._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Subject");
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axiosWrapper.delete(
        `/subject/${selectedSubjectId}`,
        {
          headers: headers,
        }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Subject has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getSubjectHandler();
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
      <Heading title="Subject Details" />
      <button
        onClick={() => {
          setShowAddForm(!showAddForm);
          if (!showAddForm) {
            setData({
              name: "",
              code: "",
              branch: "",
              semester: "",
              credits: "",
            });
            setIsEditing(false);
            setSelectedSubjectId(null);
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
              Enter Subject Name
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
            <label htmlFor="code" className="leading-7 text-sm">
              Enter Subject Code
            </label>
            <input
              type="text"
              id="code"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="branch" className="leading-7 text-sm">
              Enter Branch
            </label>
            <input
              type="text"
              id="branch"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="semester" className="leading-7 text-sm">
              Enter Semester
            </label>
            <input
              type="number"
              id="semester"
              value={data.semester}
              onChange={(e) => setData({ ...data, semester: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="credits" className="leading-7 text-sm">
              Enter Credits
            </label>
            <input
              type="number"
              id="credits"
              value={data.credits}
              onChange={(e) => setData({ ...data, credits: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 px-6 py-3 text-white rounded-md hover:bg-blue-600"
            onClick={addSubjectHandler}
          >
            {isEditing ? "Edit Subject" : "Add Subject"}
          </button>
        </div>
      )}

      {!showAddForm && (
        <div className="mt-8 w-full">
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Code</th>
                <th className="py-4 px-6 text-left font-semibold">Branch</th>
                <th className="py-4 px-6 text-left font-semibold">Semester</th>
                <th className="py-4 px-6 text-left font-semibold">Credits</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {subject &&
                subject.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.code}</td>
                    <td className="py-4 px-6">{item.branch?.name}</td>
                    <td className="py-4 px-6">{item.semester}</td>
                    <td className="py-4 px-6">{item.credits}</td>
                    <td className="py-4 px-6 text-center flex justify-center gap-4">
                      <button
                        className="text-xl hover:text-blue-500"
                        onClick={() => editSubjectHandler(item)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-xl hover:text-red-500"
                        onClick={() => deleteSubjectHandler(item._id)}
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
        message="Are you sure you want to delete this subject?"
      />
    </div>
  );
};

export default Subject;
