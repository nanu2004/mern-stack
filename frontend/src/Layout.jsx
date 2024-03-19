import React from 'react';
import Navigations from "./Navigations";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Category } from './CategoryItems/Category';

//import { AddItemsToBag } from "./bag/AddItemsToBag"; // Import AddItemsToBag component

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigations />
      
     
      <Category />
      <Outlet /> {/* Use Outlet to render child components */}
      {/* Include AddItemsToBag component */}
      <Footer />
    </div>
  );
}

export { Layout };
