// Layout.jsx
import React, { useState } from 'react';
import Navigations from "./Navigations";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Category from './CategoryItems/Category.jsx';

function Layout() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigations  />
      <Category />
      <Outlet />
      <Footer />
    </div>
  );
}

export { Layout };
