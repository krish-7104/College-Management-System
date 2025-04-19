import React from "react";

const ProfileCard = ({ profile, name, details }) => {
  return (
    <div className="">
      <div className="max-w-6xl flex justify-between items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 flex">
          <div className="flex-shrink-0">
            <img
              src={profile}
              alt="profile"
              className="h-48 w-48 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          <div className="ml-12 flex-grow">
            <h1 className="text-3xl font-bold mb-8">{name}</h1>

            {details && Object.keys(details).length > 0 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                {Object.entries(details).map(([label, value]) => (
                  <p key={label} className="flex items-center">
                    <span className="font-medium w-32">
                      {label.charAt(0).toUpperCase() + label.slice(1)}:
                    </span>
                    <span className="text-gray-700">
                      {typeof value === "string"
                        ? value.charAt(0).toUpperCase() + value.slice(1)
                        : value}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
