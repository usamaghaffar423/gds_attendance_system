import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setUserRole(userData.role);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen bg-customBlueDarkHigh items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-customBlueDarkHigh">
      {/* Sidebar */}
      <aside className="w-1/5 bg-customBlueDark text-white p-4 shadow-lg">
        <img src={logo} alt="Logo" className="w-3/6 mx-auto mb-4" />
        <ul className="space-y-4 mt-8 flex flex-col">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-2 rounded-lg cursor-pointer my-2 ${
                isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          {userRole === "admin" ? (
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `p-2 rounded-lg cursor-pointer my-2 ${
                  isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
                }`
              }
            >
              Attendance
            </NavLink>
          ) : (
            <NavLink
              to="/user-profile"
              className={({ isActive }) =>
                `p-2 rounded-lg cursor-pointer my-2 ${
                  isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
                }`
              }
            >
              Profile
            </NavLink>
          )}
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-customBlueDarkHigh">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-white text-left">
            Your Profile
          </h1>
          {/* User Information Card */}
          <div className="flex flex-wrap gap-6 w-full">
            <div
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex-1 w-1/2  flex flex-col items-center justify-center transition-transform transform"
              style={{ height: "calc(100vh - 100px)" }}
            >
              {/* Avatar with Initials */}
              <div className="w-32 h-32 flex items-center justify-center bg-gray-700 text-white text-5xl font-bold rounded-full">
                {user.username
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")
                  .toUpperCase()}
              </div>

              {/* User Information */}
              <div className="space-y-16 flex flex-col mt-4 w-2/4">
                <p className="flex items-center justify-between gap-4 w-full">
                  <span className="font-semibold text-gray-400 text-xl">
                    Full Name:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.username || "N/A"}
                  </strong>
                </p>
                <p className="flex items-center justify-between gap-4 ">
                  <span className="font-semibold text-gray-400 text-xl">
                    Phone:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.phoneNumber || "N/A"}
                  </strong>
                </p>
                <p className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-400 text-xl">
                    Designation:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.designation || "N/A"}
                  </strong>
                </p>
                <p className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-400 text-xl">
                    Role:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.role || "N/A"}
                  </strong>
                </p>
                <p className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-400 text-xl">
                    Your Secret Code:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.cnic_last6 || "N/A"}
                  </strong>
                </p>
                <p className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-400 text-xl">
                    Joining Date:
                  </span>
                  <strong className="text-gray-200 text-xl">
                    {user.created_at || "N/A"}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
