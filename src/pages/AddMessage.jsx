import { useState, useEffect } from 'react';

const AddMessage = ({ categories, fetchCategories, createMessage }) => {

  const [messageText, setMessageText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!messageText.trim() || !selectedCategory) {
      alert('Please enter a message text and select a category');
      return;
    }
  
    const newMessage = {
      message: messageText.trim(),
      category: selectedCategory,
    };

    setIsLoading(true);
  
    // console.log('Submitting payload:', newMessage);
  
    try {
      await createMessage(newMessage);
      alert('Message added successfully!');
      setMessageText('');
      setSelectedCategory('');
    } catch (error) {
      alert('Failed to add message. Check console for details.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md pt-28">
      <h1 className="text-xl font-bold mb-4">Add New Message</h1>
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
            placeholder="Enter your message here..."
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
          {isLoading ? 'Submitting...' : 'Add Message'}
        </button>
      </form>
    </div>
  );
};

export default AddMessage;
