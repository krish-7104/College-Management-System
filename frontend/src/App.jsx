import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";
import Login from "./Screens/Auth/Login";
import Register from "./Screens/Auth/Register";
import ForgotPassword from "./Screens/Auth/ForgotPassword";
import ResetPassword from "./Screens/Auth/ResetPassword";
import Dashboard from "./Screens/Dashboard";
import Student from "./Screens/Admin/Student";
import Faculty from "./Screens/Admin/Faculty";
import Subject from "./Screens/Admin/Subject";
import Branch from "./Screens/Admin/Branch";
import Profile from "./Screens/Profile";
import UploadMarks from "./Screens/Faculty/UploadMarks";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/student"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Student />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Faculty />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subject"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Subject />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/branch"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Branch />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <FacultyLayout>
                <Dashboard />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/upload-marks"
          element={
            <ProtectedRoute>
              <FacultyLayout>
                <UploadMarks />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <Dashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        {/* Common Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
