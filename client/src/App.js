// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Attendance from "./components/Admin/Attendance";
import Dashboard from "./components/Admin/Dashboard";
import Register from "./components/Admin/Register";
import EmployeeAttendance from "./components/GroupComp/EmployeeAttendance";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/employee-attendance" element={<EmployeeAttendance />} />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
