import { Layout } from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Product  from "./Product";
import { ProductViewPage } from "./ProductViewPage";
import { ProductCart } from "./ProductCart";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* hun  appa ehnu parent bna lena eh route nu */}
          <Route path="/" element={<Layout />}>
          <Route path="/products" element={<Product />} />

            <Route path="/product_Details/:id" element={<ProductViewPage />} />
          </Route>
          {/* here , out of parent  */}
          <Route path="/cart" element={<ProductCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;