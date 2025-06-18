import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Header from "./Header";
import { BarLoader } from "react-spinners";
const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://ezystaybackend.onrender.com/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Convert weeklyRevenue array into objects for Recharts
  const getChartData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dashboardData?.weeklyRevenue?.map((amount, idx) => ({
      day: days[idx],
      revenue: amount,
    }));
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <BarLoader color="#3b82f6" width={150} height={4} />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <Header />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              Total Properties
            </h2>
            <p className="text-3xl font-bold">
              {dashboardData?.totalListings ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              Total Bookings
            </h2>
            <p className="text-3xl font-bold">
              {dashboardData?.totalBookings ?? "-"}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              Total Revenue
            </h2>
            <p className="text-3xl font-bold">
              ₹{dashboardData?.totalRevenue ?? "-"}
            </p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Weekly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", border: "none" }}
                labelStyle={{ color: "#ddd" }}
                formatter={(value) => [`₹${value}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
