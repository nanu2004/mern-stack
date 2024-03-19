import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Product from './Product';
import { Mascara } from './CategoryItems/Mascara';
import { Eyes } from './CategoryItems/Eyes';
import { Lipsticks } from './CategoryItems/Lipsticks';
import Skincare from './CategoryItems/Skincare';
import { Concealer } from './CategoryItems/Concealer';
import { Foundation } from './CategoryItems/Foundation';
import { AddItemsToBag } from './bag/AddItemsToBag';
import  Signup from './Signup';
import Login from './Login';
import ProductCart from './ProductCart';


function Appa() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/products" element={<Product />} />
            <Route path="/bag" element={<AddItemsToBag />} />
            <Route path="/cart" element={<ProductCart />} />

            <Route path="/category/Foundation" element={<Foundation />} />
            <Route path="/category/Mascara" element={<Mascara />} />
            <Route path="/category/Eyes" element={<Eyes />} />
            <Route path="/category/Lipsticks" element={<Lipsticks />} />
            <Route path="/category/skincare" element={<Skincare />} />
            <Route path="/category/Concealer" element={<Concealer />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Appa;
