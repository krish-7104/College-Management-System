import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosWrapper from "../utils/AxiosWrapper";
import CustomButton from "../components/CustomButton";

const USER_TYPES = {
  STUDENT: "Student",
  FACULTY: "Faculty",
  ADMIN: "Admin",
};

const UserTypeSelector = ({ selected, onSelect }) => (
  <div className="flex justify-center gap-4 mb-8">
    {Object.values(USER_TYPES).map((type) => (
      <button
        key={type}
        onClick={() => onSelect(type)}
        className={`px-5 py-2 text-sm font-medium rounded-full transition duration-200 ${
          selected === type
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        {type}
      </button>
    ))}
  </div>
);

const ForgetPassword = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [selected, setSelected] = useState(USER_TYPES.STUDENT);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userToken) {
      navigate(`/${localStorage.getItem("userType")}`);
    }
  }, [userToken, navigate]);

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
        `/${selected.toLowerCase()}/forget-password`,
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
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-[40%] px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          {selected} Forget Password
        </h1>
        <UserTypeSelector selected={selected} onSelect={setSelected} />
        <form
          className="w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
          onSubmit={onSubmit}
        >
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-medium mb-2"
              htmlFor="email"
            >
              {selected} Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <CustomButton
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200"
          >
            Send Reset Link
          </CustomButton>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ForgetPassword;
