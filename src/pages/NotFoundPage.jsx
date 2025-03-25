import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <FaExclamationTriangle className='text-yellow-400 text-6xl mb-4 mx-auto' />
        <h1 className='text-5xl font-bold mb-4'>404 Not Found</h1>
        <p className='text-xl mb-5'>This page does not exist</p>
        <Link
          to='/'
          className='text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4'
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
