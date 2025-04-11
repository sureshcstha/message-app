import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/users/`;

axios.defaults.withCredentials = true; // Enables cookies in requests


// Refresh token function
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(API_URL + "refresh-token");
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token", error);

    // If refresh token is invalid or expired, log out the user
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      await logout(); 
      window.location.reload(); 
    }

    throw error;
  }
};

// Call this function every 29 minutes (before token expires)
setInterval(refreshAccessToken, 29 * 60 * 1000);


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

// Change password
const changePassword = async (email, currentPassword, newPassword) => {
  const response = await axios.post(API_URL + "change-password", { email, currentPassword, newPassword });
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};

const authService = { signup, login, forgotPassword, resetPassword, changePassword, logout, refreshAccessToken };

export default authService;
