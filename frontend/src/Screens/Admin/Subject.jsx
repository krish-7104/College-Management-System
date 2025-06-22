import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import axiosWrapper from "../../utils/AxiosWrapper";
import CustomButton from "../../components/CustomButton";
import { CgDanger } from "react-icons/cg";
import Loading from "../../components/Loading";

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
  const [showModal, setShowModal] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getSubjectHandler();
    getBranchHandler();
  }, []);

  const getSubjectHandler = async () => {
    try {
      setDataLoading(true);
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
      setDataLoading(false);
    }
  };

  const getBranchHandler = async () => {
    try {
      setDataLoading(true);
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
      setDataLoading(false);
    }
  };

  const addSubjectHandler = async () => {
    if (
      !data.name ||
      !data.code ||
      !data.branch ||
      !data.semester ||
      !data.credits
    ) {
      toast.dismiss();
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setDataLoading(true);
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
        resetForm();
        getSubjectHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    } finally {
      setDataLoading(false);
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      code: "",
      branch: "",
      semester: "",
      credits: "",
    });
    setShowModal(false);
    setIsEditing(false);
    setSelectedSubjectId(null);
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
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDataLoading(true);
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
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Subject Details" />
        {branch.length > 0 && (
          <CustomButton onClick={() => setShowModal(true)}>
            <IoMdAdd className="text-2xl" />
          </CustomButton>
        )}
      </div>
      {dataLoading && <Loading />}

      {!dataLoading && branch.length == 0 && (
        <div className="flex justify-center items-center flex-col w-full mt-24">
          <CgDanger className="w-16 h-16 text-yellow-500 mb-4" />
          <p className="text-center text-lg">
            Please add branches before adding a subject.
          </p>
        </div>
      )}

      {!dataLoading && branch.length > 0 && (
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
                          className="!p-2"
                          onClick={() => editSubjectHandler(item)}
                        >
                          <MdEdit />
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          className="!p-2"
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

      {/* Add/Edit Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Subject" : "Add New Subject"}
              </h2>
              <CustomButton onClick={resetForm} variant="secondary">
                <AiOutlineClose size={24} />
              </CustomButton>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  value={data.code}
                  onChange={(e) => setData({ ...data, code: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <select
                  value={data.semester}
                  onChange={(e) =>
                    setData({ ...data, semester: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  value={data.credits}
                  onChange={(e) =>
                    setData({ ...data, credits: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <CustomButton onClick={resetForm} variant="secondary">
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={addSubjectHandler}
                  disabled={dataLoading}
                >
                  {isEditing ? "Update Subject" : "Add Subject"}
                </CustomButton>
              </div>
            </div>
          </div>
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
