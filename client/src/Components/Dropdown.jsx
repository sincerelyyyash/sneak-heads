import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../Recoil/userAtoms';
import { Logout } from '../Api/UserApi';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(loginState);

  const handleLogout = async () => {
    try {
      await Logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute center-0  w-48 bg-white 
    rounded-lg shadow-lg flex flex-col p-1 font-montserrat 
    leading-normal text-lg items-center text-slate-gray">
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
              <button onClick={() => navigate('/profile')}>Profile Settings</button>
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
    </div>
  );
};

export default DropdownMenu;
