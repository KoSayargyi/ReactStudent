import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SharedLayout from "./components/template/ShareLayout";
import Main from "./pages/main";
import CourseRegistration from "./pages/course-registration";
import StudentManagement from "./pages/student-management";
import UserRegistration from "./pages/user-registration";
import StudentRegistration from "./pages/student-registration";
import CourseManagement from "./pages/course-management";
import UserManagement from "./pages/user-management";
import UserService from "./components/service/UserService";
import "./index.css";

function App() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<SharedLayout />}>
          <Route index element={<Main />} />
          <Route path="main" element={<Main />} />
          {isAuthenticated && isAdmin && (
            <Route path="course/create" element={<CourseRegistration />} />
          )}
          {isAuthenticated && (
            <Route path="student/create" element={<StudentRegistration />} />
          )}
          {isAuthenticated && isAdmin && (
            <Route path="course/management" element={<CourseManagement />} />
          )}
          {isAuthenticated && isAdmin && (
            <Route path="user/create" element={<UserRegistration />} />
          )}
          {isAuthenticated && (
            <Route path="student/search" element={<StudentManagement />} />
          )}
          {UserService.adminOnly() && (
            <Route path="admin-section" element={<UserManagement />} />
          )}
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
