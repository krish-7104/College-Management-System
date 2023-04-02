import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
const Timetable = () => {
  const [timetable, setTimetable] = useState("");
  const { userData } = useSelector((state) => state);

  useEffect(() => {
    const getTimetable = () => {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${baseApiURL()}/timetable/getTimetable`,
          { semester: userData.semester, branch: userData.branch },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data) {
            setTimetable(response.data[0].link);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    };
    userData && getTimetable();
  }, [userData, userData.branch, userData.semester]);

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Timetable of Semester ${userData.semester}`} />
        <p
          className="flex justify-center items-center text-lg font-medium cursor-pointer hover:text-red-500 hover:scale-110 ease-linear transition-all duration-200 hover:duration-200 hover:ease-linear hover:transition-all"
          onClick={() => window.open(timetable)}
        >
          Download
          <span className="ml-2">
            <FiDownload />
          </span>
        </p>
      </div>
      {timetable && (
        <img
          className="mt-8 rounded-lg shadow-md w-[70%] mx-auto"
          src={timetable}
          alt="timetable"
        />
      )}
      {!timetable && (
        <p className="mt-10">No Timetable Available At The Moment!</p>
      )}
    </div>
  );
};

export default Timetable;
