import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../index.css";
import UserService from "../service/UserService";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <div className="sidenav">
        <button className="dropdown-btn" onClick={toggleDropdown}>
          Class Management <i className="fa fa-caret-down"></i>
        </button>

        <div className={`dropdown-container ${dropdownVisible ? "show" : ""}`}>
          {isAuthenticated && <NavLink to="/app/main">Main</NavLink>}
          {isAuthenticated && isAdmin && (
            <NavLink to="/app/course/create">Course Registration</NavLink>
          )}
          {isAuthenticated && !isAdmin && (
            <NavLink to="/app/student/create">Student Registration</NavLink>
          )}
          {isAuthenticated && isAdmin && (
            <NavLink to="/app/user/create">User Registration</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/app/course/management">Course Management</NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/app/student/search">Student Search</NavLink>
          )}
        </div>
        {isAuthenticated && isAdmin && (
          <NavLink to="/app/admin-section">Users Management</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
