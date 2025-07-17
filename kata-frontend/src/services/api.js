// src/services/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api", // your backend URL
  baseURL: "/api",
});

export default api;
