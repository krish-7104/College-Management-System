import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axiosWrapper from "../../utils/AxiosWrapper";
import CustomButton from "../../components/CustomButton";
import NoData from "../../components/NoData";

const StudentFinder = () => {
  const [searchParams, setSearchParams] = useState({
    enrollmentNo: "",
    name: "",
    semester: "",
    branch: "",
  });
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
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
          toast.error(
            error.response?.data?.message || "Failed to load branches"
          );
        }
      } finally {
        toast.dismiss();
      }
    };
    fetchBranches();
  }, [userToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchStudents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);
    toast.loading("Searching students...");
    setStudents([]);
    try {
      const response = await axiosWrapper.post(
        `/student/search`,
        searchParams,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        if (response.data.data.length === 0) {
          toast.error("No students found!");
          setStudents([]);
        } else {
          toast.success("Students found!");
          setStudents(response.data.data);
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

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Finder" />
      </div>

      <div className="my-6 mx-auto w-full">
        <form onSubmit={searchStudents} className="flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Number
              </label>
              <input
                type="text"
                name="enrollmentNo"
                value={searchParams.enrollmentNo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter enrollment number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={searchParams.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                value={searchParams.semester}
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
                value={searchParams.branch}
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
          </div>

          <div className="mt-6 flex justify-center w-[10%] mx-auto">
            <CustomButton type="submit" disabled={loading} variant="primary">
              {loading ? "Searching..." : "Search"}
            </CustomButton>
          </div>
        </form>

        {!hasSearched && (
          <div className="text-center mt-8 text-gray-600 flex flex-col items-center justify-center my-10 bg-white p-10 rounded-lg mx-auto w-[40%]">
            <img
              src="/assets/filter.svg"
              alt="Select filters"
              className="w-64 h-64 mb-4"
            />
            Please select at least one filter to search students
          </div>
        )}

        {hasSearched && students.length === 0 && (
          <NoData title="No students found" />
        )}

        {students.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 border-b text-left">Profile</th>
                    <th className="px-6 py-3 border-b text-left">Name</th>
                    <th className="px-6 py-3 border-b text-left">
                      Enrollment No
                    </th>
                    <th className="px-6 py-3 border-b text-left">Semester</th>
                    <th className="px-6 py-3 border-b text-left">Branch</th>
                    <th className="px-6 py-3 border-b text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(student)}
                    >
                      <td className="px-6 py-4 border-b">
                        <img
                          src={`${process.env.REACT_APP_MEDIA_LINK}/${student.profile}`}
                          alt={`${student.firstName}'s profile`}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1744315900478-fa44dc6a4e89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 border-b">
                        {student.firstName} {student.middleName}{" "}
                        {student.lastName}
                      </td>
                      <td className="px-6 py-4 border-b">
                        {student.enrollmentNo}
                      </td>
                      <td className="px-6 py-4 border-b">{student.semester}</td>
                      <td className="px-6 py-4 border-b">
                        {student.branchId?.name}
                      </td>
                      <td className="px-6 py-4 border-b">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Student Details</h2>
                <CustomButton
                  onClick={() => setShowModal(false)}
                  variant="secondary"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </CustomButton>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={`${process.env.REACT_APP_MEDIA_LINK}/${selectedStudent.profile}`}
                    alt={`${selectedStudent.firstName}'s profile`}
                    className="w-full h-auto object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1744315900478-fa44dc6a4e89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    }}
                  />
                </div>

                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                      <span className="font-medium">Full Name:</span>{" "}
                      {selectedStudent.firstName} {selectedStudent.middleName}{" "}
                      {selectedStudent.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {selectedStudent.gender}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {new Date(selectedStudent.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Blood Group:</span>{" "}
                      {selectedStudent.bloodGroup}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Academic Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Enrollment No:</span>{" "}
                      {selectedStudent.enrollmentNo}
                    </p>
                    <p>
                      <span className="font-medium">Branch:</span>{" "}
                      {selectedStudent.branchId?.name}
                    </p>
                    <p>
                      <span className="font-medium">Semester:</span>{" "}
                      {selectedStudent.semester}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedStudent.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedStudent.phone}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedStudent.address}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Location Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">City:</span>{" "}
                      {selectedStudent.city}
                    </p>
                    <p>
                      <span className="font-medium">State:</span>{" "}
                      {selectedStudent.state}
                    </p>
                    <p>
                      <span className="font-medium">Pincode:</span>{" "}
                      {selectedStudent.pincode}
                    </p>
                    <p>
                      <span className="font-medium">Country:</span>{" "}
                      {selectedStudent.country}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Emergency Contact
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedStudent.emergencyContact?.name}
                    </p>
                    <p>
                      <span className="font-medium">Relationship:</span>{" "}
                      {selectedStudent.emergencyContact?.relationship}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedStudent.emergencyContact?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFinder;
