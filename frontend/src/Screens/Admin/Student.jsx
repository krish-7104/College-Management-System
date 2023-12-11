import React, { useState } from "react";
import Heading from "../../components/Heading";
import AddStudent from "./Student/AddStudent";
import EditStudent from "./Student/EditStudent";
const Student = () => {
  const [selected, setSelected] = useState("add");
  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Student
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("edit")}
          >
            Edit Student
          </button>
        </div>
      </div>
      {selected === "add" && <AddStudent />}
      {selected === "edit" && <EditStudent />}
    </div>
  );
};

export default Student;
