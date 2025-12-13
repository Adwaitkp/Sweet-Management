import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Sweets({ onLogout }) {
  const [sweets, setSweets] = useState([]);

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    loadSweets();
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="p-6">
      <button className="mb-4 bg-red-600 text-white px-3 py-1" onClick={onLogout}>
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-4">Sweets</h1>

      <div className="grid grid-cols-3 gap-4">
        {sweets.map(s => (
          <div key={s.id} className="border p-3">
            <h2 className="font-bold">{s.name}</h2>
            <p>₹{s.price}</p>
            <p>Qty: {s.quantity}</p>
            <button
              disabled={s.quantity === 0}
              className="bg-blue-600 text-white px-2 py-1 mt-2 disabled:bg-gray-400"
              onClick={() => purchase(s.id)}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
