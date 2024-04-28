import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../Recoil/userAtoms';
import { Logout } from '../Api/UserApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(loginState);

  const successToast = (message) => {
    toast.success(message);
  };
  const failureToast = (message) => {
    toast.error(message);
  };

  const handleLogout = async () => {
    try {
      await Logout();
      window.location.reload();
      successToast("Logout Successful!");
    } catch (error) {
      failureToast("Could not log out!")
    }
  };

  return (
    <div className={`absolute bg-white rounded-lg shadow-lg font-montserrat leading-normal text-lg text-slate-gray 
      ${window.innerWidth < 768 ? 'right-2' : 'right-0'}  w-48 p-1 flex flex-col items-center`}>
      <ul>
        {isLoggedIn ? (
          <>
            <li className='mt-2'>
              <button onClick={() => navigate('/orders')}>My Orders</button>
            </li>
            <li className='mt-2'>
              <button onClick={() => navigate('/cart')}>View Cart</button>
            </li>
            <li className='mt-2'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => navigate('/signin')}>Login</button>
            </li>
            <li>
              <button onClick={() => navigate('/signup')}>Sign Up</button>
            </li>
          </>
        )}
      </ul>
      <ToastContainer/>
    </div>
  );
};

export default DropdownMenu;
