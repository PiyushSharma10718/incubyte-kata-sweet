import { useState, useEffect } from "react";
import api from "../services/api";

const SearchSweets = () => {
  const [searchType, setSearchType] = useState("name");
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  // Auto search on filter change
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      try {
        let query = {};

        if (searchType === "name") query.name = filters.name;
        if (searchType === "category") query.category = filters.category;
        if (searchType === "price") {
          if (filters.minPrice) query.minPrice = filters.minPrice;
          if (filters.maxPrice) query.maxPrice = filters.maxPrice;
        }

        const queryString = new URLSearchParams(query).toString();
        const res = await api.get(`/sweets/search?${queryString}`);
        setResults(res.data);
        setMessage(res.data.length === 0 ? "No matching sweets found." : "");
      } catch (err) {
        console.error("Search failed", err);
        setMessage("Error searching sweets.");
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [filters, searchType]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        🔍 Search Sweets
      </h2>

      {/* Step 1: Search type selector */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Choose search type:</label>
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setFilters({ name: "", category: "", minPrice: "", maxPrice: "" });
          }}
          className="border px-3 py-2 rounded-lg w-full"
        >
          <option value="name">Search by Name</option>
          <option value="category">Search by Category</option>
          <option value="price">Search by Price Range</option>
        </select>
      </div>

      {/* Step 2: Show relevant input fields based on searchType */}
      {searchType === "name" && (
        <input
          type="text"
          name="name"
          placeholder="Enter sweet name"
          value={filters.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg mb-6 w-full"
        />
      )}

      {searchType === "category" && (
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg mb-6 w-full"
        >
          <option value="">Select Category</option>
          <option value="dessert">Dessert</option>
          <option value="candy">Candy</option>
          <option value="chocolate">Chocolate</option>
          <option value="dryfruit">Dryfruit</option>
          <option value="traditional">Traditional</option>
        </select>
      )}

      {searchType === "price" && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            name="minPrice"
            min="0"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="number"
            name="maxPrice"
            min="0"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
      )}

      {/* Step 3: Display results */}
      {message && <p className="text-center text-gray-600">{message}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((sweet) => (
          <div key={sweet.id} className="bg-white shadow-md p-4 rounded-xl">
            <h3 className="text-xl font-bold text-purple-800">{sweet.name}</h3>
            <p className="text-sm">Category: {sweet.category}</p>
            <p className="text-sm">Price: ₹{sweet.price}</p>
            <p className="text-sm">Stock: {sweet.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSweets;
