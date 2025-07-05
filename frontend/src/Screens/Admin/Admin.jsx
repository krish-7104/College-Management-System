import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
const Admin = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gender: "",
    dob: "",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "active",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    bloodGroup: "",
  });
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [file, setFile] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getAdminsHandler();
  }, []);

  const getAdminsHandler = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get(`/admin`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setAdmins(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setAdmins([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching admins");
    } finally {
      setDataLoading(false);
    }
  };

  const addAdminHandler = async () => {
    try {
      toast.loading(isEditing ? "Updating Admin" : "Adding Admin");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      };

      const formData = new FormData();
      for (const key in data) {
        if (key === "emergencyContact") {
          for (const subKey in data.emergencyContact) {
            formData.append(
              `emergencyContact[${subKey}]`,
              data.emergencyContact[subKey]
            );
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      if (file) {
        formData.append("file", file);
      }

      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/admin/${selectedAdminId}`,
          formData,
          {
            headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/admin/register`, formData, {
          headers,
        });
      }

      toast.dismiss();
      if (response.data.success) {
        if (!isEditing) {
          toast.success(
            `Admin created successfully! Default password: admin123`
          );
        } else {
          toast.success(response.data.message);
        }
        resetForm();
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const deleteAdminHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedAdminId(id);
  };

  const editAdminHandler = (admin) => {
    setData({
      firstName: admin.firstName || "",
      lastName: admin.lastName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      profile: admin.profile || "",
      address: admin.address || "",
      city: admin.city || "",
      state: admin.state || "",
      pincode: admin.pincode || "",
      country: admin.country || "",
      gender: admin.gender || "",
      dob: admin.dob?.split("T")[0] || "",
      designation: admin.designation || "",
      joiningDate: admin.joiningDate?.split("T")[0] || "",
      salary: admin.salary || "",
      status: admin.status || "active",
      emergencyContact: {
        name: admin.emergencyContact?.name || "",
        relationship: admin.emergencyContact?.relationship || "",
        phone: admin.emergencyContact?.phone || "",
      },
      bloodGroup: admin.bloodGroup || "",
    });
    setSelectedAdminId(admin._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Admin");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axiosWrapper.delete(`/admin/${selectedAdminId}`, {
        headers,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Admin has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      gender: "",
      dob: "",
      designation: "",
      joiningDate: "",
      salary: "",
      status: "active",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      bloodGroup: "",
    });
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedAdminId(null);
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleEmergencyContactChange = (field, value) => {
    setData({
      ...data,
      emergencyContact: { ...data.emergencyContact, [field]: value },
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      <div className="flex justify-between items-center w-full">
        <Heading title="Admin Management" />
        <CustomButton
          onClick={() => {
            if (showAddForm) {
              resetForm();
            } else {
              setShowAddForm(true);
            }
          }}
        >
          <IoMdAdd className="text-2xl" />
        </CustomButton>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoMdClose className="text-2xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-6">
              {isEditing ? "Edit Admin" : "Add New Admin"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addAdminHandler();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/*"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={data.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={data.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={data.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={data.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={data.bloodGroup}
                    onChange={(e) =>
                      handleInputChange("bloodGroup", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={data.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={data.joiningDate}
                    onChange={(e) =>
                      handleInputChange("joiningDate", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="number"
                    value={data.salary}
                    onChange={(e) =>
                      handleInputChange("salary", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={data.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={data.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={data.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={data.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={data.emergencyContact.name}
                        onChange={(e) =>
                          handleEmergencyContactChange("name", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={data.emergencyContact.relationship}
                        onChange={(e) =>
                          handleEmergencyContactChange(
                            "relationship",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={data.emergencyContact.phone}
                        onChange={(e) =>
                          handleEmergencyContactChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center gap-4">
                <div>
                  <p className="text-sm">
                    Default password will be{" "}
                    <span className="font-bold">admin123</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton type="submit" variant="primary">
                    {isEditing ? "Update Admin" : "Add Admin"}
                  </CustomButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {dataLoading && <Loading />}

      {!dataLoading && !showAddForm && (
        <div className="mt-8 w-full">
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Email</th>
                <th className="py-4 px-6 text-left font-semibold">Phone</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Employee ID
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  Designation
                </th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins && admins.length > 0 ? (
                admins.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="py-4 px-6">{`${item.firstName} ${item.lastName}`}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">{item.phone}</td>
                    <td className="py-4 px-6">{item.employeeId}</td>
                    <td className="py-4 px-6">{item.designation}</td>
                    <td className="py-4 px-6 text-center flex justify-center gap-4">
                      <CustomButton
                        variant="secondary"
                        onClick={() => editAdminHandler(item)}
                      >
                        <MdEdit />
                      </CustomButton>
                      <CustomButton
                        variant="danger"
                        onClick={() => deleteAdminHandler(item._id)}
                      >
                        <MdOutlineDelete />
                      </CustomButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-base pt-10">
                    No Admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this admin?"
      />
    </div>
  );
};

export default Admin;
