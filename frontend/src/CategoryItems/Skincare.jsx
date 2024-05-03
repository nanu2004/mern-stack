import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from "../common/truncateContentBox";

function Skincare() {
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkincareProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/products_by_category/skincare"
        );
        setSkincareProducts(response.data.filterProducts);
      } catch (error) {
        console.error("Error fetching skincare products:", error.message);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skincareProducts.map((product) => (
          <Link
            key={product._id}
            to={{
              pathname: `/product/${product._id}`,
              state: { productId: product._id }
            }}
            className="text-center"
          >
            <div
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

export default Skincare;
