import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {isSuccess && submitted ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Reset Your Password</h2>
            <p className="text-gray-600 mt-2">
              You will receive a password reset email soon.
            </p>
            <p className="text-gray-600 mt-1">
              Follow the link in the email to reset your password.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Reset Your Password</h2>
            <p className="text-gray-600 mt-2">
              Enter your email address and we&apos;ll send you a password reset link.
            </p>

            {isError && <p className="text-red-500 mt-2">{message}</p>}

            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg mt-1"
                required
              />

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
