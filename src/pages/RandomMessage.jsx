import { useEffect, useState } from 'react';
import { MdOutlineMessage } from "react-icons/md";
import { capitalize } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RandomMessage = ({ fetchRandomMessage }) => {
  const [randomMessage, setRandomMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch a random message on page load
  useEffect(() => {
    getRandomMessage();
  }, []);

  // Function to fetch and set a random message
  const getRandomMessage = async () => {
    try {
        const data = await fetchRandomMessage();
        setRandomMessage(data?.data || null);
    } catch (error) {
        console.error('Error fetching random message:', error);
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
        <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">Random Message Generator</h1>
            <button
                onClick={getRandomMessage}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
            >
                <MdOutlineMessage className='text-2xl transform -scale-x-100'/>
                <span className='text-lg'>Get Another Random Message</span>
            </button>

            <div className="bg-white p-4 rounded-lg shadow-md relative">
                {randomMessage ? (
                    <>
                        <div className="absolute top-2 left-2 bg-red-700 text-white text-sm px-3 py-1 rounded-full">
                            {capitalize(randomMessage.category)}
                        </div>
                        <p className="text-lg mt-6">{randomMessage.message}</p>
                    </>
                    ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    </div>

    
  );
};

export default RandomMessage;
