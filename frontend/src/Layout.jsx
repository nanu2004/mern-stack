import React from 'react';
import Navigations from "./Navigations";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Category } from './CategoryItems/Category';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigations />
      <Category />
      <Outlet /> {/* Use Outlet to render child components */}
      <Footer />
    </div>
  );
}

export { Layout };
