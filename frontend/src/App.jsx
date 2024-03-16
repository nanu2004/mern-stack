import { Layout } from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Product";
import { ProductViewPage } from "./ProductViewPage";
//import { ProductCart } from "./ProductCart";
import { Mascara } from "./CategoryItems/Mascara";
import { Eyes } from "./CategoryItems/Eyes";
import { Lipsticks } from "./CategoryItems/Lipsticks";
import Skincare from "./CategoryItems/Skincare";
import { Concealer } from "./CategoryItems/Concealer";
import { Foundation } from "./CategoryItems/Foundation";
import { AddItemsToBag } from "./bag/AddItemsToBag";
import { Form } from "./Form";
import UserLogin from "./UserLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/products" element={<Product />} />
            <Route path="/product_Details/:id" element={<ProductViewPage />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="category/Foundation" element={<Foundation />} />
            <Route path="category/Mascara" element={<Mascara />} />
            <Route path="category/Eyes" element={<Eyes />} />
            <Route path="category/Lipsticks" element={<Lipsticks />} />
            <Route path="category/skincare" element={<Skincare />} />
            <Route path="category/Concealer" element={<Concealer />} />
            <Route path="bag" element={<AddItemsToBag />} />
          </Route>
          <Route path="/signup" element={<Form />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
