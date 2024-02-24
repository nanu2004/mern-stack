// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "./Category";
import Home from "./Home";
import Header from "./Header";
import { ProductProvider } from "./ProductContext";
import Card from './Card';
import { CartProvider } from './CartContext';
import { LoginProvider } from './LoginContext';
import Login from './Login';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <LoginProvider>
            {/* Wrap the entire application with ProductProvider */}
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/*" element={<Category />} />
              <Route path="/card" element={<Card />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </LoginProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
