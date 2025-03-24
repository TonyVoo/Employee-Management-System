import axios from "axios";

import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

// Login and get JWT token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem("token", token); // Store token in localStorage
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Login failed");
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Get the current token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Decode token to get username
export const getUsername = () => {
  const token = getToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.sub; // 'sub' is typically the username in the JWT payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};