import React from "react";
import "./style/App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHome from "./components/StudentHome";
import FacultyHome from "./components/FacultyHome";
import Error from "./components/Error";
import UploadNotice from "./components/Faculty/UploadNotice";
import UploadMaterial from "./components/Faculty/UploadMaterial";
const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="students-home" element={<StudentHome />} />
          <Route path="faculty-home" element={<FacultyHome />}>
            <Route path="add-notice" element={<UploadNotice />} />
            <Route path="add-material" element={<UploadMaterial />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
