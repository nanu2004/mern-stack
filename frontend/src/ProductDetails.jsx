import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useProductContext } from './ProductContext';
import MyImage from './MyImage';
import FormatPrice from './FormatPrice';
import { TbTruckDelivery, TbReplace } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import Star from './Star.jsx';

function ProductDetails() {
  const { productId } = useParams();
  const { product, setProduct } = useProductContext();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/get_product/${productId}`);
        console.log('Product Details Response:', response.data);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, setProduct]);

  const handleAddToCart = () => {
    const newItem = {
      _id: productId,
      title: product.title,
      price: product.price,
      quantity: quantity // Using the selected quantity
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [...existingCartItems, newItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    // Redirect to the cart page by changing the window location
    window.location.href = '/cart';
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  const { title, description, price, stock, image, stars, reviews, brand } = product;
  const parsedStars = typeof stars === 'number' ? stars : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MyImage imgs={image} />
        </div>
        <div className="product-details-card bg-white p-6 rounded-lg shadow-lg relative">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="flex items-center mb-4">
            <Star stars={parsedStars} reviews={reviews} />
            <span className="text-gray-500 text-sm ml-2">{reviews} reviews</span>
          </div>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="mb-4">
            <p className="text-gray-700 mb-1">MRP:</p>
            <p className="text-gray-500"><del><FormatPrice price={price + 250000} /></del></p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-1">Deal of the Day:</p>
            <p className="text-green-500"><FormatPrice price={price} /></p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-1">Warranty:</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center">
                <div className="warranty-icon bg-gray-200 rounded-full p-2">
                  <TbTruckDelivery className="text-xl" />
                </div>
                <p>Free Delivery</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="warranty-icon bg-gray-200 rounded-full p-2">
                  <TbReplace className="text-xl" />
                </div>
                <p>30 Days Replacement</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="warranty-icon bg-gray-200 rounded-full p-2">
                  <TbTruckDelivery className="text-xl" />
                </div>
                <p>Thapa Delivered</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="warranty-icon bg-gray-200 rounded-full p-2">
                  <MdSecurity className="text-xl" />
                </div>
                <p>2 Year Warranty</p>
              </div>
            </div>
          </div>
          <hr className="border-black my-4" />
          <div className="mb-4">
            <p className="text-gray-700 mb-1">Availability:</p>
            <p>{stock > 0 ? "In Stock" : "Not Available"}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-1">Brand :</p>
            <span>{brand}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={decrementQuantity}>-</button>
            <span className="mr-2">{quantity}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={incrementQuantity}>+</button>
          </div>

          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export { ProductDetails };
