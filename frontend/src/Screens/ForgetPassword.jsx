import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import axiosWrapper from "../utils/AxiosWrapper";
import CustomButton from "../components/CustomButton";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (userToken) {
      navigate(`/${localStorage.getItem("userType")}`);
    }
  }, [userToken, navigate]);

  const [selected, setSelected] = useState("Student");

  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Sending reset mail...");
    if (email === "") {
      toast.dismiss();
      toast.error("Please enter your email");
      return;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axiosWrapper.post(
        `${baseApiURL()}/${selected.toLowerCase()}/forget-password`,
        { email },
        {
          headers: headers,
        }
      );

      if (resp.data.success) {
        toast.dismiss();
        toast.success(resp.data.message);
      } else {
        toast.dismiss();
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error(error.response?.data?.message || "Error sending reset mail");
    } finally {
      setEmail("");
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
          {selected && selected} Forget Password
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
            />
          </div>

          <CustomButton type="submit" className="mt-5 text-xl">
            Forget Password
          </CustomButton>
        </form>
      </div>
      <div className="absolute top-4 right-4">
        <CustomButton
          onClick={() => setSelected("Student")}
          variant={selected === "Student" ? "primary" : "secondary"}
          className="!bg-transparent !text-blue-500 hover:!text-blue-700 !shadow-none hover:!shadow-none !transform-none hover:!transform-none"
        >
          Student
        </CustomButton>
        <CustomButton
          onClick={() => setSelected("Faculty")}
          variant={selected === "Faculty" ? "primary" : "secondary"}
          className="!bg-transparent !text-blue-500 hover:!text-blue-700 !shadow-none hover:!shadow-none !transform-none hover:!transform-none"
        >
          Faculty
        </CustomButton>
        <CustomButton
          onClick={() => setSelected("Admin")}
          variant={selected === "Admin" ? "primary" : "secondary"}
          className="!bg-transparent !text-blue-500 hover:!text-blue-700 !shadow-none hover:!shadow-none !transform-none hover:!transform-none"
        >
          Admin
        </CustomButton>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ForgetPassword;
