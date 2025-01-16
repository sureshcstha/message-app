import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageCard from '../components/MessageCard';
import CategoryList from '../components/CategoryList';
import { toast } from 'react-toastify';
import { capitalize } from '../utils/helpers';
import Spinner from '../components/Spinner';

const MessagesList = ({ messages, fetchAllMessages, deleteMessage, categories, fetchCategories, fetchMessagesByCategory  }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedMessageId, setCopiedMessageId] = useState(null); // Store the copied message's ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCategories()]);
        if (activeCategory === 'all') {
          await fetchAllMessages();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after completion
      }
    };
  
    fetchData();
  }, [fetchAllMessages, fetchCategories, activeCategory]);

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      fetchAllMessages(); // Fetch all messages if 'All' is clicked
    } else {
      fetchMessagesByCategory(category); // Fetch messages for the selected category
    }
    setActiveCategory(category);
  };

  const openModal = (messageId) => {
    setMessageToDelete(messageId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
      toast.success('Message deleted successfully.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMessageToDelete(null);
  };

  const handleCopy = (message, messageId) => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setCopiedMessageId(messageId); // Set the copied message's ID
        setTimeout(() => setCopiedMessageId(null), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  const categoryHeading = useMemo(() => {
    return activeCategory && activeCategory !== 'all'
      ? `${capitalize(activeCategory)} Messages`
      : 'All Messages';
  }, [activeCategory]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
        <p className="mt-4 text-gray-500">Loading messages, please wait...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="mb-4 flex items-center space-x-4">
        <Link
          to="/add"
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-600"
        >
          Add New Message
        </Link>
        <Link
          to="/random-message"
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-600"
        >
          Get Random Message
        </Link>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        {categories.length > 0 ? (
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            handleClick={handleCategoryClick}
          />
        ) : (
          <p className="text-gray-500 italic">No categories available.</p>
        )}
      </div>

      <h1 className="text-2xl font-semibold mb-6">
        {categoryHeading}
      </h1>
      {messages.length > 0 ? (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            copiedMessageId={copiedMessageId}
            openModal={openModal}
            handleCopy={handleCopy}
        />
        ))}
      </ul>
      ) : (
        <p className="text-gray-500 italic">No messages found for this category.</p>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Modal Component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={handleModalClose}
        title="Are you sure you want to delete this message?"
      />
    </div>
  );
};

export default MessagesList;
