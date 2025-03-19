import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
        <p className="text-sm text-center mt-4">
          Forgot your password?{" "}
          <a href="/password-reset" className="text-blue-500 hover:underline">
            Reset it
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
