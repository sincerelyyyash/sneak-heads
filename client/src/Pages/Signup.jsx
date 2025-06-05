import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailAtom, fullnameAtom, passwordAtom } from '../Recoil/userAtoms';
import { SignUp } from '../Api/UserApi.jsx';
import Footer from '../sections/Footer.jsx';
import Nav from '../Components/Nav.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullName] = useRecoilState(fullnameAtom);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState('');

  const fadeIn = (direction, delay) => ({
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      opacity: 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  });

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
      }, 1500);
    } catch (error) {
      failureToast("Signup Failed!");
      setError('Error signing up. Please try again later.');
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.section 
        className='pb-12'
        variants={fadeIn('down', 0.2)}
      >
        <Nav />
      </motion.section>
      <motion.div 
        className='flex justify-center py-20 pt-36'
        variants={fadeIn('up', 0.3)}
      >
        <motion.div 
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-5 shadow-2xl mt-10 rounded-lg"
          variants={fadeIn('up', 0.4)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="space-y-2">
            <motion.div 
              className='flex flex-col px-10 py-10'
              variants={fadeIn('up', 0.5)}
            >
              <motion.h3 
                className='flex justify-center text-coral-red text-4xl font-bold'
                variants={fadeIn('up', 0.6)}
              >
                Sign Up
              </motion.h3>
              <motion.p 
                className='flex justify-center mt-4 text-gray-500 text-xl'
                variants={fadeIn('up', 0.7)}
              >
                Enter your information to create an account
              </motion.p>
              <motion.p 
                className='mt-5 font-bold text-lg'
                variants={fadeIn('up', 0.8)}
              >
                Full Name
              </motion.p>
              <motion.input
                type="text"
                name="fullName"
                id="fullname"
                placeholder='Tony Stark'
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
                variants={fadeIn('up', 0.9)}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.p 
                className='mt-5 font-bold text-lg'
                variants={fadeIn('up', 1)}
              >
                Email
              </motion.p>
              <motion.input
                type='email'
                name="email"
                id="email"
                placeholder='tony@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
                variants={fadeIn('up', 1.1)}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.p 
                className='mt-5 font-bold text-lg'
                variants={fadeIn('up', 1.2)}
              >
                Password
              </motion.p>
              <motion.input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
                variants={fadeIn('up', 1.3)}
                whileFocus={{ scale: 1.02 }}
              />
              {error && (
                <motion.p 
                  className="text-red-500 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                onClick={handleSignUp}
                className='mt-5 bg-white text-coral-red border border-coral-red hover:text-white 
                hover:bg-coral-red font-bold text-xl h-12 rounded-lg'
                variants={fadeIn('up', 1.4)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
              <motion.div 
                className='flex flex-row mt-4 justify-center gap-1'
                variants={fadeIn('up', 1.5)}
              >
                <p>Already have an account?</p>
                <motion.button 
                  className='font-bold underline text-coral-red' 
                  onClick={() => navigate("/signin")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Login
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pb-8 bg-black"
        variants={fadeIn('up', 1.6)}
      >
        <Footer />
      </motion.section>
      <ToastContainer />
    </motion.div>
  );
}

export default Signup;
