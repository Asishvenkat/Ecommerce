import axios from "axios";

const BASE_URL = "https://ecommerce-backend-xkz7.onrender.com/api/";

// Safe token extraction
let TOKEN = null;
try {
  const persistedRoot = JSON.parse(localStorage.getItem("persist:root"));
  const user = persistedRoot ? JSON.parse(persistedRoot.user) : null;
  TOKEN = user?.currentUser?.accessToken;
} catch (err) {
  console.error("Token retrieval failed:", err);
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { token: `Bearer ${TOKEN}` } : {},
});
