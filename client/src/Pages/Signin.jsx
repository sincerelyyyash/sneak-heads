import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SignIn } from '../Api/UserApi';
import { emailAtom, passwordAtom } from '../Recoil/userAtoms';
import PopUpBox from '../Components/PopUpBox';

function Signin() {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await SignIn(email, password);
      navigate("/");
      PopUpBox("Sign in sucessfull")
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="w-full p-5 shadow-2xl lg:max-w-lg mt-10 rounded-lg">
        <div className="space-y-2">
          <div className='flex flex-col px-10 py-10'>
            <h3 className='flex justify-center text-coral-red text-4xl font-bold'>
              Sign In
            </h3>
            <p className='flex justify-center mt-4 text-gray-500 text-xl'>
              Enter your credentials to login
            </p>

            <p className='mt-5 font-bold text-lg'>Email</p>
            <input
              type='email'
              name="email"
              id="email"
              placeholder='tony@example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />

            <p className='mt-5 font-bold text-lg'>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
              onClick={() => handleSignIn(email, password)}
              className='mt-5 bg-coral-red text-white border-coral-red font-bold text-xl h-12 rounded-lg'
            >
              Sign In
            </button>
            <div className='flex flex-row mt-4 justify-center gap-1'>
              <p>Don't have an account?</p>
              <button
                className='font-bold underline text-coral-red'
                onClick={() => navigate("/signup")}
              >
                Sign-Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
