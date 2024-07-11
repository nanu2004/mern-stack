import React from "react";
import UserMenu from "../UserMenu";
//import Layout from "./../../components/Layout/Layout";

const Orders = () => {
  return (
    
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
   
  );
};

export default Orders;