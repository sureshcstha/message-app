import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MessagesList from './pages/MessagesList';
import Admin from './pages/Admin';
import AddMessage from './pages/AddMessage';
import EditMessage from './pages/EditMessage';
import RandomMessage from './pages/RandomMessage';
import NotFoundPage from './pages/NotFoundPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import UserProfile from './pages/UserProfile';
import useMessages from './hooks/useMessages';
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./features/auth/authService";

const App = () => {
  useEffect(() => {
    const refreshOnLoad = async () => {
      try {
        await authService.refreshAccessToken();
      } catch (err) {
        console.error("Token refresh failed on load", err);
      } 
    };
  
    refreshOnLoad();
  }, []);

  const messageAPI = useMessages();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MessagesList {...messageAPI} />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["editor", "admin", "superadmin"]} />}>
            <Route path="/admin" element={<Admin {...messageAPI} />} />
            <Route path="/admin/edit/:messageId" element={<EditMessage {...messageAPI} />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["contributor", "editor", "admin", "superadmin"]} />}>
            <Route path="/admin/add" element={<AddMessage {...messageAPI} />} />
          </Route>
          <Route path="/random-message" element={<RandomMessage fetchRandomMessage={messageAPI.fetchRandomMessage} />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />

          <Route element={<ProtectedRoute allowedRoles={["guest", "contributor", "editor", "admin", "superadmin"]} />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
