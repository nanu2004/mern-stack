import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const token = Cookies.get("token"); // Retrieve token from cookies

      const { data } = await axios.post(
        "http://localhost:3000/product/create-product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
          withCredentials: true, // Ensure cookies are sent along with the request
        }
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row m-3 p-3">
      <div className="md:w-1/4 mb-6 md:mb-0">
        <AdminMenu />
      </div>
      <div className="md:w-3/4">
        <h1 className="text-3xl font-bold mb-6">Create Product</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-full mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
            </label>
            {photo && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="object-cover h-48 w-full rounded-md"
                />
              </div>
            )}
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={name}
              placeholder="Product Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <textarea
              type="text"
              value={description}
              placeholder="Product Description"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              value={price}
              placeholder="Product Price"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              value={quantity}
              placeholder="Product Quantity"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="w-full mb-3"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleCreate}
            >
              <FaPlus className="inline-block mr-2" /> Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
