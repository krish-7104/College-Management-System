import React from "react";
import "./style/App.css";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StudentHome from "./components/StudentHome";
import FacultyHome from "./components/FacultyHome";
import Error from "./components/Error";
const App = () => {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students-home" element={<StudentHome />} />
        <Route path="/faculty-home" element={<FacultyHome />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </React.StrictMode>
  );
};

export default App;
