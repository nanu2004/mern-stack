import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from 
"../common/truncateContentBox";

function Mascara() {

    const [mascaraProducts, setmaskaraProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEyeLinearProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/app/products_by_category/mascara"
          );
          setmaskaraProducts(response.data.filterProducts);
        } catch (error) {
          console.error("Error fetching eye linear products:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEyeLinearProducts();
    }, []);
  
    if (loading) {
      return <AnimationLoader />;
    }
  
  
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-6">Discover Maskaras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mascaraProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJtcONJICJdAXPPMnA_z_95zXZTsBfItGuYIc2cIDgN1Q6pN0JiYZ0ODAHjiPh2yDI3wg&usqp=CAU"
              alt={product.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-600"> {truncateContentBox(product.description, 50)}</p>
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

export { Mascara };