import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailAtom, fullnameAtom, passwordAtom } from '../Recoil/userAtoms';
import { SignUp } from '../Api/UserApi.jsx';
import Footer from '../sections/Footer.jsx';
import Nav from '../Components/Nav.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullName] = useRecoilState(fullnameAtom);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState('');

  const successToast = (message) => {
    toast.success(message);
  };
  const failureToast = (message) => {
    toast.error(message);
  };

  const handleSignUp = async () => {
    if (!fullname || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one letter and one number');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await SignUp(email, fullname, password);
      successToast("Signing up Successful!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      failureToast("Signup Failed!");
      setError('Error signing up. Please try again later.');
    }
  };

  return (
    <div>
      <Nav/>
      <div className='flex justify-center py-20 pt-36'>
      <div className="w-full p-5 shadow-2xl lg:max-w-lg mt-10 rounded-lg">
        <div className="space-y-2">
          <div className='flex flex-col px-10 py-10'>
            <h3 className='flex justify-center text-coral-red text-4xl font-bold'>
              Sign Up
            </h3>
            <p className='flex justify-center mt-4 text-gray-500 text-xl'>
              Enter your information to create an account
            </p>
            <p className='mt-5 font-bold text-lg'>Full Name</p>
            <input
              type="text"
              name="fullName"
              id="fullname"
              placeholder='Tony Stark'
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
            <p className='mt-5 font-bold text-lg'>Email</p>
            <input
              type='email'
              name="email"
              id="email"
              placeholder='tony@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
            <p className='mt-5 font-bold text-lg'>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              onClick={handleSignUp}
              className='mt-5 bg-coral-red text-white font-bold text-xl h-12 rounded-lg'
            >
              Sign Up
            </button>
            <div className='flex flex-row mt-4 justify-center gap-1'>
              <p>Already have an account?</p>
              <button className='font-bold underline text-coral-red' onClick={() => navigate("/signin")}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <section className="padding-x padding-t pb-8 bg-black">
        <Footer />
      </section>
      <ToastContainer />
    </div>
  );
}

export default Signup;
