// Foundation.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from "../common/truncateContentBox";

function Foundation() {
  const [foundationProducts, setFoundationProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoundationProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/products_by_category/foundation"
        );
        setFoundationProducts(response.data.filterProducts);
      } catch (error) {
        console.error("Error fetching foundation products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundationProducts();
  }, []);

  if (loading) {
    return <AnimationLoader />;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {foundationProducts.map((product) => (
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
                src="https://images.unsplash.com/photo-1627885793933-584e53987c14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm91bmRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
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

export { Foundation };
