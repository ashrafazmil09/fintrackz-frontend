import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
  // Save JWT
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_BASE}/auth/register`, { username, email, password });
  return response.data;
};

// Axios instance with JWT
export const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // read fresh every time
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
