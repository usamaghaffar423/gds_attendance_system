import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import backgroundImage from "../../assets/background-image.jpg";
import axios from "axios";
import useGeoLocation from "./UseGeoLocation";

const EmployeeAttendance = () => {
  const [cnicLast6, setCnicLast6] = useState("");
  const [attendanceRecorded, setAttendanceRecorded] = useState(false);
  const { city, country, lat, lon } = useGeoLocation();
  const navigate = useNavigate();

  // Fetch attendance status on component mount
  // useEffect(() => {
  //   const fetchAttendanceStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://gds-attendance-system-backend.vercel.app/api/check-attendance"
  //       );
  //       const { attendanceRecorded } = response.data;

  //       if (attendanceRecorded) {
  //         setAttendanceRecorded(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching attendance status:", error);
  //       toast.error("Failed to check attendance status.");
  //     }
  //   };

  //   fetchAttendanceStatus();
  // }, []);

  const handleLogin = async () => {
    if (attendanceRecorded) {
      toast.info("You have already recorded your attendance for today.");
      return;
    }

    if (cnicLast6.length === 6) {
      try {
        const fetchIpAddress = async () => {
          try {
            const ipResponse = await axios.get(
              "https://api.ipify.org?format=json"
            );
            return ipResponse.data.ip;
          } catch (error) {
            console.error("Error fetching IP address:", error);
            toast.error("Failed to fetch IP address.");
            return null;
          }
        };

        const fetchLocation = () => {
          if (city && country && lat && lon) {
            return {
              city: city || "Unknown",
              country: country || "Unknown",
              latitude: lat || "Unknown",
              longitude: lon || "Unknown",
            };
          } else {
            console.error("Location data is not available.");
            toast.error("Location data is not available.");
            return null;
          }
        };

        const ipAddress = await fetchIpAddress();
        const location = fetchLocation();

        if (ipAddress && location) {
          try {
            const response = await toast.promise(
              axios.post(
                "https://gds-attendance-system-api.vercel.app/api/record",
                {
                  cnic_last6: cnicLast6,
                  ipAddress: ipAddress,
                  location: location,
                }
              ),
              {
                pending: "Recording Attendance...",
                success: "Attendance recorded successfully!",
                error: {
                  render({ data }) {
                    // Access the response error from the promise
                    const errorMessage =
                      data.response?.data?.message ||
                      "Failed to record attendance. Please try again.";
                    return errorMessage;
                  },
                },
              }
            );

            if (response && response.status === 200) {
              toast.success("Attendance recorded successfully!");
              navigate("/attendance");
            }
          } catch (error) {
            // Handle specific cases based on the error response
            if (error.response && error.response.status === 400) {
              return "You have already recorded your attendance for today.";
            } else {
              return "Failed to record attendance. Please try again.";
            }
          }
        }
      } catch (error) {
        return "Attendance may already be recorded or an invalid code was entered.";
      }
    } else {
      toast.warn("Please enter a valid 6-digit code.");
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-customDark opacity-95"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 w-2/7 bg-white bg-opacity-10 p-8 rounded-lg shadow-md">
          <div>
            <img src={logo} alt="Logo" className="w-36 h-auto" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-8">Employee Login</h2>
          <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-center gap-4">
            <input
              type="number"
              placeholder="Employee Id..."
              className="outline-none bg-transparent w-full"
              value={cnicLast6}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setCnicLast6(value);
                }
              }}
              maxLength={6}
              required
              disabled={attendanceRecorded} // Disable input if attendance is already recorded
            />
            <button
              onClick={handleLogin}
              className="bg-customYellow text-black font-bold hover:bg-yellow-400 px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
          {attendanceRecorded && (
            <p className="text-yellow-400 mt-4">
              You have already recorded your attendance for today.
            </p>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeAttendance;
