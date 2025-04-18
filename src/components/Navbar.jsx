import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoPersonCircleSharp } from "react-icons/io5";
import { PiFlowerTulipDuotone } from "react-icons/pi";

const Navbar = () => {
  const user = useSelector((state) => state.auth?.user);
  
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='fixed top-0 z-50 bg-indigo-700 border-b border-indigo-500 w-full'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <div className="bg-white rounded-full p-1">
                <PiFlowerTulipDuotone className="text-red-500 text-4xl" />
              </div>
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                LuvNotes
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/random-message' className={linkClass}>
                  Random Message
                </NavLink>
                {/* {user && (user.role === "editor" || user.role === "admin" || user.role === "superadmin") && (
                  <NavLink to="/admin" className={linkClass}>
                    Content Management
                  </NavLink>
                )} */}

                {user ? (
                  <NavLink
                  to='/profile'
                  className='flex items-center justify-center text-4xl text-white'
                >
                  <IoPersonCircleSharp />
                </NavLink>
                ) : (
                  <NavLink to='/login' className='text-white bg-red-600 hover:bg-red-700 rounded-md px-3 py-2'>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
