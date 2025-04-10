// pages/admin/PrescriptionDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [status, setStatus] = useState("approved");
  const [rejectionReason, setRejectionReason] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3030/api/prescriptions/${id}`).then(res => {
      setPrescription(res.data);
    });
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3030/api/prescriptions/${id}/status`, {
        status,
        rejectionReason,
        notes,
      });

      alert("Prescription updated");
      navigate("/admin/prescriptions");
    } catch (error) {
      alert("Error updating prescription");
      console.log(error);
    }
  };

  if (!prescription) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>

      <div className="mb-4">
        <p><strong>Date:</strong> {new Date(prescription.prescriptionDate).toLocaleDateString()}</p>
        <p><strong>Doctor:</strong> {prescription.doctorDetails?.name}</p>
        <p><strong>Status:</strong> {prescription.status}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {prescription.images.map((img, i) => (
          <img key={i} src={img} alt="Prescription" className="max-w-xs border rounded" />
        ))}
      </div>

      <h3 className="font-semibold mb-2">Items</h3>
      <ul className="list-disc pl-5 mb-4">
        {prescription.items.map((item, i) => (
          <li key={i}>{item.name} - {item.dosage} x {item.quantity}</li>
        ))}
      </ul>

      <div className="border-t pt-4">
        <label className="block mb-2">
          <strong>Status:</strong>
          <select value={status} onChange={e => setStatus(e.target.value)} className="ml-2">
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
        </label>

        {status === "rejected" && (
          <div className="mb-2">
            <label>Rejection Reason:</label>
            <input value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} className="w-full border p-2 mt-1" />
          </div>
        )}

        <div className="mb-4">
          <label>Notes:</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border p-2 mt-1" />
        </div>

        <button onClick={handleStatusUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
