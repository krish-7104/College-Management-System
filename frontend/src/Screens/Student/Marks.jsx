import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    if (studentDetails) {
      setSelectedSemester(studentDetails.semester);
      fetchMarks(studentDetails.semester);
    }
  }, [studentDetails]);

  const fetchStudentDetails = async () => {
    try {
      const response = await axiosWrapper.get("/student/details");
      if (response.data.success) {
        setStudentDetails(response.data.user);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching student details"
      );
    }
  };

  const fetchMarks = async (semester) => {
    if (!studentDetails) return;

    setLoading(true);
    try {
      const response = await axiosWrapper.post("/marks/student", {
        studentId: studentDetails._id,
        semester: semester,
      });

      if (response.data.success) {
        setMarks(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching marks");
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);
    fetchMarks(semester);
  };

  const calculateTotalMarks = (subjectMarks) => {
    const internal = subjectMarks.internal || 0;
    const external = subjectMarks.external || 0;
    return internal + external;
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 90) return "O";
    if (totalMarks >= 80) return "A+";
    if (totalMarks >= 70) return "A";
    if (totalMarks >= 60) return "B+";
    if (totalMarks >= 50) return "B";
    if (totalMarks >= 40) return "C";
    return "F";
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Marks" />

      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Semester
            </label>
            <select
              value={selectedSemester}
              onChange={handleSemesterChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : marks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Internal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    External
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marks.map((mark, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.subject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.marks[0].internal || 0}/40
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.marks[0].external || 0}/60
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {calculateTotalMarks(mark.marks[0])}/100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {calculateGrade(calculateTotalMarks(mark.marks[0]))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No marks available for this semester
          </div>
        )}
      </div>
    </div>
  );
};

export default Marks;
