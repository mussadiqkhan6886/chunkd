"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash } from "react-icons/fi";

const DeliveryPage = () => {
  const [city, setCity] = useState("");
  const [charge, setCharge] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await axios.get("/api/deliveryCharges");
    console.log(res)
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!city || charge < 0) {
      alert("Enter valid city & charge");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/deliveryCharges", { city, charge });
      setCity("");
      setCharge(0);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding city");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/deliveryCharges/${id}`);
      fetchData();
    } catch {
      alert("Delete error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Delivery Charges</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Charge"
          value={charge}
          onChange={(e) => setCharge(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />
        <button
          className="bg-soft text-white px-4 py-2 rounded"
          disabled={loading}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Cities & Charges</h2>

      {data.length === 0 ? <p>No Charges yet</p> : (
        <div className="space-y-2">
        {data.map((item) => (
          <div key={item._id} className="flex justify-between border px-4 py-2 rounded">
            <span>{item.city}</span>
            <div className="flex gap-6 items-center">
              <span>Rs {item.charge}</span>
              <FiTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default DeliveryPage;
