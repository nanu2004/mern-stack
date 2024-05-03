import React, { useEffect } from 'react';

function ProductCart() {
  const [cartItems, setCartItems] = React.useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  // Shipping Options
  const shippingOptions = [
    { type: 'Flat rate', price: 20.00 },
    { type: 'Local pickup', price: 25.00 },
    { type: 'Free shipping', price: 0.00 } // Example: Free shipping
  ];

  // Total
  const total = (parseFloat(subtotal) + parseFloat(shippingOptions[0].price)).toFixed(2); // Assuming flat rate shipping

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className="w-full lg:max-w-4xl">
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <div className="flex items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFA1weAuutW-EX2CiNGwJYpIn_r95fpoTwJ7_10nTbg&s"
                    alt={item.title}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="p-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">
                        ${(!isNaN(item.price) && !isNaN(item.quantity)) ? (item.price * item.quantity).toFixed(2) : "Invalid Price"}
                      </span>
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-gray-500 focus:outline-none"
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="text-gray-500 focus:outline-none"
                          onClick={() => handleIncreaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden p-4">
              <h3 className="font-semibold mb-2">Subtotal</h3>
              <p>${subtotal}</p>
              <h3 className="font-semibold mt-4 mb-2">Shipping</h3>
              {shippingOptions.map((option, index) => (
                <div key={index} className="flex justify-between">
                  <p>{option.type}:</p>
                  <p>${option.price.toFixed(2)}</p>
                </div>
              ))}
              <h3 className="font-semibold mt-4">Total</h3>
              <p>${total}</p>
              <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
              onClick={() => setCartItems([])}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCart;
