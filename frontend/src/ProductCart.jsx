import { UserForm } from "./UserForm";

function ProductCart() {
  // Replace the following with actual product data from your API or state
  const product = {
    name: "Sample Product",
    price: 49.99,
    imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
  };

  return (
    <div className="flex">
      {/* first  */}
      <div className="bg-white rounded-md shadow-md overflow-hidden w-full sm:w-80 mx-auto my-4">
        {/* Product Image */}
        <div className="flex justify-center items-center h-32 bg-gray-200">
          <img
            src={product.imageURL}
            alt={product.name}
            className="object-contain max-h-full"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="flex items-center justify-between">
            {/* Price */}
            <span className="text-green-600 font-semibold">
              ${product.price}
            </span>

            {/* Quantity Selector - Example */}
            <div className="flex items-center">
              <button className="text-gray-500 focus:outline-none">-</button>
              <span className="mx-2">1</span>
              <button className="text-gray-500 focus:outline-none">+</button>
            </div>
          </div>

          {/* Remove from Cart Button - Example */}
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800">
            Remove from Cart
          </button>
        </div>
      </div>
      {/* second  */}
      <UserForm />
    </div>
  );
}

export { ProductCart };