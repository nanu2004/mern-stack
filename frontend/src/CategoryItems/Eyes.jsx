import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Eyes() {
  const [eyesProducts, setEyesProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEyesProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/products_by_category/eyes"
        );
        setEyesProducts(response.data.filterProducts);
      } catch (error) {
        console.error("Error fetching eye linear products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEyesProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {eyesProducts.map((product) => (
          <Link
            key={product._id}
            to={{
              pathname: `/product/${product._id}`,
              state: { productId: product._id } // Pass product ID as state
            }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620804587331-effc68d47d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXllbGluZXJ8ZW58MHx8MHx8fDA%3D"
                alt={product.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
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

export { Eyes };
