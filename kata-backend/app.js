const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ✅ Shared sweets array
const sweets = [];
app.locals.sweets = sweets; // ✅ Expose to test via app.locals

// ✅ POST route
app.post("/api/sweets", (req, res) => {
  const { name, category, price, quantity } = req.body;
  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const sweet = { id: sweets.length + 1, name, category, price, quantity };
  sweets.push(sweet);
  res.status(201).json(sweet);
});

// ✅ DELETE route
app.delete("/api/sweets/:id", (req, res) => {
  const sweetId = parseInt(req.params.id);
  const index = sweets.findIndex((sweet) => sweet.id === sweetId);
  if (index === -1) {
    return res.status(404).json({ error: "Sweet not found" });
  }
  sweets.splice(index, 1);
  res.status(200).json({ message: "Sweet deleted" });
});

// ✅ VIEW all sweets
app.get("/api/sweets", (req, res) => {
  res.status(200).json(sweets);
});

// ✅ SEARCH sweets
app.get("/api/sweets/search", (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let result = app.locals.sweets || [];

  if (name) {
    result = result.filter((sweet) =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(
      (sweet) =>
        sweet.category &&
        sweet.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice || maxPrice) {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    result = result.filter((sweet) => sweet.price >= min && sweet.price <= max);
  }

  res.status(200).json(result);
});

// ✅ SORT sweets
app.get("/api/sweets/sort", (req, res) => {
  const { field = "name", order = "asc" } = req.query;

  const sorted = [...sweets].sort((a, b) => {
    if (field === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      const valA = (a[field] || "").toLowerCase();
      const valB = (b[field] || "").toLowerCase();
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    }
  });

  res.status(200).json(sorted);
});

app.post("/api/sweets/purchase", (req, res) => {
  const { id, quantity } = req.body;

  if (!id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const sweet = sweets.find((s) => s.id === id);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  if (sweet.quantity < quantity) {
    return res.status(400).json({ error: "Not enough stock available" });
  }

  sweet.quantity -= quantity;

  res.status(200).json({
    message: "Purchase successful",
    updatedSweet: sweet,
  });
});

app.post("/api/sweets/restock", (req, res) => {
  const { id, quantity } = req.body;

  if (!id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid restock quantity" });
  }

  const sweet = sweets.find((s) => s.id === id);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  sweet.quantity += quantity;

  res.status(200).json({
    message: "Restock successful",
    updatedSweet: sweet,
  });
});

module.exports = app;
