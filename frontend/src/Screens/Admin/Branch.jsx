import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";

const Branch = () => {
  const [data, setData] = useState({
    name: "",
    branchId: "",
  });
  const [branch, setBranch] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);

  useEffect(() => {
    getBranchHandler();
  }, []);

  const getBranchHandler = async () => {
    setDataLoading(true);
    try {
      const response = await axiosWrapper.get(`/branch`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setBranch(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setBranch([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching branches");
    } finally {
      setDataLoading(false);
    }
  };

  const addBranchHandler = async () => {
    if (!data.name || !data.branchId) {
      toast.dismiss();
      toast.error("Please fill all the fields");
      return;
    }
    try {
      toast.loading(isEditing ? "Updating Branch" : "Adding Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/branch/${selectedBranchId}`,
          data,
          {
            headers: headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/branch`, data, {
          headers: headers,
        });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", branchId: "" });
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedBranchId(null);
        getBranchHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const deleteBranchHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedBranchId(id);
  };

  const editBranchHandler = (branch) => {
    setData({
      name: branch.name,
      branchId: branch.branchId,
    });
    setSelectedBranchId(branch._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      const response = await axiosWrapper.delete(
        `/branch/${selectedBranchId}`,
        {
          headers: headers,
        }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Branch has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getBranchHandler();
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
      <Heading title="Branch Details" />
      <CustomButton
        onClick={() => {
          setShowAddForm(!showAddForm);
          if (!showAddForm) {
            setData({ name: "", branchId: "" });
            setIsEditing(false);
            setSelectedBranchId(null);
          }
        }}
        className="fixed bottom-8 right-8 !rounded-full !p-4"
      >
        {showAddForm ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <IoMdAdd className="text-3xl" />
        )}
      </CustomButton>

      {dataLoading && <Loading />}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Branch" : "Add New Branch"}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose className="text-3xl" />
              </button>
            </div>

            <form onSubmit={addBranchHandler} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Branch Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="branchId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Branch ID
                </label>
                <input
                  type="text"
                  id="branchId"
                  value={data.branchId}
                  onChange={(e) =>
                    setData({ ...data, branchId: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <CustomButton
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton variant="primary" onClick={addBranchHandler}>
                  {isEditing ? "Update" : "Add"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {!dataLoading && (
        <div className="mt-8 w-full">
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">
                  Branch Name
                </th>
                <th className="py-4 px-6 text-left font-semibold">Branch ID</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Created At
                </th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branch && branch.length > 0 ? (
                branch.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.branchId}</td>
                    <td className="py-4 px-6">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center flex justify-center gap-4">
                      <CustomButton
                        variant="secondary"
                        className="!p-2"
                        onClick={() => editBranchHandler(item)}
                      >
                        <MdEdit />
                      </CustomButton>
                      <CustomButton
                        variant="danger"
                        className="!p-2"
                        onClick={() => deleteBranchHandler(item._id)}
                      >
                        <MdOutlineDelete />
                      </CustomButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-base pt-10">
                    No branches found.
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
        message="Are you sure you want to delete this branch?"
      />
    </div>
  );
};

export default Branch;
