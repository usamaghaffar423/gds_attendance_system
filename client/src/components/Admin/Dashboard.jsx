import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import SignOutButton from "../SignOut";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("You are not authorized to access this page...!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    // Simulate fetching the current user role from localStorage or an API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserRole(userData.role);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-customBlueDarkHigh items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-customBlueDarkHigh items-center justify-center text-white">
        {error}
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
            All Employees
          </NavLink>
          {/* Conditionally render the Attendance link based on the user's role */}
          {userRole === "admin" ? (
            <>
              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  `p-2 rounded-lg cursor-pointer my-2 ${
                    isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
                  }`
                }
              >
                All Attendance
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `p-2 rounded-lg cursor-pointer my-2 ${
                    isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
                  }`
                }
              >
                Register New Employee
              </NavLink>
            </>
          ) : (
            <>
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
              <NavLink
                to="/employee-attendance"
                className={({ isActive }) =>
                  `p-2 rounded-lg cursor-pointer my-2 ${
                    isActive ? "bg-slate-950" : "bg-gray-700 hover:bg-slate-800"
                  }`
                }
              >
                Your Attendance
              </NavLink>
            </>
          )}
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-customBlueDarkHigh">
        <div className="mb-6">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-3xl font-bold mb-4 text-white text-left">
              All Employees
            </h1>
            <SignOutButton />
          </div>
          {/* Employee Cards Section */}
          <div className="h-[800px] overflow-y-auto scrollable-content px-4">
            {" "}
            {/* Set a fixed height and enable scrolling */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-gray-900 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-700 text-white text-2xl font-bold rounded-full">
                    {employee.username
                      .split(" ")
                      .map((name) => name.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="space-y-2 flex flex-col items-center justify-center gap-4 mt-4">
                    <p className="flex items-center justify-between gap-4 px-4 w-full">
                      <span className="font-semibold text-gray-400">
                        Username:
                      </span>
                      <strong className="text-gray-200">
                        {employee.username}
                      </strong>
                    </p>
                    <p className="flex items-center justify-between gap-4 px-4 w-full">
                      <span className="font-semibold text-gray-400">
                        Phone:
                      </span>
                      <strong className="text-gray-200">
                        {employee.phoneNumber}
                      </strong>
                    </p>
                    <p className="flex items-center justify-between gap-4 px-4 w-full">
                      <span className="font-semibold text-gray-400">
                        Designation:
                      </span>
                      <strong>{employee.designation}</strong>
                    </p>
                    <p className="flex items-center justify-between gap-4 px-4 w-full">
                      <span className="font-semibold text-gray-400">Role:</span>
                      <strong className="text-gray-200">{employee.role}</strong>
                    </p>
                    <p className="flex items-center justify-between gap-4 px-4 w-full">
                      <span className="font-semibold text-gray-400">
                        Your Secret Code:
                      </span>
                      <strong className="text-gray-200">
                        {employee.cnic_last6}
                      </strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
