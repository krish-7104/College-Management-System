import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
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
    isSuperAdmin: false,
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

  useEffect(() => {
    getAdminsHandler();
  }, []);

  const getAdminsHandler = async () => {
    try {
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
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching admins");
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
      isSuperAdmin: admin.isSuperAdmin || false,
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
      isSuperAdmin: false,
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
      <Heading title="Admin Details" />
      <CustomButton
        onClick={() => {
          if (showAddForm) {
            resetForm();
          } else {
            setShowAddForm(true);
          }
        }}
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        {showAddForm ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <IoMdAdd className="text-3xl" />
        )}
      </CustomButton>

      {showAddForm && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="grid grid-cols-2 gap-4 w-[60%]">
            <div>
              <label className="leading-7 text-sm">Upload Profile Photo</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            {[
              { label: "First Name", field: "firstName" },
              { label: "Last Name", field: "lastName" },
              { label: "Email", field: "email" },
              { label: "Phone", field: "phone" },
              { label: "Address", field: "address" },
              { label: "City", field: "city" },
              { label: "State", field: "state" },
              { label: "Pincode", field: "pincode" },
              { label: "Country", field: "country" },
              { label: "DOB", field: "dob", type: "date" },
              { label: "Designation", field: "designation" },
              { label: "Joining Date", field: "joiningDate", type: "date" },
              { label: "Salary", field: "salary" },
              { label: "Blood Group", field: "bloodGroup" },
            ].map(({ label, field, type = "text" }) => (
              <div key={field}>
                <label className="leading-7 text-sm">{label}</label>
                <input
                  type={type}
                  value={data[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            ))}

            <div>
              <label className="leading-7 text-sm">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {["name", "relationship", "phone"].map((field) => (
              <div key={field}>
                <label className="leading-7 text-sm">
                  Emergency {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  value={data.emergencyContact[field]}
                  onChange={(e) =>
                    handleEmergencyContactChange(field, e.target.value)
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-3 mb-4">
            Note: New admin will be created with default password:{" "}
            <span className="font-semibold">admin123</span>
          </div>
          <CustomButton
            variant="primary"
            className="mt-6"
            onClick={addAdminHandler}
          >
            {isEditing ? "Update Admin" : "Add Admin"}
          </CustomButton>
        </div>
      )}

      {!showAddForm && (
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
              {admins.map((item, index) => (
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
              ))}
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
