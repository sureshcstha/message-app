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
import useMessages from './hooks/useMessages';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const messageAPI = useMessages();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MessagesList {...messageAPI} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin {...messageAPI} />} allowedRoles={["editor", "admin", "superadmin"]} />} />
          <Route path="/admin/add" element={<ProtectedRoute element={<AddMessage {...messageAPI} />} allowedRoles={["contributor", "editor", "admin", "superadmin"]} />} />
          <Route path="/admin/edit/:messageId" element={<ProtectedRoute element={<EditMessage {...messageAPI} />} allowedRoles={["editor", "admin", "superadmin"]} />} />
          <Route path="/random-message" element={<RandomMessage fetchRandomMessage={messageAPI.fetchRandomMessage} />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<ForgotPassword />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
