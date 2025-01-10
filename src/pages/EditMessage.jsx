import { useState, useEffect } from 'react';

const EditMessage = ({ messageId, categories, fetchCategories, updateMessage, fetchMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (messageId) {
      fetchMessage(messageId);
    }
  }, [fetchCategories, fetchMessage, messageId]);

  useEffect(() => {
    if (messageId) {
      // Assuming fetchMessage returns the message data
      const message = fetchMessage(messageId);
      setMessageText(message.message || '');
      setSelectedCategory(message.category || '');
    }
  }, [messageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!messageText.trim() || !selectedCategory) {
      alert('Please enter a message text and select a category');
      return;
    }

    const updatedMessage = {
      message: messageText.trim(),
      category: selectedCategory,
    };

    setIsLoading(true);

    try {
      await updateMessage(messageId, updatedMessage);
      alert('Message updated successfully!');
      setMessageText('');
      setSelectedCategory('');
    } catch (error) {
      alert('Failed to update message. Check console for details.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md pt-28">
      <h1 className="text-xl font-bold mb-4">Edit Message</h1>
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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
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
  );
};

export default EditMessage;
