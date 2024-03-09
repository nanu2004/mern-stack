import { Layout } from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Product";
import { ProductViewPage } from "./ProductViewPage";
import { ProductCart } from "./ProductCart";
import { Mascara } from "./CategoryItems/Mascara";
import { Eyes } from "./CategoryItems/Eyes";
import { Lipsticks } from "./CategoryItems/Lipsticks";
import Skincare from "./CategoryItems/Skincare";
import { Concealer } from "./CategoryItems/Concealer";
import { Foundation } from "./CategoryItems/Foundation";
  // Renamed the component

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
          </Route>
          <Route path="/cart" element={<ProductCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
