import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
const Material = () => {
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState();
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  const getSubjectMaterial = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/material/getMaterial`,
        { subject: selected },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setMaterial(response.data.material);
        } else {
          // Error
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSelectChangeHandler = (e) => {
    setMaterial();
    setSelected(e.target.value);
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Material" />
      <div className="mt-8 w-full flex justify-center items-center flex-col">
        <div className="flex justify-center items-center w-[40%]">
          <select
            value={selected}
            name="subject"
            id="subject"
            onChange={onSelectChangeHandler}
            className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700"
          >
            <option defaultValue value="select">
              -- Select Subject --
            </option>
            {subject &&
              subject.map((item) => {
                return (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button
            onClick={getSubjectMaterial}
            className="bg-blue-500 text-white py-3 px-4 text-2xl rounded-sm"
          >
            <HiOutlineSearch />
          </button>
        </div>
        <div className="mt-8 w-full">
          {material &&
            material.reverse().map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 relative mb-4"
                >
                  <p
                    className={`text-xl font-medium flex justify-start items-center ${
                      item.link && "cursor-pointer"
                    } group`}
                    onClick={() =>
                      item.link &&
                      window.open(
                        process.env.REACT_APP_MEDIA_LINK + "/" + item.link
                      )
                    }
                  >
                    {item.title}{" "}
                    {item.link && (
                      <span className="text-2xl group-hover:text-blue-500 ml-1">
                        <IoMdLink />
                      </span>
                    )}
                  </p>
                  <p className="text-base font-normal mt-1">
                    {item.subject} - {item.faculty}
                  </p>
                  <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                    <span className="text-base mr-1">
                      <HiOutlineCalendar />
                    </span>{" "}
                    {item.createdAt.split("T")[0].split("-")[2] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[1] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[0] +
                      " " +
                      item.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>
              );
            })}
          {material && material.length === 0 && selected && (
            <p className="text-center">No Material For {selected}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
