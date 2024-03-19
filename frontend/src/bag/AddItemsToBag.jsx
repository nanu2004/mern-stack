import React from 'react';
import { Link } from 'react-router-dom';

function AddItemsToBag() {
  const [cartItems, setCartItems] = React.useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const total = subtotal; // You can customize this based on your logic

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems); // Update the cartItems state
  };

  const handleConfirm = () => {
    // Implement your confirmation logic here
    alert('Order confirmed!');
  };

  // Check if cartItems array is empty
  if (cartItems.length === 0) {
    return null; // If cart is empty, return null to prevent rendering
  }

  return (
    <div className="max-w-sm mt-8 p-2 rounded-md shadow-md bg-gray-600 absolute top-10 right-10">
      <h2 className="text-lg font-bold mb-2">Add Items to Trolley</h2>
      {/* Display items */}
      <div className="grid gap-2">
        {/* Display items */}
        {cartItems.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFA1weAuutW-EX2CiNGwJYpIn_r95fpoTwJ7_10nTbg&s"// Assuming imageURL exists in item
              alt={item.title}
              className="mb-2 object-cover h-24 w-full rounded-md"
            />
            <p className="text-md font-bold">{item.title}</p>
            <p className="text-gray-500 text-xs">Brand: {item.brand}</p>
            <p className="text-gray-500 text-xs">Description: {item.description}</p>
            <p className="text-gray-500 text-xs">Price: ${item.price.toFixed(2)}</p>
            {/* Remove button */}
            <button
              className="text-red-600 bg-red-100 border border-red-400 px-1 py-0.5 rounded transition duration-300 ease-in-out hover:bg-red-200 text-xs"
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Display Subtotal And Total */}
      <div className="flex flex-col gap-1">
        <span className="text-white text-xs">Subtotal: ₹ {subtotal.toFixed(2)}</span>
        <span className="text-white text-xs">Total: ₹ {total.toFixed(2)}</span>
      </div>

      {/* Confirm Button */}
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
        onClick={handleConfirm}
      >
        Confirm
      </button>
      
      {/* Link to ProductCart */}
      <Link to="/cart" className="text-blue-500 mt-2 block underline">Go to Product Cart</Link>
    </div>
  );
}

export { AddItemsToBag };
