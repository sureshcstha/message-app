import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logoutUser, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message, passwordChanged } = useSelector((state) => state.auth);
  const email = user?.email; 

  useEffect(() => {
    // Reset state on component mount
    dispatch(reset());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("User not logged in.");
      return;
    }

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous error
    dispatch(changePassword({ email, currentPassword: formData.currentPassword , newPassword: formData.newPassword }));
  };

  useEffect(() => {
    if (passwordChanged) {
        toast.success("Your password has been changed. Please log in.");

        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });

        setTimeout(() => {
          dispatch(logoutUser());
          navigate("/login");
        }, 5000); 
      }
  }, [passwordChanged, dispatch, navigate]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Update Password</h2>

        {passwordChanged && (
          <p className="text-green-600 text-sm mb-4">
            ✅ Password update successful! Redirecting to login...
          </p>
        )}

        {isError && <p className="text-red-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Current Password
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            New Password
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </label>

          <label className="block mb-2 mt-4">
            Confirm New Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
