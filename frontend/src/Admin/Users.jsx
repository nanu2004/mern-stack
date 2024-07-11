import React from "react";
import AdminMenu from "../AdminMenu"; // Adjust the import path as needed

const Users = () => {
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu /> {/* Assuming AdminMenu handles navigation or additional functionalities */}
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
          {/* Add your user list rendering or other content here */}
        </div>
      </div>
    </div>
  );
};

export default Users;
