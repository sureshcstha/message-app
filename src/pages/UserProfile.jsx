import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { persistor } from "../app/store";

function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex flex-col items-center px-4">
      {/* Profile Card */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">User Profile</h1>

        <div>
          <h2 className="text-xl font-bold mb-2">Account Information</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          {user.lastName && (
            <p><strong>Last Name:</strong> {user.lastName}</p>
          )}
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        {/* Content Management Button */}
        {user && (user.role === "editor" || user.role === "admin" || user.role === "superadmin") && (
          <div>
            <h2 className="text-xl font-bold mb-2 mt-4">Admin</h2>
            <Link
                to="/admin"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
            >
                <MdManageAccounts className='text-2xl transform -scale-x-100'/>
                <span className='text-lg'>Content Management</span>
            </Link>
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold mb-3 mt-4">Password and Security</h2>
          <Link
            to="/change-password"
            className="text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2"
          >
            Change Password
          </Link>
        </div>
      </div>
        <button
          onClick={handleLogout}
          className="mt-4 text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2"
        >
          Log Out
        </button>
    </div>
  );
}

export default UserProfile;