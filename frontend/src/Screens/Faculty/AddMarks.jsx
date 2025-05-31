import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";

const AddMarks = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [masterMarksData, setMasterMarksData] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [consent, setConsent] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  console.log(selectedExam);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "branch") {
      const branch = branches.find((b) => b._id === value);
      setSelectedBranch(branch);
    } else if (name === "subject") {
      const subject = subjects.find((s) => s._id === value);
      setSelectedSubject(subject);
    } else if (name === "semester") {
      setSelectedSemester(value);
    } else if (name === "exam") {
      const exam = exams.find((e) => e._id === value);
      setSelectedExam(exam);
    }
  };

  const fetchBranches = async () => {
    try {
      toast.loading("Loading branches...");
      const response = await axiosWrapper.get("/branch", {
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
        toast.error(error.response?.data?.message || "Failed to load branches");
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchSubjects = async () => {
    try {
      toast.loading("Loading subjects...");
      const response = await axiosWrapper.get(
        `/subject?branch=${selectedBranch?._id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data.success) {
        setSubjects(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubjects([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to load subjects");
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchExams = async () => {
    try {
      toast.loading("Loading exams...");
      const response = await axiosWrapper.get(
        `/exam?semester=${selectedSemester}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setExams([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to load exams");
      }
    } finally {
      toast.dismiss();
    }
  };

  const searchStudents = async () => {
    setLoading(true);
    toast.loading("Searching students...");
    setStudents([]);
    try {
      const response = await axiosWrapper.get(
        `/marks/students?branch=${selectedBranch?._id}&subject=${selectedSubject?._id}&semester=${selectedSemester}&examId=${selectedExam?._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        if (response.data.data.length === 0) {
          toast.error("No students found!");
          setStudents([]);
          setMasterMarksData([]);
        } else {
          toast.success("Students found!");
          setStudents(response.data.data);
          const initialMarksData = {};
          response.data.data.forEach((student) => {
            initialMarksData[student._id] = student.obtainedMarks || "";
          });
          setMarksData(initialMarksData);
          setMasterMarksData(response.data.data);
          setShowSearch(false);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error searching students");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMarks = async (e) => {
    setLoading(true);
    toast.loading("Getting marks...");
    setMasterMarksData([]);
    try {
      const response = await axiosWrapper.get(
        `/marks?semester=${selectedSemester}&examId=${selectedExam?._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success("Marks found!");
        const combinedData = students.map((student) => {
          const marks = response.data.data.find(
            (mark) => mark.student._id === student._id
          );
          if (marks) {
            return { ...student, obtainedMarks: marks.obtainedMarks };
          } else {
            return { ...student, obtainedMarks: 0 };
          }
        });
        setMasterMarksData(combinedData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error searching students");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!consent) {
      toast.error("Please confirm the consent before submitting");
      return;
    }

    const hasEmptyMarks = Object.values(marksData).some((mark) => mark === "");
    if (hasEmptyMarks) {
      toast.error("Please enter marks for all students");
      return;
    }

    setLoading(true);
    toast.loading("Submitting marks...");
    try {
      const marksToSubmit = Object.entries(marksData).map(
        ([studentId, marks]) => ({
          studentId,
          obtainedMarks: Number(marks),
        })
      );

      const response = await axiosWrapper.post(
        "/marks/bulk",
        {
          marks: marksToSubmit,
          examId: selectedExam?._id,
          subjectId: selectedSubject?._id,
          semester: selectedSemester,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.success) {
        toast.success("Marks submitted successfully!");
        setMarksData({});
        setConsent(false);
        setShowSearch(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting marks");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const handleBack = () => {
    setShowSearch(true);
    setStudents([]);
    setMasterMarksData([]);
    setMarksData({});
    setConsent(false);
  };

  const handleSearch = async () => {
    await searchStudents();
  };

  useEffect(() => {
    fetchBranches();
  }, [userToken]);

  useEffect(() => {
    if (selectedBranch) {
      fetchSubjects();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedSemester) {
      fetchExams();
    }
  }, [selectedSemester]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Add Marks" />
      </div>

      {showSearch && (
        <div className="w-full bg-white rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                value={selectedSemester || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Branch
              </label>
              <select
                name="branch"
                value={selectedBranch?._id || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Branch</option>
                {branches?.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjects
              </label>
              <select
                name="subject"
                value={selectedSubject?._id || ""}
                onChange={handleInputChange}
                disabled={!selectedBranch}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !selectedBranch ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">Select Subject</option>
                {subjects?.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {!selectedBranch && (
                <p className="text-xs text-gray-500 mt-1">
                  Please select a branch first
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam
              </label>
              <select
                name="exam"
                value={selectedExam?._id || ""}
                onChange={handleInputChange}
                disabled={!selectedSubject}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !selectedSubject ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">Select Exam</option>
                {exams?.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              {!selectedSubject && (
                <p className="text-xs text-gray-500 mt-1">
                  Please select a subject first
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center w-[10%] mx-auto">
            <CustomButton
              type="submit"
              disabled={
                loading ||
                !selectedBranch ||
                !selectedSubject ||
                !selectedExam ||
                !selectedSemester
              }
              variant="primary"
              onClick={handleSearch}
            >
              {loading ? "Searching..." : "Search"}
            </CustomButton>
          </div>
        </div>
      )}

      {/* Marks Entry Section */}
      {!showSearch && masterMarksData && masterMarksData.length > 0 && (
        <div className="w-full bg-white rounded-lg p-6">
          <div className="space-y-4 w-full mb-6">
            <div className="flex flex-col gap-4 w-[90%] mx-auto">
              <div className="grid grid-cols-4 gap-4">
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">
                    Branch and Semester:
                  </span>
                  <p className="text-gray-800">
                    {selectedBranch?.branchId} - Semester {selectedSemester}
                  </p>
                </div>

                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Exam:</span>
                  <p className="text-gray-800">
                    {selectedExam?.name || "Not Selected"}
                  </p>
                </div>
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Exam Type:</span>
                  <p className="text-gray-800">
                    {selectedExam?.examType === "mid" ? "Mid Term" : "End Term"}
                  </p>
                </div>
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Subject:</span>
                  <p className="text-gray-800">
                    {selectedSubject?.name || "Not Selected"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Total Marks:</span>
                  <p className="text-gray-800">
                    {selectedExam?.totalMarks || "Not Selected"}
                  </p>
                </div>
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Date:</span>
                  <p className="text-gray-800">
                    {selectedExam?.date
                      ? new Date(selectedExam.date).toLocaleDateString()
                      : "Not Selected"}
                  </p>
                </div>
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Time:</span>
                  <p className="text-gray-800">
                    {selectedExam?.time || "Not Selected"}
                  </p>
                </div>
                <div className="border p-3 rounded-md shadow">
                  <span className="text-sm text-gray-500">Students:</span>
                  <p className="text-gray-800">
                    {masterMarksData.length || "Not Selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mb-4">
            <CustomButton
              variant="secondary"
              onClick={handleBack}
              className="text-sm"
            >
              Back to Search
            </CustomButton>
          </div>

          <div className="grid grid-cols-4 gap-4 w-[100%] mx-auto">
            {masterMarksData.map((student) => (
              <div
                key={student._id}
                className="flex items-center justify-between w-full border rounded-md"
              >
                <p className="font-medium text-gray-700 flex items-center justify-center px-3 h-full py-2 rounded-md min-w-[120px] text-center">
                  {student.enrollmentNo}
                </p>
                <input
                  type="number"
                  min={0}
                  max={selectedExam?.totalMarks || 100}
                  className="px-4 py-2 border rounded-md focus:outline-none bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500 w-full m-2"
                  value={marksData[student._id] || ""}
                  placeholder="Enter Marks"
                  onChange={(e) =>
                    setMarksData({
                      ...marksData,
                      [student._id]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 bottom-0 left-0 right-0 bg-white p-4 border-t mt-10">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I confirm that all marks entered are correct and verified
              </label>
            </div>

            <CustomButton
              type="submit"
              disabled={loading || !consent}
              variant="primary"
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit Marks"}
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMarks;
