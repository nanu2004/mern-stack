import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from 
"../common/truncateContentBox";

function Skincare() {
  // Fake data for skincare products
  const [skincareProducts, setskincareProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkincareProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/products_by_category/skincare"
        );
        setskincareProducts(response.data.filterProducts);
      } catch (error) {
        console.error("Error fetching eye linear products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkincareProducts();
  }, []);

  if (loading) {
    return <AnimationLoader />;
  }                      
  
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-6">Explore Skincare Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skincareProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src="https://neudeskin.com/cdn/shop/files/Combo1_MainImage.jpg?v=1696575074&width=493"
              alt={product.name}
              className="w-48 h-48 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <p className="text-gray-600">
                {truncateContentBox(product.description, 50)}
              </p>
              <Link
                to={`/product_Details/${product.id}`}
                className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skincare;
