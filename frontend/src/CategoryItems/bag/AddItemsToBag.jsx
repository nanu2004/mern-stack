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
    <div className="max-w-xs mt-8 p-1 rounded-md shadow-md bg-gray-600 absolute top-10 right-10">
      <h2 className="text-xs font-bold mb-1">Add Items to Trolley</h2>
      {/* Display items */}
      <div className="grid gap-1">
        {/* Display items */}
        {cartItems.map((item, index) => (
          <div key={index} className="bg-white p-1 rounded-md shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFA1weAuutW-EX2CiNGwJYpIn_r95fpoTwJ7_10nTbg&s"// Assuming imageURL exists in item
              alt={item.title}
              className="mb-1 object-cover h-12 w-full rounded-md"
            />
            <p className="text-xxs font-bold">{item.title}</p>
            <p className="text-gray-500 text-xxs">Brand: {item.brand}</p>
            <p className="text-gray-500 text-xxs">Description: {item.description}</p>
            <p className="text-gray-500 text-xxs">Price: ${item.price.toFixed(2)}</p>
            {/* Remove button */}
            <button
              className="text-red-600 bg-red-100 border border-red-400 px-0.5 py-0.5 rounded transition duration-300 ease-in-out hover:bg-red-200 text-xxs"
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Display Subtotal And Total */}
      <div className="flex flex-col gap-0.5">
        <span className="text-white text-xxs">Subtotal: ₹ {subtotal.toFixed(2)}</span>
        <span className="text-white text-xxs">Total: ₹ {total.toFixed(2)}</span>
      </div>

      {/* Confirm Button */}
      <button
        className="bg-green-500 text-white py-0.5 px-1 rounded hover:bg-green-700 mt-1 text-xxs"
        onClick={handleConfirm}
      >
        Confirm
      </button>
      
      {/* Link to ProductCart */}
      <Link to="/cart" className="text-blue-500 mt-1 block underline text-xxs">Go to Product Cart</Link>
    </div>
  );
}

export { AddItemsToBag };
