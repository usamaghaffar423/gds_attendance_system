import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/background-image.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      // Make a request to the backend to start a session with the provided username and password
      const response = await axios.post(
        "https://gds-attendance-system-api.vercel.app/api/start-session",
        {
          username,
          password,
        }
      );
      console.log(response);
      // Assuming the response includes session information and user data
      const { data } = response;

      // Save session information (e.g., store in localStorage or state)
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("sessionToken", data.sessionToken);

      // Notify user
      toast.success("Session started successfully!");

      // Redirect to the dashboard or another route based on user role
      if (data.user.role === "admin") {
        window.location.href = "/dashboard"; // Example route for admin
      } else {
        window.location.href = "/employee-attendance"; // Example route for regular users
      }
    } catch (error) {
      console.error("Error starting session:", error);
      toast.error("Failed to start session. Please try again.");
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-customDark opacity-95"></div>

      {/* Main content */}
      <div className="relative z-10 w-1/3 py-8 rounded-lg bg-slate-900 flex flex-col items-center gap-6">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="py-2 px-4 rounded-lg text-lg bg-transparent border border-1 border-gray-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-4 rounded-lg text-lg bg-transparent border border-1 border-gray-400"
          />
        </div>
        <div className="w-1/3">
          <button
            onClick={handleClick}
            className="bg-orange-500 py-2 text-lg font-bold px-4 w-full rounded-full hover:bg-orange-600"
          >
            Login
          </button>
        </div>
      </div>

      {/* Toast notifications container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Home;
