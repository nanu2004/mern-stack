// Lipsticks.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from "../common/truncateContentBox";

function Lipsticks() {
  const [lipstickProducts, setLipstickProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLipstickProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/products_by_category/lipstick"
        );
        setLipstickProducts(response.data.filterProducts);
      } catch (error) {
        console.error("Error fetching lipstick products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLipstickProducts();
  }, []);

  if (loading) {
    return <AnimationLoader />;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lipstickProducts.map((product) => (
          <Link
            key={product._id}
            to={{
              pathname: `/product/${product._id}`,
              state: { productId: product._id }
            }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://img.forestessentialsindia.com/pub/media/catalog/product/2/1/21283_tinted_lip_serum_madhu_rasa_buransh_2.2_g_product_display_1.jpg"
                alt={product.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <p className="text-gray-600">{truncateContentBox(product.description, 50)}</p>
                <div className="mt-4 text-center">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { Lipsticks };
