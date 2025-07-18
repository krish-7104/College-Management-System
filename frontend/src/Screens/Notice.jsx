import React, { useEffect, useState } from "react";
import { IoMdLink, IoMdAdd, IoMdClose } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import axiosWrapper from "../utils/AxiosWrapper";
import CustomButton from "../components/CustomButton";
import DeleteConfirm from "../components/DeleteConfirm";
import Loading from "../components/Loading";

const Notice = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [token, navigate]);

  const getNotices = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get("/notice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setNotices(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setNotices([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to load notices");
      }
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getNotices();
  }, [router.pathname]);

  const openAddModal = () => {
    setEditingNotice(null);
    setFormData({
      title: "",
      description: "",
      type: "student",
      link: "",
    });
    setShowAddModal(true);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title || "",
      description: notice.description || "",
      type: notice.type || "student",
      link: notice.link || "",
    });
    setShowAddModal(true);
  };

  const handleSubmitNotice = async (e) => {
    e.preventDefault();
    const { title, description, type } = formData;

    if (!title || !description || !type) {
      toast.dismiss();
      toast.error("Please fill all the fields");
      return;
    }

    try {
      toast.loading(editingNotice ? "Updating Notice" : "Adding Notice");

      const response = await axiosWrapper[editingNotice ? "put" : "post"](
        `/notice${editingNotice ? `/${editingNotice._id}` : ""}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        getNotices();
        setShowAddModal(false);
        setEditingNotice(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting Notice");
      const response = await axiosWrapper.delete(
        `/notice/${selectedNoticeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success("Notice deleted successfully");
        setIsDeleteConfirmOpen(false);
        getNotices();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to delete notice");
    }
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Notices" />
        {!dataLoading &&
          (router.pathname === "/faculty" || router.pathname === "/admin") && (
            <CustomButton onClick={openAddModal}>
              <IoMdAdd className="text-2xl" />
            </CustomButton>
          )}
      </div>

      {dataLoading && <Loading />}

      {!dataLoading && (
        <div className="mt-8">
          {notices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notices found
            </div>
          ) : (
            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices?.map((notice) => (
                <div
                  key={notice._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 w-[350px]"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className={`text-lg font-semibold line-clamp-2 group flex items-start ${
                          notice.link
                            ? "cursor-pointer hover:text-blue-600"
                            : ""
                        }`}
                        onClick={() => notice.link && window.open(notice.link)}
                      >
                        {notice.title}
                        {notice.link && (
                          <IoMdLink className="ml-2 flex-shrink-0 text-xl opacity-70 group-hover:opacity-100 group-hover:text-blue-500" />
                        )}
                      </h3>
                      {(router.pathname === "/faculty" ||
                        router.pathname === "/admin") && (
                        <div className="flex gap-2 ml-2 flex-shrink-0">
                          <CustomButton
                            onClick={() => {
                              setSelectedNoticeId(notice._id);
                              setIsDeleteConfirmOpen(true);
                            }}
                            variant="danger"
                            className="!p-1.5 rounded-full"
                            title="Delete Notice"
                          >
                            <MdDeleteOutline size={18} />
                          </CustomButton>
                          <CustomButton
                            onClick={() => handleEdit(notice)}
                            variant="secondary"
                            className="!p-1.5 rounded-full"
                            title="Edit Notice"
                          >
                            <MdEditNote size={18} />
                          </CustomButton>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {notice.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <HiOutlineCalendar className="mr-1" />
                        {new Date(notice.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                      {notice.type !== "both" && (
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                          {notice.type === "student" ? "Student" : "Faculty"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal UI */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingNotice ? "Edit Notice" : "Add New Notice"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingNotice(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose className="text-3xl" />
              </button>
            </div>

            <form onSubmit={handleSubmitNotice} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type Of Notice
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <CustomButton
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingNotice(null);
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton type="submit" variant="primary">
                  {editingNotice ? "Update" : "Add"}
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
        message="Are you sure you want to delete this notice?"
      />
    </div>
  );
};

export default Notice;
