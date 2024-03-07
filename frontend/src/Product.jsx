import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Product() {
  const [products, setProducts] = useState(null); // Initialize as an empty array
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/get_all_products"
        );

        setProducts(response.data.getAllProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  function handleEachProduct(productId, eachProduct) {
    navigate(`/product_Details/${productId}`, { state: eachProduct });
  }

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     {console.log("Products:", products)}
      {products && products.map((eachProduct) => (
        <div
          className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer"
          key={eachProduct._id}
          onClick={() => handleEachProduct(eachProduct._id, eachProduct)}
        >
          <img
            src="data:image/jpeg;base64,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" // image not aviable in backend , until using some placeholder image....
            alt={eachProduct.name}
            className="mb-4 object-cover h-32 w-full rounded-md"
          />
          <h1 className="text-xl font-bold mb-2">{eachProduct.name}</h1>
          <p className="text-gray-600 mb-4">{eachProduct.description}</p>
          <span className="text-green-600 font-semibold">
            ${eachProduct.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Product;
