// src/Layout.jsx
import React from 'react';
import Navigations from "./Navigations";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
//import Category from './CategoryItems/Category.jsx'; // Assuming this file is imported

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigations />
     
      <Outlet /> {/* Renders nested routes defined within App.jsx */}
      <Footer />
    </div>
  );
}

export { Layout };
