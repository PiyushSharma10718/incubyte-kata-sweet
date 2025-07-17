import { useState, useEffect } from "react";
import api from "../services/api"; // make sure this points to your axios instance

const SortSweets = () => {
<<<<<<< HEAD
  const [field, setField] = useState("name");
=======
  const [sortBy, setSortBy] = useState("name");
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54
  const [order, setOrder] = useState("asc");
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSortedSweets = async () => {
      try {
<<<<<<< HEAD
        const queryString = new URLSearchParams({ field, order }).toString();
=======
        const queryString = new URLSearchParams({ sortBy, order }).toString();
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54
        const res = await api.get(`/sweets/sort?${queryString}`);
        setSweets(res.data);
      } catch (err) {
        console.error("Error fetching sorted sweets:", err);
      }
    };

    fetchSortedSweets();
<<<<<<< HEAD
  }, [field, order]);
=======
  }, [sortBy, order]);
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        📊 Sort Sweets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">Sort by:</label>
          <select
<<<<<<< HEAD
            value={field}
            onChange={(e) => {
              const selectedField = e.target.value;
              setField(selectedField);
              // Set default order
              if (selectedField === "price" || selectedField === "quantity") {
                setOrder("asc");
              } else {
                setOrder("asc");
              }
=======
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              if (e.target.value !== "price") setOrder("asc"); // Reset order if not price
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54
            }}
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

<<<<<<< HEAD
        <div>
          <label className="block font-semibold mb-1">Order:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
=======
        {sortBy === "price" && (
          <div>
            <label className="block font-semibold mb-1">Order:</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full"
            >
              <option value="asc">High to Low</option>
              <option value="desc">Low to High</option>
            </select>
          </div>
        )}
>>>>>>> d10d35dd37d7964531d641c6a78b1a7868673b54
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet.id || sweet._id}
            className="bg-white shadow p-4 rounded-xl"
          >
            <h3 className="text-xl font-bold text-green-800">{sweet.name}</h3>
            <p className="text-sm">Category: {sweet.category}</p>
            <p className="text-sm">Price: ₹{sweet.price}</p>
            <p className="text-sm">Stock: {sweet.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortSweets;
