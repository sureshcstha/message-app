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
import useMessages from './hooks/useMessages';

const App = () => {
  const messageAPI = useMessages();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MessagesList {...messageAPI} />} />
          <Route path="/admin" element={<Admin {...messageAPI} />} />
          <Route path="/admin/add" element={<AddMessage {...messageAPI} />} />
          <Route path="/admin/edit/:messageId" element={<EditMessage {...messageAPI} />} />
          <Route path="/random-message" element={<RandomMessage fetchRandomMessage={messageAPI.fetchRandomMessage} />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
