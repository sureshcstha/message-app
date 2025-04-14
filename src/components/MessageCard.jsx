import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MessageCard = ({ message, copiedMessageId, openModal, handleCopy, showEdit = true, showDelete = true, showCopy = true, user, toggleLikeMessage }) => {
  const isLiked = message.hasLiked;

  const handleLikeClick = () => {
    toggleLikeMessage(message._id);
  };

  return (
    <li className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4">
      <p className="text-lg">{message.message}</p>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Like/Unlike Button */}
          {user && (
            <button
              onClick={handleLikeClick}
              className="px-2 py-1 rounded-full"
              title={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 inline" />
              ) : (
                <FaRegHeart className="text-gray-400 inline" />
              )}
              <span className="ml-2">{message.likedBy.length}</span>
            </button>
          )}

          {showEdit && (
            <Link
              to={`/admin/edit/${message._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </Link>
          )}
          {user?.role === "superadmin" && showDelete && (
            <button
              onClick={() => openModal(message._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>

          {showCopy && (
            <button
              onClick={() => handleCopy(message.message, message._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              {copiedMessageId === message._id ? 'Copied!' : 'Copy'}
            </button>
          )}
      </div>
    </li>
  );
};

export default MessageCard;
