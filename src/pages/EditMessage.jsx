import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const EditMessage = ({ fetchMessageById, categories, fetchCategories, updateMessage }) => {
  const { messageId } = useParams(); // Get messageId from the URL
  const [messageText, setMessageText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [localCategories, setLocalCategories] = useState(categories || []);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedCategories = localStorage.getItem('categories');
    if (cachedCategories) {
      setLocalCategories(JSON.parse(cachedCategories));
    } else {
      fetchCategories();
    }

    const fetchMessage = async () => {
      try {
        const message = await fetchMessageById(messageId); // Fetch message by ID
        setMessageText(message.message || ''); // Set message text
        setSelectedCategory(message.category || ''); // Set category
        setSelectedStatus(message.status || 'draft'); // Set the status
      } catch (error) {
        console.error(`Error fetching message with ID "${messageId}":`, error);
      }
    };

    if (messageId) fetchMessage();
  }, [fetchCategories, fetchMessageById, messageId]);

  useEffect(() => {
    if (categories.length > 0) {
      setLocalCategories(categories);
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous error messages
    setErrorMessage('');

    if (!messageText.trim() || !selectedCategory) {
      setErrorMessage('Please enter a message text and select a category.');
      return;
    }

    const updatedMessage = {
      message: messageText.trim(),
      category: selectedCategory,
      status: selectedStatus,
    };

    setIsLoading(true);

    try {
      await updateMessage(messageId, updatedMessage);
      toast.success('Message updated successfully!');
      setMessageText('');
      setSelectedCategory('');
    } catch (error) {
      setErrorMessage('Failed to add message. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pt-20'>
      <section>
        <div className='container m-auto py-6 px-6'>
          <button
            onClick={() => navigate(-1)}
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' />Go Back 
          </button>
        </div>
      </section>
      <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">

        <h1 className="text-xl font-bold mb-4">Edit Message</h1>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="messageText">
              Message Text
            </label>
            <textarea
              id="messageText"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Edit your message here..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              {localCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Update Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMessage;
