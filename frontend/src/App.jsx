import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure path is correct
import { WishlistProvider } from './context/WishlistContext'; // Ensure path is correct
import { Layout } from './Layout'; // Ensure path is correct
import ProductDetails from './ProductDetails'; // Ensure path is correct
import { SearchProvider } from './context/search'; // Ensure path is correct
import { CartProvider } from './context/cart'; // Ensure path is correct
import Signup from './Signup'; // Ensure path is correct
import Login from './Login'; // Ensure path is correct
import Home from './Home'; // Ensure path is correct
import PrivateRoute from './Routes/PrivateRoute'; // Ensure path is correct
import AdminRoute from './Routes/AdminRoute'; // Ensure path is correct
import AdminDashboard from './Admin/AdminDashboard'; // Ensure path is correct
import AdminOrders from './Admin/AdminOrders'; // Ensure path is correct
import CreateCategory from './Admin/CreateCategory'; // Ensure path is correct
import CreateProduct from './Admin/CreateProduct'; // Ensure path is correct
import Products from './Admin/Products'; // Ensure path is correct
import Comment from './Admin/Comment'; // Ensure path is correct
import Users from './Admin/Users'; // Ensure path is correct
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import User components
import Dashboard from './User/Dashboard'; // Ensure path is correct
import Order from './User/Order'; // Ensure path is correct
import Profile from './User/Profile'; // Ensure path is correct
import UpdateProduct from './Admin/UpdateProduct'; // Ensure path is correct
import Search from './Search'; // Ensure path is correct
import Categories from './Categories'; // Ensure path is correct
import CategoryProduct from './CategoryProduct'; // Ensure path is correct
import CartPage from './CartPage'; // Ensure path is correct
import WishlistPage from './WishlistPage'; // Ensure path is correct

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider> {/* Wrap entire application with AuthProvider */}
          <SearchProvider>
            <CartProvider>
              <WishlistProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/product/:slug" element={<ProductDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/category/:slug" element={<CategoryProduct />} />
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
                      <Route path="dashboard/admin/comment" element={<Comment />} />
                      <Route path="dashboard/admin/orders" element={<AdminOrders />} />
                      <Route path="dashboard/admin/product/:slug" element={<UpdateProduct />} />
                      <Route path="dashboard/admin/users" element={<Users />} />
                    </Route>
                  </Route>
                </Routes>
                <ToastContainer />
              </WishlistProvider>
            </CartProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
