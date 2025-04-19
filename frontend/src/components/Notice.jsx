import React, { useEffect } from "react";
import { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Notice = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [token]);

  const getNoticeHandler = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${baseApiURL()}/notice`, {
        headers: headers,
      });

      if (response.data.success) {
        setNotice(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to fetch notices");
    }
  };

  useEffect(() => {
    getNoticeHandler();
  }, [router.pathname]);

  const addNoticehandler = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Adding Notice");

      const response = await axios.post(`${baseApiURL()}/notice`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        getNoticeHandler();
        setOpen(false);
        setData({ title: "", description: "", type: "student", link: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to add notice");
    }
  };

  const deleteNoticehandler = async (id) => {
    try {
      toast.loading("Deleting Notice");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`${baseApiURL()}/notice/${id}`, {
        headers: headers,
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        getNoticeHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to delete notice");
    }
  };

  const updateNoticehandler = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Updating Notice");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(`${baseApiURL()}/notice/${id}`, data, {
        headers: headers,
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        getNoticeHandler();
        setOpen(false);
        setEdit(false);
        setData({ title: "", description: "", type: "student", link: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to update notice");
    }
  };

  const setOpenEditSectionHandler = (index) => {
    setEdit(true);
    setOpen(true);
    setData({
      title: notice[index].title,
      description: notice[index].description,
      type: notice[index].type,
      link: notice[index].link || "",
    });
    setId(notice[index]._id);
  };

  const openHandler = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", type: "student", link: "" });
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Notices" />
        {(router.pathname === "/faculty" || router.pathname === "/admin") && (
          <button
            onClick={openHandler}
            className="text-center px-6 py-3 cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out bg-gradient-to-r from-red-500 rounded-full to-red-600 text-white shadow-lg transform -translate-y-1"
          >
            {open ? <BiArrowBack size={24} /> : <IoAddOutline size={24} />}
          </button>
        )}
      </div>
      {!open && (
        <div className="mt-8 w-full">
          {notice?.map((item, index) => (
            <div
              key={item._id}
              className="relative bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-300 border-2 border-gray-200"
            >
              {(router.pathname === "/faculty" ||
                router.pathname === "/admin") && (
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  {item.type !== "both" && (
                    <span className="text-sm bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium">
                      {item.type === "student"
                        ? "Student"
                        : item.type === "faculty"
                        ? "Faculty"
                        : "Both"}
                    </span>
                  )}
                  <button
                    onClick={() => deleteNoticehandler(item._id)}
                    className="p-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition duration-300"
                    title="Delete Notice"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                  <button
                    onClick={() => setOpenEditSectionHandler(index)}
                    className="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition duration-300"
                    title="Edit Notice"
                  >
                    <MdEditNote size={20} />
                  </button>
                </div>
              )}

              <div
                className={`text-xl font-semibold group flex items-center mb-3 ${
                  item.link ? "cursor-pointer hover:text-blue-600" : ""
                }`}
                onClick={() => item.link && window.open(item.link)}
              >
                {item.title}
                {item.link && (
                  <IoMdLink className="ml-2 text-2xl opacity-70 group-hover:opacity-100 group-hover:text-blue-500 transition-opacity duration-300" />
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex items-center text-sm text-gray-500">
                <HiOutlineCalendar className="mr-2" />
                {new Date(item.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {open && (
        <form className="mt-8 w-full max-w-2xl mx-auto bg-white p-8 rounded-xl border">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notice Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter notice title"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notice Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Enter notice description"
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notice Link (Optional)
            </label>
            <input
              type="text"
              id="link"
              value={data.link}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onChange={(e) => setData({ ...data, link: e.target.value })}
              placeholder="Enter notice link (if any)"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Type Of Notice
            </label>
            <select
              id="type"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="both">Both</option>
            </select>
          </div>

          <button
            onClick={edit ? updateNoticehandler : addNoticehandler}
            className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium text-sm focus:ring-4 focus:ring-blue-200"
          >
            {edit ? "Update Notice" : "Add Notice"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Notice;
