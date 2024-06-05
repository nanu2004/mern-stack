import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimationLoader } from "../common/AnimationLoader";
import { truncateContentBox } from "../common/truncateContentBox";

function Mascara() {
    const [mascaraProducts, setMascaraProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMascaraProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/app/products_by_category/mascara"
                );
                setMascaraProducts(response.data.filterProducts);
            } catch (error) {
                console.error("Error fetching mascara products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMascaraProducts();
    }, []);

    const addToWishlist = async (productId) => {
        try {
            await axios.post('http://localhost:3000/wishlist/add', { productId });
            // If successful, you can update the UI accordingly
            window.location.href = '/wishlist'; // Redirect to the wishlist page
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    if (loading) {
        return <AnimationLoader />;
    }

    return (
        <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mascaraProducts.map((product) => (
                    <div key={product._id} className="text-center">
                        <Link
                            to={{
                                pathname: `/product/${product._id}`,
                                state: { productId: product._id }
                            }}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJtcONJICJdAXPPMnA_z_95zXZTsBfItGuYIc2cIDgN1Q6pN0JiYZ0ODAHjiPh2yDI3wg&usqp=CAU"
                                    alt={product.name}
                                    className="w-full h-48 object-cover object-center"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-600">${product.price}</p>
                                    <p className="text-gray-600">{truncateContentBox(product.description, 50)}</p>
                                    <div className="mt-4 text-center">
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <button
                            className="mt-2 text-red-500 hover:text-red-600"
                            onClick={() => addToWishlist(product._id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l-2 2m0 0l-2 2m2-2l2 2m0 0l2 2m-2-6l-2 2m0 0l-2 2m2-2l2 2m0 0l2 2M3 6c0-1.1.9-2 2-2h4a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { Mascara };
