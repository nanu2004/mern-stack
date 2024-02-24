// Card.jsx
import React from 'react';
import { useCartContext } from './CartContext';

const Card = () => {
  const { cartItems, clearCart, updateQuantity } = useCartContext();

  const handleIncrement = (index) => {
    updateQuantity(index, cartItems[index].quantity + 1);
  };

  const handleDecrement = (index) => {
    const newQuantity = Math.max(0, cartItems[index].quantity - 1);
    updateQuantity(index, newQuantity);
  };

  const handleDelete = (index) => {
    // Implement your logic to remove the item at the given index from the cart
    // For now, let's assume you have a function removeFromCart(index) in CartContext
    // and you call it like removeFromCart(index) in handleDelete
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-8 max-w-screen-md">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border p-4 mb-4 flex items-center">
              <img src={item.image} alt={item.title} className="w-16 h-16 mr-4" />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-gray-500">Category: {item.category}</p>
                <p className="text-gray-500">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(index)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
                  >
                    -
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button
                    onClick={() => handleIncrement(index)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 mt-2 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">${calculateTotal().toFixed(2)}</p>
          </div>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
