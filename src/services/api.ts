import axios from "axios";

// Set up default config for http requests
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;
