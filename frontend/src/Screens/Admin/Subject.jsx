import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import axiosWrapper from "../../utils/AxiosWrapper";
import CustomButton from "../../components/CustomButton";
const Subject = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    branch: "",
    semester: "",
    credits: "",
  });
  const [subject, setSubject] = useState([]);
  const [branch, setBranches] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubjectHandler();
    getBranchHandler();
  }, []);

  const getSubjectHandler = async () => {
    try {
      toast.loading("Loading subjects...");
      const response = await axiosWrapper.get(`/subject`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setSubject(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubject([]);
      } else {
        toast.error(error.response?.data?.message || "Error fetching subjects");
      }
    } finally {
      toast.dismiss();
    }
  };

  const getBranchHandler = async () => {
    try {
      toast.loading("Loading branches...");
      const response = await axiosWrapper.get(`/branch`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setBranches(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setBranches([]);
      } else {
        toast.error(error.response?.data?.message || "Error fetching branches");
      }
    } finally {
      toast.dismiss();
    }
  };

  const addSubjectHandler = async () => {
    try {
      toast.loading(isEditing ? "Updating Subject" : "Adding Subject");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
      <div className="flex justify-between items-center w-full">
        <Heading title="Subject Details" />
        <CustomButton
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
        >
          {showAddForm ? (
            <IoMdClose className="text-3xl" />
          ) : (
            <IoMdAdd className="text-3xl" />
          )}
        </CustomButton>
      </div>

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
              Select Branch
            </label>
            <select
              name="branch"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Branch</option>
              {branch.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="semester" className="leading-7 text-sm">
              Enter Semester
            </label>
            <select
              name="semester"
              value={data.semester}
              onChange={(e) => setData({ ...data, semester: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Semester</option>
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
          <CustomButton
            variant="primary"
            className="mt-6"
            onClick={addSubjectHandler}
          >
            {isEditing ? "Edit Subject" : "Add Subject"}
          </CustomButton>
        </div>
      )}

      {!showAddForm && (
        <div className="mt-8 w-full">
          {subject.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No subjects found
            </div>
          ) : (
            <table className="text-sm min-w-full bg-white">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Code</th>
                  <th className="py-4 px-6 text-left font-semibold">Branch</th>
                  <th className="py-4 px-6 text-left font-semibold">
                    Semester
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Credits</th>
                  <th className="py-4 px-6 text-center font-semibold">
                    Actions
                  </th>
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
                        <CustomButton
                          variant="secondary"
                          onClick={() => editSubjectHandler(item)}
                        >
                          <MdEdit />
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          onClick={() => deleteSubjectHandler(item._id)}
                        >
                          <MdOutlineDelete />
                        </CustomButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
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
