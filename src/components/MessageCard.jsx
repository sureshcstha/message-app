import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaCopy, FaCheck } from 'react-icons/fa';

const MessageCard = ({ message, copiedMessageId, openModal, handleCopy, showEdit = true, showDelete = true, showCopy = true, user, toggleLikeMessage }) => {
  const isLiked = message.hasLiked;
  const [isBouncing, setIsBouncing] = useState(false);

  const handleLikeClick = () => {
    setIsBouncing(true);
    toggleLikeMessage(message._id);
    setTimeout(() => setIsBouncing(false), 300);
  };

  return (
    <li className="bg-white p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col space-y-4">
      <p className="font-serif text-2xl sm:text-3xl text-center leading-relaxed">&ldquo;{message.message}&rdquo;</p>

      <hr className="border-t border-gray-300" />

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
                <FaHeart className={`text-red-500 inline text-xl ${isBouncing ? 'animate-bounce-once' : ''}`} />
              ) : (
                <FaRegHeart className={`text-gray-400 inline text-xl ${isBouncing ? 'animate-bounce-once' : ''}`} />
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
              className="bg-sky-700 text-white px-2 py-2 rounded-lg hover:bg-sky-800 flex items-center"
            >
              {copiedMessageId === message._id ? (
                <>
                  <FaCheck className="mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <FaCopy className="mr-1" />
                  Copy
                </>
              )}
            </button>
          )}
      </div>
    </li>
  );
};

export default MessageCard;
