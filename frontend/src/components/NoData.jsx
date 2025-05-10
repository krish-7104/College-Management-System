import React from "react";

const NoData = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full my-20">
      <img src="/assets/empty.svg" alt="No data" className="w-64 h-64" />
      <p className="text-gray-600 mt-2">{title || "No data found"}</p>
    </div>
  );
};

export default NoData;
