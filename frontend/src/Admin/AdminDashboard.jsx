import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import AdminMenu from '../AdminMenu'; // Adjust the path based on your project structure
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Dashboard Overview",
      font: {
        size: 20,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const AdminDashboard = () => {
  const { auth } = useAuth(); // Get auth from context
  const [dataCounts, setDataCounts] = useState({
    products: 0,
    categories: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productsRes = await axios.get('http://localhost:3000/product/count', { withCredentials: true });
        const categoriesRes = await axios.get('http://localhost:3000/category/count', { withCredentials: true });
        const usersRes = await axios.get('http://localhost:3000/auth/count', { withCredentials: true });

        setDataCounts({
          products: productsRes.data.count,
          categories: categoriesRes.data.count,
          users: usersRes.data.count,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    if (auth && auth.user) {
      fetchCounts();
    }
  }, [auth]);

  if (!auth || !auth.user) {
    return <div>Loading admin data...</div>; // Handle initial loading state
  }

  const { firstname, lastname } = auth.user;

  const chartData = {
    labels: ["Products", "Categories", "Users"],
    datasets: [
      {
        label: "Counts",
        data: [dataCounts.products, dataCounts.categories, dataCounts.users],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Products
          "rgba(153, 102, 255, 0.6)", // Categories
          "rgba(255, 159, 64, 0.6)", // Users
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-500 p-4 rounded shadow-md text-white flex flex-col items-center">
              <h5 className="text-xl font-bold">Products</h5>
              <p className="text-3xl font-semibold">{dataCounts.products}</p>
            </div>
            <div className="bg-green-500 p-4 rounded shadow-md text-white flex flex-col items-center">
              <h5 className="text-xl font-bold">Categories</h5>
              <p className="text-3xl font-semibold">{dataCounts.categories}</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded shadow-md text-white flex flex-col items-center">
              <h5 className="text-xl font-bold">Users</h5>
              <p className="text-3xl font-semibold">{dataCounts.users}</p>
            </div>
          </div>
          <div className="w-full mt-4">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
