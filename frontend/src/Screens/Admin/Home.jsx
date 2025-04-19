import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Branch from "./Branch";
import ProfileCard from "../../components/ProfileCard";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";

const MENU_ITEMS = [
  { id: "home", label: "Home", component: null },
  { id: "student", label: "Student", component: Student },
  { id: "faculty", label: "Faculty", component: Faculty },
  { id: "branch", label: "Branch", component: Branch },
  { id: "notice", label: "Notice", component: Notice },
  { id: "subjects", label: "Subjects", component: Subjects },
  { id: "admin", label: "Admins", component: Admin },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseApiURL()}/admin/my-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setProfileData(response.data.data);
        dispatch(setUserData(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error fetching user details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch, userToken]);

  const getMenuItemClass = (menuId) => {
    const isSelected = selectedMenu.toLowerCase() === menuId;
    return `
      text-center px-6 py-3 cursor-pointer
      font-medium text-sm w-full
      rounded-md
      transition-all duration-300 ease-in-out
      ${
        isSelected
          ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg transform -translate-y-1"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
      }
    `;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">Loading...</div>
      );
    }

    if (selectedMenu === "Home" && profileData) {
      return (
        <ProfileCard
          profile={profileData.profile}
          name={`${profileData.firstName} ${profileData.lastName}`}
          details={{
            email: profileData.email,
            phone: profileData.phone,
            branch: profileData.branch.name,
            designation: profileData.designation,
            employeeId: profileData.employeeId,
            gender: profileData.gender,
          }}
        />
      );
    }

    const MenuItem = MENU_ITEMS.find(
      (item) => item.id === selectedMenu.toLowerCase()
    )?.component;

    return MenuItem && <MenuItem />;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className={getMenuItemClass(item.id)}
              onClick={() => setSelectedMenu(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {renderContent()}
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
