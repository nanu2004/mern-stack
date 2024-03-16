import React from 'react';

function AddItemsToBag() {
  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const total = subtotal; // You can customize this based on your logic

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload(); // Refresh the page to reflect the updated cart
  };

  return (
    <div className="max-w-md mt-8 p-4 rounded-md shadow-md bg-gray-600 absolute top-10 right-10">
      <h2 className="text-2xl font-bold mb-4">Add Items to Trolley</h2>
      {/* Display items */}
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <img
              src="https://media.istockphoto.com/id/1408439145/photo/autumn-skincare-and-autumn-makeup-concept-with-beauty-products-on-table.webp?s=612x612&w=is&k=20&c=KwlmYXDOOaSx0UdU2R_xnQ-SMT22k1MS2VXoQgdnfyg=" // Assuming the image URL is stored in the 'image' property of each cart item
              alt={item.title}
              className="mb-4 object-cover h-32 w-full rounded-md"
            />
            <p className="text-lg font-bold">{item.title}</p>
            <p className="text-gray-600">Brand: {item.brand}</p>
            <p className="text-gray-600">Description: {item.description}</p>
            <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
            {/* Remove button */}
            <button
              className="mt-2 text-red-600  cursor-pointer bg-transparent border border-solid border-red-500 px-2 py-1 rounded transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Display Subtotal And Total */}
      <div className="flex justify-start items-start flex-col gap-5">
        <span>Subtotal: ₹ {subtotal.toFixed(2)}</span>
        <span>Total: ₹ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export { AddItemsToBag };
