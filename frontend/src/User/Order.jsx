import React, { useState, useEffect } from "react";
import UserMenu from "../UserMenu";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      console.log("Fetching orders with token:", auth.token); // Log the token
      const { data } = await axios.get("http://localhost:3000/auth/orders", {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      console.log("Fetched Orders Data:", data); // Log the data
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error); // Log an error
    }
  };

  useEffect(() => {
    console.log("Auth object:", auth); // Log auth object
    if (auth?.token) {
      console.log("Auth token:", auth.token); // Log auth token
      getOrders();
    } else {
      console.log("No auth token found"); // Log if no token found
    }
  }, [auth?.token]);

  return (
    <div className="container-fluid p-3 m-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((o, i) => (
              <div className="border shadow mb-3" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o.status}</td>
                      <td>{o.buyer?.firstname || 'N/A'} {o.buyer?.lastname || ''}</td>
                      <td>{moment(o.createdAt).fromNow()}</td>
                      <td>{o.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o.products?.length || 0}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o.products?.map((p, j) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:3000/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description?.substring(0, 30) || 'No description'}</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
