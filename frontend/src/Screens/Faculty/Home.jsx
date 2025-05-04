import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../../components/Notice";
import ProfileCard from "../../components/ProfileCard";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Material from "./Material";
import StudentFinder from "./StudentFinder";

const MENU_ITEMS = [
  { id: "home", label: "Home", component: ProfileCard },
  { id: "timetable", label: "Timetable", component: Timetable },
  { id: "marks", label: "Upload Marks", component: Marks },
  { id: "material", label: "Material", component: Material },
  { id: "notice", label: "Notice", component: Notice },
  { id: "studentfinder", label: "Student Info", component: StudentFinder },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosWrapper.get("/faculty/my-details", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          setProfileData(response.data.data);
          dispatch(setUserData(response.data.data));
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchUserDetails();
  }, [dispatch, userToken]);

  const getMenuItemClass = (menuId) => {
    const isSelected = selectedMenu.toLowerCase() === menuId;
    return `text-center px-6 py-3 cursor-pointer font-medium text-sm w-full rounded-md ${
      isSelected
        ? "bg-blue-500 text-white"
        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
    }`;
  };

  const CurrentComponent = MENU_ITEMS.find(
    (item) => item.id.toLowerCase() === selectedMenu.toLowerCase()
  )?.component;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className={getMenuItemClass(item.id)}
              onClick={() => setSelectedMenu(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {selectedMenu.toLowerCase() === "home" && profileData ? (
          <ProfileCard
            profile={profileData.profile}
            name={`${profileData.firstName} ${profileData.lastName}`}
            details={{
              "Employee ID": profileData.employeeId,
              Designation: profileData.designation,
              Email: profileData.email,
              Phone: profileData.phone,
              "Blood Group": profileData.bloodGroup,
              Gender: profileData.gender,
              "Joining Date": new Date(
                profileData.joiningDate
              ).toLocaleDateString(),
            }}
          />
        ) : (
          CurrentComponent && <CurrentComponent />
        )}
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
