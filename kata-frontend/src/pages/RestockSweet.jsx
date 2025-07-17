import { useState, useEffect } from "react";
import api from "../services/api";

const RestockSweet = () => {
  const [sweets, setSweets] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSweets = async () => {
      const res = await api.get("/sweets");
      setSweets(res.data);
    };
    fetchSweets();
  }, []);

  const handleRestock = async (e) => {
    e.preventDefault();
    if (!selectedId || quantity < 1) return;

    try {
      // const res = await api.put(`/sweets/${selectedId}/restock`, { quantity });
      const res = await api.post(`/sweets/restock`, {
        id: selectedId,
        quantity: Number(quantity),
      });

      // setMessage(`✅ Restocked ${quantity} of ${res.data.name}`);
      setMessage(
        `✅ Restocked ${quantity} of ${res.data.updatedSweet.name}. New Stock: ${res.data.updatedSweet.quantity}`
      );
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || "Restock failed"}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        🔄 Restock Sweet
      </h2>

      <form onSubmit={handleRestock} className="space-y-4">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Select Sweet</option>
          {sweets.map((sweet) => (
            <option key={sweet.id} value={sweet.id}>
              {sweet.name} (Current Stock: {sweet.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          placeholder="Quantity to restock"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Restock
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
};

export default RestockSweet;
