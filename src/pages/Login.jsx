import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reset the auth state when the Login component mounts
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Check if email is verified from the URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "verified") {
      toast.success("Your email has been successfully verified! You can now log in.");
    } else if (status === "already_verified") {
      toast.info("Your email is already verified. You can log in.");
    } else if (status === "invalid") {
      toast.error("The verification link is invalid or expired.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>

        {isError && <p className="text-red-500 text-sm mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-center mt-4">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
