import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-2">
          <img
            src={`http://localhost:3000/product/product-photo/${product._id}`}
            className="rounded-lg shadow-lg w-full"
            alt={product.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>
          <p className="text-lg"><strong>Name:</strong> {product.name}</p>
          <p className="text-lg"><strong>Description:</strong> {product.description}</p>
          <p className="text-lg"><strong>Price:</strong> ${product.price}</p>
          <p className="text-lg"><strong>Category:</strong> {product?.category?.name}</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            ADD TO CART
          </button>
        </div>
      </div>
      <hr className="my-6" />
      <div>
        <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="w-full md:w-1/4 p-2" key={p._id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={`http://localhost:3000/product/product-photo/${p?._id}`}
                  className="w-full"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">{p.name}</h5>
                  <p className="text-gray-700 mb-2">{p.description.substring(0, 30)}...</p>
                  <p className="text-blue-500 font-semibold mb-2">$ {p.price}</p>
                  <div className="flex justify-between">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-200">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
