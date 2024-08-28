import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

// Helper functions to format date and time
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (timestamp) => {
  const [hours, minutes, seconds] = timestamp.split(":");
  return `${hours}:${minutes}:${seconds}`;
};

// Function to get unique color for each date
const getDateColor = (index) => {
  const colors = [
    "bg-indigo-950",
    "bg-indigo-950",
    "bg-purple-700",
    "bg-red-700",
  ];
  return colors[index % colors.length];
};

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://gds-attendance-system-api.vercel.app/api/all")
      .then((response) => {
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Group records by date and sort by timestamp in descending order
  const groupedAttendanceData = attendanceData.reduce((acc, record) => {
    const date = formatDate(record.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  // Sort the grouped attendance data by date in descending order
  const sortedDates = Object.keys(groupedAttendanceData).sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("/"));
    const dateB = new Date(b.split("/").reverse().join("/"));
    return dateB - dateA; // Sort in descending order
  });

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
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 bg-customBlueDarkHigh">
        <h1 className="text-3xl font-bold mb-4 text-white text-left">
          Attendance Records
        </h1>
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">Error: {error}</div>
        ) : attendanceData.length > 0 ? (
          <div className="min-w-full rounded-lg shadow-md bg-customBlueDark p-4 text-white">
            {/* Header Row */}
            <div className="flex text-gray-200 bg-slate-950 my-2 rounded-lg">
              <div className="py-3 px-4 flex-1">
                <h3 className="text-green-500 font-semibold">Username</h3>
              </div>
              <div className="py-3 px-4 flex-1">
                <h3 className="text-green-500 font-semibold">
                  CNIC Last 6 Digits
                </h3>
              </div>
              <div className="py-3 px-4 flex-1 font-semibold">
                <h3 className="text-green-500 font-semibold">Date</h3>
              </div>
              <div className="py-3 px-4 flex-1 font-semibold">
                <h3 className="text-green-500 font-semibold">Time</h3>
              </div>
            </div>

            {/* Scrollable Body Rows */}
            <div className="scrollable-content max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-custom">
              {sortedDates.map((date, index) => (
                <div key={date}>
                  {/* Date Group Header */}
                  <div
                    className={`text-center text-white font-bold py-2 text-gray-300 ${getDateColor(
                      index
                    )}`}
                  >
                    Date: {date}
                  </div>

                  {/* Sort the records for each date group by time in descending order */}
                  {groupedAttendanceData[date]
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )
                    .map((record, idx) => (
                      <div
                        key={idx}
                        className="flex min-w-full bg-customBlueDarkHigh rounded-lg hover:bg-slate-950 text-white my-2"
                      >
                        <div className="py-3 px-4 flex-1">
                          <p className="text-gray-400">{record.username}</p>
                        </div>
                        <div className="py-3 px-4 flex-1">
                          <p className="text-gray-400">{record.cnic_last6}</p>
                        </div>
                        <div className="py-3 px-4 flex-1">
                          <p className="text-gray-400">
                            {formatDate(record.date)}
                          </p>
                        </div>
                        <div className="py-3 px-4 flex-1">
                          <p className="text-gray-400">
                            {formatTime(record.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-700">No attendance records found.</div>
        )}
      </main>
    </div>
  );
};

export default Attendance;
