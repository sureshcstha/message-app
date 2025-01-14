import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MessagesList from './pages/MessagesList';
import AddMessage from './pages/AddMessage';
import EditMessage from './pages/EditMessage';
import RandomMessage from './pages/RandomMessage';
import NotFoundPage from './pages/NotFoundPage';
import useMessages from './hooks/useMessages';

const App = () => {
  const messageAPI = useMessages();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MessagesList {...messageAPI} />} />
          <Route path="/add" element={<AddMessage {...messageAPI} />} />
          <Route path="/edit/:messageId" element={<EditMessage {...messageAPI} />} />
          <Route path="/random-message" element={<RandomMessage fetchRandomMessage={messageAPI.fetchRandomMessage} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
