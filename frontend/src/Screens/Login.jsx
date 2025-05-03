import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import { setUserToken } from "../redux/actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (userToken) {
      navigate(`/${localStorage.getItem("userType")}`);
    }
  }, [userToken]);

  const [selected, setSelected] = useState("Student");

  useEffect(() => {
    if (type) {
      setSelected(type.charAt(0).toUpperCase() + type.slice(1));
    }
  }, [type]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected}/login`, formData, {
          headers: headers,
        })
        .then((response) => {
          localStorage.setItem("userToken", response.data.data.token);
          localStorage.setItem("userType", selected);
          dispatch(setUserToken(response.data.data.token));
          navigate(`/${selected}`);
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="bg-white h-[100vh] w-full flex justify-between items-center">
      <img
        className="w-[60%] h-[100vh] object-cover"
        src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
          {selected && selected.charAt(0).toUpperCase() + selected.slice(1)}{" "}
          Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col w-[70%]">
            <label className="mb-1" htmlFor="email">
              {selected && selected} Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Link className="text-right mt-3 w-[70%]" to={"/forget-password"}>
            Forget Password?
          </Link>
          <button className="bg-blue-500 mt-3 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "student" && "border-b-2 border-green-500"
          }`}
          onClick={() => {
            setSelected("Student");
            params.set("type", "student");
            navigate(`?type=student`);
          }}
        >
          Student
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "faculty" && "border-b-2 border-green-500"
          }`}
          onClick={() => {
            setSelected("Faculty");
            params.set("type", "faculty");
            navigate(`?type=faculty`);
          }}
        >
          Faculty
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "admin" && "border-b-2 border-green-500"
          }`}
          onClick={() => {
            setSelected("Admin");
            params.set("type", "admin");
            navigate(`?type=admin`);
          }}
        >
          Admin
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
