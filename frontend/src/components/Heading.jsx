import React from "react";
const heading = (props) => {
  return (
    <div className="flex justify-between items-center w-full">
      <p className="font-semibold text-3xl border-l-8 border-red-500 pl-3">
        {props.title}
      </p>
    </div>
  );
};

export default heading;
