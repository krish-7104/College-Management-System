import React from "react";
import "./style/App.css";

import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHome from "./components/StudentHome";
import FacultyHome from "./components/FacultyHome";
import Admin from "./components/Faculty/Admin";
const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/students-home" element={<StudentHome />} />
          <Route path="/faculty-home" element={<FacultyHome />} />
          <Route
            path="/add-student/admin/07012004/"
            element={<Admin type="krish" />}
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
