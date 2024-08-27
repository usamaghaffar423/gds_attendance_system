import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import backgroundImage from "../../assets/background-image.jpg";
import logo from "../../assets/logo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("admin");
  const [cnicLast6, setCnicLast6] = useState("");
  const [password, setPassword] = useState(""); // Added state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirm password
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const response = await axios.post("http://localhost:3002/api/register/", {
        username,
        phoneNumber,
        designation,
        role,
        cnicLast6,
        password, // Include password in the request
      });
      console.log(response.data);

      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/attendance");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
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

      {/* Container for logo and form */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Registration form */}
        <div className="flex flex-col items-center gap-2 w-2/5 bg-white bg-opacity-10 p-8 rounded-lg shadow-md">
          <div>
            <img src={logo} alt="Logo" className="w-36 h-auto" />
          </div>
          <div className="bg-customDark p-4 text-lg rounded-lg px-4 text-white flex flex-col items-center justify-center gap-4 w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Employee Registration</h2>
            <form onSubmit={handleRegister} className="w-full max-w-md">
              <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4">
                <input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Phone Number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4 w-full">
                  <input
                    type="text"
                    placeholder="Designation..."
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4 w-full">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="outline-none bg-transparent text-gray-400 w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                    required
                  >
                    <option
                      value="employee"
                      className="outline-none bg-transparent border border-2 bg-gray-900"
                    >
                      Employee
                    </option>
                    <option
                      value="admin"
                      className="outline-none bg-transparent border border-2 bg-gray-900"
                    >
                      Admin
                    </option>
                  </select>
                </div>
              </div>
              <div className="bg-customDark p-2 text-lg rounded-lg px-4 text-white flex items-center justify-between gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Employee Id..."
                  className="outline-none bg-transparent w-full border border-2 border-gray-500 px-4 py-2 rounded-lg"
                  value={cnicLast6}
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    // Ensure value is a number and restrict to 6 digits
                    if (/^\d{0,6}$/.test(value)) {
                      setCnicLast6(value);
                    }
                  }}
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                className="bg-rose-600 drop-shadow-md font-bold hover:bg-rose-700 px-4 py-2 rounded-lg w-1/2 mt-4"
              >
                Register
              </button>
            </form>
          </div>
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

export default Register;
