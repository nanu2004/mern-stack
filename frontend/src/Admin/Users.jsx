import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../AdminMenu"; // Adjust the import path as needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/users', { withCredentials: true });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/users/${userId}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const viewUser = (user) => {
    alert(`User Details:
    Name: ${user.firstname} ${user.lastname}
    Email: ${user.email}
    Phone: ${user.phone}
    Address: ${user.address}
    Role: ${user.role}`);
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu /> {/* Assuming AdminMenu handles navigation or additional functionalities */}
        </div>
        <div className="col-md-9">
          <h1 className="text-xl font-bold mb-4">All Users</h1>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="h-[600px] overflow-y-auto"> {/* Increased height for the users table */}
                <table className="table w-full min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 border">First Name</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Last Name</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Email</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Phone</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Address</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Role</th> {/* Decreased padding */}
                      <th className="px-2 py-1 border">Actions</th> {/* Decreased padding */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-b">
                        <td className="px-2 py-1">{user.firstname}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">{user.lastname}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">{user.email}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">{user.phone}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">{user.address}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">{user.role}</td> {/* Decreased padding */}
                        <td className="px-2 py-1">
                          <button 
                            className="btn btn-info btn-sm m-1" // Added btn-sm for smaller button size
                            onClick={() => viewUser(user)}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-danger btn-sm m-1" // Added btn-sm for smaller button size
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
