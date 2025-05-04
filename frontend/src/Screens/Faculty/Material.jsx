/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiUpload, FiEdit2, FiTrash2 } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import { MdLink } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    branch: "",
    type: "notes",
  });
  const [file, setFile] = useState(null);
  const [filters, setFilters] = useState({
    subject: "",
    semester: "",
    branch: "",
    type: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchBranches();
    fetchMaterials();
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      toast.loading("Loading subjects...");
      const response = await axiosWrapper.get("/subject", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubjects([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load subjects"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchBranches = async () => {
    try {
      toast.loading("Loading branches...");
      const response = await axiosWrapper.get("/branch", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setBranches(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setBranches([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load branches"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchMaterials = async () => {
    try {
      toast.loading("Loading materials...");
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axiosWrapper.get(`/material?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setMaterials([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load materials"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      semester: "",
      branch: "",
      type: "notes",
    });
    setFile(null);
    setEditingMaterial(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading(
      editingMaterial ? "Updating material..." : "Adding material..."
    );

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (file) {
        formDataToSend.append("file", file);
      }

      if (editingMaterial) {
        await axiosWrapper.put(
          `/material/${editingMaterial._id}`,
          formDataToSend
        );
        toast.success("Material updated successfully");
      } else {
        await axiosWrapper.post("/material", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        toast.success("Material added successfully");
      }

      setShowModal(false);
      resetForm();
      fetchMaterials();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      subject: material.subject._id,
      semester: material.semester,
      branch: material.branch._id,
      type: material.type,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosWrapper.delete(`/material/${selectedMaterialId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success("Material deleted successfully");
      setIsDeleteConfirmOpen(false);
      fetchMaterials();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete material"
      );
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Material Management" />
        <CustomButton onClick={() => setShowModal(true)}>
          <IoMdAdd className="text-2xl" />
        </CustomButton>
      </div>

      {/* Filters */}
      <div className="w-full mt-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Subject
            </label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Branch
            </label>
            <select
              name="branch"
              value={filters.branch}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Semester
            </label>
            <select
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="notes">Notes</option>
              <option value="assignment">Assignment</option>
              <option value="syllabus">Syllabus</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Materials Table */}
      <div className="w-full mt-8 overflow-x-auto">
        {materials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No materials found
          </div>
        ) : (
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">File</th>
                <th className="py-4 px-6 text-left font-semibold">Title</th>
                <th className="py-4 px-6 text-left font-semibold">Subject</th>
                <th className="py-4 px-6 text-left font-semibold">Semester</th>
                <th className="py-4 px-6 text-left font-semibold">Branch</th>
                <th className="py-4 px-6 text-left font-semibold">Type</th>
                <th className="py-4 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id} className="border-b hover:bg-blue-50">
                  <td className="py-4 px-6">
                    <CustomButton
                      variant="primary"
                      onClick={() => {
                        window.open(
                          `${process.env.REACT_APP_MEDIA_LINK}/${material.file}`
                        );
                      }}
                    >
                      <MdLink className="text-xl" />
                    </CustomButton>
                  </td>
                  <td className="py-4 px-6">{material.title}</td>
                  <td className="py-4 px-6">{material.subject.name}</td>
                  <td className="py-4 px-6">{material.semester}</td>
                  <td className="py-4 px-6">{material.branch.name}</td>
                  <td className="py-4 px-6 capitalize">{material.type}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-4">
                      <CustomButton
                        variant="secondary"
                        onClick={() => handleEdit(material)}
                      >
                        <FiEdit2 />
                      </CustomButton>
                      <CustomButton
                        variant="danger"
                        onClick={() => {
                          setSelectedMaterialId(material._id);
                          setIsDeleteConfirmOpen(true);
                        }}
                      >
                        <FiTrash2 />
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Material Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingMaterial ? "Edit Material" : "Add New Material"}
              </h2>
              <CustomButton
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                variant="secondary"
              >
                <AiOutlineClose size={24} />
              </CustomButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
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
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="notes">Notes</option>
                    <option value="assignment">Assignment</option>
                    <option value="syllabus">Syllabus</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material File
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50">
                    <span className="flex items-center justify-center">
                      <FiUpload className="mr-2" />
                      {file ? file.name : "Choose File"}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!editingMaterial}
                    />
                  </label>
                  {file && (
                    <CustomButton
                      onClick={() => setFile(null)}
                      variant="danger"
                      className="!p-2"
                    >
                      <AiOutlineClose size={20} />
                    </CustomButton>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <CustomButton
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  variant="secondary"
                >
                  Cancel
                </CustomButton>
                <CustomButton type="submit" disabled={loading}>
                  {loading
                    ? "Processing..."
                    : editingMaterial
                    ? "Update Material"
                    : "Add Material"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this material? This action cannot be undone."
      />
    </div>
  );
};

export default Material;
