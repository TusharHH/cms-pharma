import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend, ResponsiveContainer
} from "recharts";

const AdminSales = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:3030/api/analytics/sales", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setTopProducts(res.data.topProducts);

        // Format sales trend with readable month-year
        const trendFormatted = res.data.salesTrend.map(item => ({
          month: new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short", year: "numeric" }),
          totalSales: item.totalSales,
          orderCount: item.orderCount
        }));
        setSalesTrend(trendFormatted);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales Analytics</h2>

      <h3>Top 5 Selling Products</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topProducts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSold" fill="#8884d8" />
          <Bar dataKey="totalRevenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "3rem" }}>Sales Trend (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
          <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminSales;
