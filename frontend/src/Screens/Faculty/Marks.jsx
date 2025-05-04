import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";

const Marks = () => {
  const [subject, setSubject] = useState([]);
  const [branch, setBranch] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    examType: "internal",
  });
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    fetchBranches();
    fetchSubjects();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axiosWrapper.get("/branch", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setBranch(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching branches");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axiosWrapper.get("/subject", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setSubject(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching subjects");
    }
  };

  const loadStudentDetails = async () => {
    if (
      !selected.branch ||
      !selected.semester ||
      !selected.subject ||
      !selected.examType
    ) {
      toast.error("Please select all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosWrapper.post(
        "/student/search",
        {
          branch: selected.branch,
          semester: selected.semester,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.success) {
        setStudentData(response.data.data);
        // Initialize marks object for each student
        const initialMarks = {};
        response.data.data.forEach((student) => {
          initialMarks[student.enrollmentNo] = {
            internal: 0,
            external: 0,
          };
        });
        setMarks(initialMarks);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error loading student details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (enrollmentNo, value) => {
    setMarks((prev) => ({
      ...prev,
      [enrollmentNo]: {
        ...prev[enrollmentNo],
        [selected.examType]: value,
      },
    }));
  };

  const submitMarksHandler = async () => {
    setLoading(true);
    try {
      const marksData = studentData.map((student) => ({
        studentId: student._id,
        semester: selected.semester,
        branch: selected.branch,
        marks: [
          {
            subject: selected.subject,
            [selected.examType]: marks[student.enrollmentNo][selected.examType],
          },
        ],
      }));

      const response = await axiosWrapper.post("/marks/upload", marksData);

      if (response.data.success) {
        toast.success("Marks uploaded successfully");
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading marks");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStudentData([]);
    setMarks({});
    setSelected({
      branch: "",
      semester: "",
      subject: "",
      examType: "internal",
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Upload Marks" />
        {studentData.length > 0 && (
          <CustomButton variant="danger" onClick={resetForm}>
            <span className="mr-2">
              <BiArrowBack />
            </span>
            Close
          </CustomButton>
        )}
      </div>

      <div className="mt-10 w-full grid grid-cols-5 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Branch
          </label>
          <select
            value={selected.branch}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, branch: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Branch</option>
            {branch.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Semester
          </label>
          <select
            value={selected.semester}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, semester: e.target.value }))
            }
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
            Select Subject
          </label>
          <select
            value={selected.subject}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, subject: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subject.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Exam Type
          </label>
          <select
            value={selected.examType}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, examType: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>
        <CustomButton
          className="!py-2 !px-2 flex items-center justify-center"
          onClick={loadStudentDetails}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Student Data"}
        </CustomButton>
      </div>

      {studentData.length > 0 && (
        <>
          <div className="mt-8 w-full">
            <div className="grid grid-cols-1 gap-4">
              {studentData.map((student) => (
                <div
                  key={student.enrollmentNo}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {student.enrollmentNo}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="0"
                      max={selected.examType === "internal" ? 40 : 60}
                      value={
                        marks[student.enrollmentNo]?.[selected.examType] || 0
                      }
                      onChange={(e) =>
                        handleMarksChange(student.enrollmentNo, e.target.value)
                      }
                      className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter ${selected.examType} marks`}
                    />
                    <span className="text-sm text-gray-500">
                      /{selected.examType === "internal" ? 40 : 60}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CustomButton
            className="mt-8 mx-auto"
            onClick={submitMarksHandler}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Marks"}
          </CustomButton>
        </>
      )}
    </div>
  );
};

export default Marks;
