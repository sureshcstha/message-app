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


let isRefreshing = false;
let failedQueue = [];

// Process and reject all queued requests if token refresh fails
const processQueue = (error) => {
  failedQueue.forEach(prom => prom.reject(error));
  failedQueue = [];
};

// --- Axios 401 Interceptor ---
// Catches 401 errors, refreshes the access token, and retries the failed request once
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Prevent retrying authentication-related requests (login, signup, change-password, refresh)
    const isAuthRequest =
      originalRequest.url.includes("signup") ||
      originalRequest.url.includes("login") ||
      originalRequest.url.includes("change-password") ||
      originalRequest.url.includes("refresh-token");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      if (isRefreshing) {
        // Queue the request until token refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(() => axios(originalRequest)) // Retry the original request with the new token
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken(); // Refresh the access token

        // Resolve all queued requests after token is refreshed
        failedQueue.forEach(prom => prom.resolve());
        failedQueue = []; 

        return axios(originalRequest); // Retry the original request
      } catch (err) {
        // Reject all queued requests if token refresh fails
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


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
  const response = await axios.put(API_URL + "change-password", { email, currentPassword, newPassword });
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};

const authService = { signup, login, forgotPassword, resetPassword, changePassword, logout, refreshAccessToken };

export default authService;
