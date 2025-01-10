import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MessagesList = ({ messages, fetchAllMessages, deleteMessage, categories, fetchCategories, fetchMessagesByCategory  }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null); // Store the copied message's ID

  useEffect(() => {
    fetchAllMessages();
    fetchCategories();
  }, [fetchAllMessages, fetchCategories]);

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      fetchAllMessages(); // Fetch all messages if 'All' is clicked
    } else {
      fetchMessagesByCategory(category); // Fetch messages for the selected category
    }
    setActiveCategory(category);
  };

  // Function to capitalize the first letter of the category
  const capitalize = (category) => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const handleCopy = (message, messageId) => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setCopiedMessageId(messageId); // Set the copied message's ID
        setTimeout(() => setCopiedMessageId(null), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="mb-4 flex items-center space-x-4">
        <Link
          to="/add"
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-600"
        >
          Add New Message
        </Link>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {/* "All" category button */}
          <li
            onClick={() => handleCategoryClick('all')}
            className={`cursor-pointer ${activeCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg`}
          >
            all
          </li>
          {/* Category buttons */}
          {categories.map((category, index) => (
            <li key={index} value={category} onClick={() => handleCategoryClick(category)} className={`cursor-pointer ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg`}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-6">
        {activeCategory && activeCategory !== 'All' ? `${capitalize(activeCategory)} Messages` : 'All Messages'}
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map((message) => (
          <li
            key={message._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4"
          >
            <p className="text-lg">{message.message}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Link
                  to={`/edit/${message._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMessage(message._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
              
              <button
                onClick={() => handleCopy(message.message, message._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                {copiedMessageId === message._id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
