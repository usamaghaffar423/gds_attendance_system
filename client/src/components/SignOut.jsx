import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Optionally, notify the server to end the session
      await axios.post("http://localhost:3002/api/signout");

      // Remove user data from local storage or session storage
      localStorage.removeItem("user");
      localStorage.removeItem("sessionToken");

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white p-2 rounded"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
