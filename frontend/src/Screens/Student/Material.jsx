import React, { useEffect, useState } from "react";
import { MdLink } from "react-icons/md";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import axiosWrapper from "../../utils/AxiosWrapper";
import toast from "react-hot-toast";
import CustomButton from "../../components/CustomButton";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [filters, setFilters] = useState({
    subject: "",
    type: "",
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      const response = await axiosWrapper.get(
        `/subject?semester=${userData.semester}&branch=${userData.branchId._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {}
  };

  const fetchMaterials = async () => {
    try {
      const queryParams = new URLSearchParams({
        semester: userData.semester,
        branch: userData.branchId._id,
      });

      if (filters.subject) queryParams.append("subject", filters.subject);
      if (filters.type) queryParams.append("type", filters.type);

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
      toast.error(error?.response?.data?.message || "Failed to load materials");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Study Materials" />

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

      <div className="w-full mt-8 overflow-x-auto">
        <table className="text-sm min-w-full bg-white">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-4 px-6 text-left font-semibold">File</th>
              <th className="py-4 px-6 text-left font-semibold">Title</th>
              <th className="py-4 px-6 text-left font-semibold">Subject</th>
              <th className="py-4 px-6 text-left font-semibold">Type</th>
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
                <td className="py-4 px-6 capitalize">{material.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Material;
