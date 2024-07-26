import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // Fetch single product details
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/get-product/${params.slug}`,
        { withCredentials: true }
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/category/get-category", {
        withCredentials: true,
      });
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle form submit to update product details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping ? 1 : 0);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `http://localhost:3000/product/update-product/${id}`,
        productData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await axios.delete(
        `http://localhost:3000/product/delete-product/${id}`,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 bg-gray-100">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Update Product</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-4">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="mx-auto h-48 object-cover"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:3000/product/product-photo/${id}`}
                    alt="product_photo"
                    className="mx-auto h-48 object-cover"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                value={description}
                placeholder="Enter product description"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={price}
                placeholder="Enter product price"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={quantity}
                placeholder="Enter product quantity"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="w-full"
                onChange={(value) => {
                  setShipping(value === "1");
                }}
                value={shipping ? "1" : "0"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">
                UPDATE PRODUCT
              </button>
              <button type="button" onClick={handleDelete} className="btn btn-danger">
                DELETE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
