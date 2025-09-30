import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [linkInvalid, setLinkInvalid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, isError, message, passwordChanged } = useSelector((state) => state.auth);

  useEffect(() => {
    // Reset state on component mount
    dispatch(reset());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous error
    dispatch(resetPassword({ token, newPassword: formData.newPassword }));
  };

  useEffect(() => {
    if (passwordChanged) {
        toast.success("Password reset successful!");
        setShowSuccess(true);

        setTimeout(() => {
            navigate("/login");
            dispatch(reset());
        }, 3000); 
    }

    if (isError && message?.toLowerCase().includes("token")) {
      setLinkInvalid(true);
    }
  }, [passwordChanged, isError, message, navigate, dispatch]);

  if (linkInvalid) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Reset Your Password</h1>
            <p className="text-gray-700 mb-6">This reset link is invalid or has expired.</p>
            <button
                onClick={() => navigate("/forgot-password")}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Request Another Reset
            </button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

        {showSuccess && (
          <p className="text-green-600 text-sm mb-4">
            ✅ Password reset successful! Redirecting to login...
          </p>
        )}

        {isError && !linkInvalid && <p className="text-red-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
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
            disabled={isLoading || showSuccess}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
