import React from "react";
import "./style/App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHome from "./components/Student/StudentHome";
import FacultyHome from "./components/Faculty/FacultyHome";
import Error from "./components/Error";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="students-home" element={<StudentHome />} />
          <Route path="faculty-home" element={<FacultyHome />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
