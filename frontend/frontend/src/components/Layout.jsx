import React from "react";
import { Outlet } from "react-router-dom";
import SideBarComponent from "./SideBarComponent";
import "../styles/Layout.css"; 

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <SideBarComponent />

      {/* Main Content */}
      <div className="content">
        <Outlet /> {/* This dynamically loads the selected component */}
      </div>
    </div>
  );
};

export default Layout;
