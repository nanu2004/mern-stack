import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Adjust the import path as needed
import { Layout } from './Layout';
import Product from './Product';
import { ProductDetails } from './ProductDetails'; // Import ProductDetails component
import ProductCart from './ProductCart'; // Import ProductCart component
import { SearchProvider } from './SearchContext';
import { ProductProvider } from './ProductContext'; // Import the ProductProvider
import { CartProvider } from './CartContext'; // Import CartProvider
import { Mascara } from './CategoryItems/Mascara'; // Import Mascara component
import { Eyes } from './CategoryItems/Eyes'; // Import Eyes component
import { Lipsticks } from './CategoryItems/Lipsticks'; // Import Lipsticks component
import Skincare from './CategoryItems/Skincare'; // Import Skincare component
import { Foundation } from './CategoryItems/Foundation'; // Import Foundation component
import { AddItemsToBag } from './CategoryItems/bag/AddItemsToBag'; // Import AddItemsToBag component
import Signup from './Signup'; // Import Signup component
import Login from './Login'; // Import Login component
import { Concealer } from './CategoryItems/Concealer'; // Import Concealer component
import { Wishlist } from './WishList';
import About from './About';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider> {/* Wrap entire application with AuthProvider */}
          <SearchProvider>
            <ProductProvider> {/* Wrap the ProductProvider */}
              <CartProvider> {/* Wrap the CartProvider */}

                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Product />} />
                    <Route path="/cart" element={<ProductCart />} />
                    <Route path="/category/Foundation" element={<Foundation />} />
                    <Route path="/category/Mascara" element={<Mascara />} />
                    <Route path="/category/Eyes" element={<Eyes />} />
                    <Route path="/category/Lipsticks" element={<Lipsticks />} />
                    <Route path="/category/skincare" element={<Skincare />} />
                    <Route path="/category/Concealer" element={<Concealer />} />
                    <Route path="/bag" element={<AddItemsToBag />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
                    <Route path="/Wishlist" element={<Wishlist />} />
                    
                    {/* Use PrivateRoute for protected routes */}


                    
                    {/* Route for ProductDetails */}
                    <Route path="/product/:productId" element={<ProductDetails />} />
                  </Route>
                </Routes>
                <ToastContainer />
              
              </CartProvider>
            </ProductProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
