import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Table, Button, Modal } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import 'antd/dist/reset.css'; // Ensure Ant Design CSS is included

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Get all products
  const getAllProducts = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const { data } = await axios.get("http://localhost:3000/product/get-product", {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleView = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleDelete = async (productId) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:3000/product/delete-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (slug) => {
    navigate(`/dashboard/admin/product/${slug}`);
  };

  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img
          src={`http://localhost:3000/product/product-photo/${record._id}`}
          alt={record.name}
          className="w-16 h-16 object-cover"
        />
      )
    },
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="mr-2"
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.slug)} // Assuming 'slug' is a property of the product
            className="mr-2"
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <AdminMenu />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-center text-2xl font-bold mb-4">All Products List</h1>
        <div className="overflow-auto max-h-[500px]">
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            rowKey="_id"
            className="mt-4"
            rowClassName="custom-row"
          />
        </div>
      </div>

      {/* Modal for viewing product details */}
      <Modal
        title="Product Details"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="custom-modal"
      >
        {selectedProduct && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Product ID: {selectedProduct._id}</h3>
            <p className="mt-2">Name: {selectedProduct.name}</p>
            <p className="mt-2">Description: {selectedProduct.description}</p>
            <p className="mt-2">Price: {selectedProduct.price}</p>
            <div className="mt-4">
              <img
                src={`http://localhost:3000/product/product-photo/${selectedProduct._id}`}
                alt={selectedProduct.name}
                className="w-full max-h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;
