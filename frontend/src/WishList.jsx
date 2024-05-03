import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchWishlist();
    }, [products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products'); // Assuming you have an endpoint to fetch all products
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/wishlist/get'); // Assuming you have an endpoint to fetch wishlist items
            setWishlist(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`/wishlist/remove/${productId}`);
            fetchWishlist();
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    return (
        <div>
            <h2>Wishlist</h2>
            <ul>
                {wishlist.map(item => (
                    <li key={item._id}>
                        {/* Assuming the wishlist item contains product ID and title */}
                        {item.productId} - {products.find(product => product._id === item.productId)?.title} 
                        <button onClick={() => removeFromWishlist(item.productId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
