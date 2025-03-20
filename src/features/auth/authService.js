import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/users/`;

axios.defaults.withCredentials = true; // Enables cookies in requests

// Signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL + "signup", userData);
    return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Forgot password
const forgotPassword = async (email) => {
    const response = await axios.post(API_URL + "forgot-password", { email });
    return response.data;
};

// Reset password
const resetPassword = async (token, newPassword) => {
  const response = await axios.post(API_URL + "reset-password", { token, newPassword });
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};

const authService = { signup, login, forgotPassword, resetPassword, logout };

export default authService;
