import { useLocation, useNavigate } from "react-router";

function ProductViewPage() {
  // we can use useLocation to access our data from pass past component (now where is redirect..)
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state;
  console.log("Product Data:", product);
  function handleCart() {wat
    navigate("/cart");
  }
  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src="https://via.placeholder.com/400"
            alt={state.name}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Category and Price */}
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Category:</span>
            <span className="text-blue-500 ml-2">{product.category}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Price:</span>
            <span className="text-green-600 font-semibold ml-2">
              ${product.price}
            </span>
          </div>

          {/* Add to Cart Button - Example */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProductViewPage };