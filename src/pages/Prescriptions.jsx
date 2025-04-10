// pages/admin/Prescriptions.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get("http://localhost:3030/api/prescriptions",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setPrescriptions(res.data);
    });
  }, []);

  return (
    <div className="p-6"> 
      <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(p => (
            <tr key={p._id} className="border-t">
              <td>{p._id.slice(0, 8)}</td>
              <td>{p.user?.name || "N/A"}</td>
              <td>{new Date(p.prescriptionDate).toLocaleDateString()}</td>
              <td>{p.status}</td>
              <td>
                <Link to={`/admin/prescriptions/${p._id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;
