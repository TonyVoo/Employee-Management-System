import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, ChevronRight, ChevronLeft, Briefcase, Calendar, Settings, LogOut, DollarSign } from "lucide-react";
import { getUsername, logout as authLogout } from "../services/AuthService";
import "../styles/Layout.css";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} style={{ marginRight: "10px" }} /> },
  {
    title: "Manage Employee",
    path: "/employees",
    icon: <Users size={20} style={{ marginRight: "10px" }} />,
    children: [
      { title: "List Employees", path: "/employees" },
      { title: "Add Employee", path: "/add-employee" },
      { title: "Performance Reviews", path: "/performance-review" },
      { title: "Offboard Employee", path: "/offboard" },
    ],
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <Briefcase size={20} style={{ marginRight: "10px" }} />,
    children: [
      { title: "All Projects", path: "/projects" },
      { title: "Create Project", path: "/add-project" },
      { title: "Project Analytics", path: "/project-analytics" },
    ],
  },
  {
    title: "Time & Attendance",
    path: "/schedule",
    icon: <Calendar size={20} style={{ marginRight: "10px" }} />,
    children: [
      { title: "View Calendar", path: "/schedule" },
      { title: "View Attendance", path: "/attendance" },
      { title: "Add Event", path: "/add-event" },
      { title: "Leave Requests", path: "/leave-requests" },
    ],
  },
  {
    title: "Payroll", // New top-level item
    path: "/payroll",
    icon: <DollarSign size={20} style={{ marginRight: "10px" }} />, // Add DollarSign from lucide-react
    children: [
      { title: "Generate Payroll", path: "/payroll" },
      { title: "View Payslips", path: "/payslips" },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings size={20} style={{ marginRight: "10px" }} />,
    children: [
      { title: "General Settings", path: "/settings" },
      { title: "Account", path: "/account" },
    ],
  },
];

const SideBarComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [username, setUsername] = useState("User");
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for logout feedback
  const navigate = useNavigate();

  useEffect(() => {
    const currentUsername = getUsername();
    if (currentUsername) {
      setUsername(currentUsername);
    }
  }, []);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    setIsLoggingOut(true); // Show logging out state
    setTimeout(() => {
      authLogout(); // Perform logout
      navigate("/login"); // Redirect to login page
    }, 1500); // Delay of 1.5 seconds (adjust as needed)
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <h1 className="sidebar-title">{isCollapsed ? "E" : "EMS"}</h1>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {!isCollapsed && (
        <div className="user-greeting">
          Hello, {username}!
        </div>
      )}

      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <NavLink
              to={item.path}
              className="nav-link"
              onClick={() => item.children && toggleSubmenu(index)}
            >
              {item.icon}
              {!isCollapsed && <span className="nav-text">{item.title}</span>}
            </NavLink>
            {!isCollapsed && item.children && openSubmenu === index && (
              <ul className="submenu">
                {item.children.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink to={subItem.path} className="nav-link submenu-item">
                      {subItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {!isCollapsed && (
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut size={20} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBarComponent;