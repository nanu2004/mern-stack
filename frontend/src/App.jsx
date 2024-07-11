import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the import path as needed
import { Layout } from './Layout';

import ProductDetails  from './ProductDetails'; // Import ProductDetails component
//import ProductCart from './ProductCart'; // Import ProductCart component
import { SearchProvider } from './context/search';
//import { ProductProvider } from './ProductContext'; // Import the ProductProvider
//import { CartProvider } from './CartContext'; // Import CartProvider
//import { Mascara } from './CategoryItems/Mascara'; // Import Mascara component
//import { Eyes } from './CategoryItems/Eyes'; // Import Eyes component
//import { Lipsticks } from './CategoryItems/Lipsticks'; // Import Lipsticks component
//import Skincare from './CategoryItems/Skincare'; // Import Skincare component
//import { Foundation } from './CategoryItems/Foundation'; // Import Foundation component
//import { AddItemsToBag } from './CategoryItems/bag/AddItemsToBag'; // Import AddItemsToBag component
import Signup from './Signup'; // Import Signup component
import Login from './Login'; // Import Login component
//import { Concealer } from './CategoryItems/Concealer'; // Import Concealer component
//import { Wishlist } from './WishList';
//import About from './About';
import Home from './Home';
import PrivateRoute from './Routes/PrivateRoute'; // Import PrivateRoute
import AdminRoute from './Routes/AdminRoute'; // Import AdminRoute
import AdminDashboard from './Admin/AdminDashboard'; // Import AdminDashboard
import CreateCategory from './Admin/CreateCategory'; // Import CreateCategory component
import CreateProduct from './Admin/CreateProduct'; // Import CreateProduct component
import Products from'./Admin/Products';
import Users from './Admin/Users'; // Import Users component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import User components
import Dashboard from './User/Dashboard';
import Order from './User/Order';
import Profile from './User/Profile';
import UpdateProduct from './Admin/UpdateProduct';
import Search from './Search';


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider> {/* Wrap entire application with AuthProvider */}
          <SearchProvider>
            {/* Wrap the ProductProvider */}

                <Routes>
                  <Route path="/" element={<Layout />}>
                  <Route index  element={<Home />} />
                  <Route path="/search" element={<Search />} />


                  <Route path="/product/:slug" element={<ProductDetails />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />


                    {/* Use PrivateRoute for protected routes */}
                    <Route path="/dashboard" element={<PrivateRoute />}>
                      <Route path="user" element={<Dashboard />} />
                      <Route path="user/orders" element={<Order />} />
                      <Route path="user/profile" element={<Profile />} />

                    </Route>

                    {/* Use AdminRoute for admin routes */}
                    <Route element={<AdminRoute />}>
                      <Route path="dashboard/admin" element={<AdminDashboard />} />
                      <Route path="dashboard/admin/create-category" element={<CreateCategory />} />
                      <Route path="dashboard/admin/create-product" element={<CreateProduct />} />
                      <Route path="dashboard/admin/products" element={<Products />} />
                      <Route path="dashboard/admin/product/:slug" element={<UpdateProduct />} />
                      <Route path="dashboard/admin/users" element={<Users />} />
                    </Route>



                  </Route>
                </Routes>
                <ToastContainer />
             
           
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
