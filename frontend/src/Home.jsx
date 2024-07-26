import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Prices";
import { useCart } from "./context/cart";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from './context/AuthContext'; // Import useAuth

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]); // State to manage wishlist items

  const { auth } = useAuth(); // Access auth state from AuthContext

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    if (auth.user) {
      getWishlist(); // Fetch wishlist if authenticated
    }
  }, [auth.user]);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add/remove item from wishlist
  const handleWishlist = async (productId) => {
    if (!auth.user) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:3000/wishlist/add`,
        { productId },
        { withCredentials: true }
      );
      toast.success(data?.message);
      getWishlist(); // Refresh wishlist
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update wishlist");
    }
  };

  // Get user's wishlist
  const getWishlist = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/wishlist", { withCredentials: true });
      setWishlist(data?.wishlist?.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <div className="container-fluid row mt-3">
      <div className="col-md-2">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column">
          {categories?.map((c) => (
            <Checkbox
              key={c._id} // Ensure each key is unique, using a property like _id
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p, index) => (
              <div key={index}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-column">
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div className="card m-2 relative" style={{ width: "18rem" }} key={p._id}>
              <div className="relative">
                <img
                  src={`http://localhost:3000/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={() => handleWishlist(p._id)}
                >
                  {isInWishlist(p._id) ? (
                    <FaHeart className="hover:text-red-500 text-red-500" />
                  ) : (
                    <FaRegHeart className="hover:text-red-500" />
                  )}
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text"> $ {p.price}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
