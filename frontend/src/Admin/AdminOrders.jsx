import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../AdminMenu";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import { Select, Button, Modal, Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/auth/all-orders", {
        withCredentials: true,
      });
      console.log("Fetched orders:", data); // Debugging: check fetched data
      setOrders(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `http://localhost:3000/auth/order-status/${orderId}`,
        { status: value },
        { withCredentials: true }
      );
      getOrders();
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove deleted order from the state
      toast.success("Order deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order");
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
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
          width="50px"
          height="50px"
          className="rounded-lg"
        />
      )
    },
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
  ];

  const orderColumns = [
    { title: '#', dataIndex: 'index', key: 'index' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          bordered={false}
          onChange={(value) => handleChange(record._id, value)}
          defaultValue={text}
          style={{ width: '120px' }}
        >
          {status.map((s, i) => (
            <Option key={i} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (text) => text ? `${text.firstname} ${text.lastname}` : "N/A"
    },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (text) => moment(text).fromNow() },
    { title: 'Payment', dataIndex: 'payment', key: 'payment', render: (text) => text?.success ? "Success" : "Failed" },
    { title: 'Quantity', dataIndex: 'products', key: 'products', render: (text) => text?.length },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            className="mr-2"
          >
            Delete
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
        </>
      )
    }
  ];

  return (
    <div className="row dashboard">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Orders</h1>

        {/* Conditionally render the user's first name */}
        {auth?.token && auth?.user?.firstname && (
          <h2 className="text-center">Welcome, {auth.user.firstname}!</h2>
        )}

        <div className="table-container max-h-[500px] overflow-y-auto overflow-x-auto mt-5">
          {orders.length > 0 ? (
            <Table
              columns={orderColumns}
              dataSource={orders.map((order, index) => ({
                ...order,
                index: index + 1,
                key: order._id
              }))}
              pagination={false}
            />
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>

      {/* Modal for viewing order details */}
      <Modal
        title="Order Details"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ top: 20 }}
        bodyStyle={{ padding: '20px' }}
      >
        {selectedOrder && (
          <div className="modal-body">
            <h3>Order ID: {selectedOrder._id}</h3>
            <p>Status: {selectedOrder.status}</p>
            <p>Buyer: {selectedOrder.buyer ? `${selectedOrder.buyer.firstname} ${selectedOrder.buyer.lastname}` : "N/A"}</p>
            <p>Date: {moment(selectedOrder.createdAt).format('YYYY-MM-DD')}</p>
            <p>Payment: {selectedOrder.payment?.success ? "Success" : "Failed"}</p>
            {selectedOrder.products && selectedOrder.products.length > 0 ? (
              <Table
                columns={columns}
                dataSource={selectedOrder.products.map((product, index) => ({
                  ...product,
                  key: product._id,
                  index: index + 1
                }))}
                rowKey="_id"
                pagination={false}
                size="small"
                scroll={{ y: 200 }} // Set the scroll height for the modal table
              />
            ) : (
              <p>No products found in this order.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;
