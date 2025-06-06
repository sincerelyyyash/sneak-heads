import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SignIn } from '../Api/UserApi';
import { emailAtom, passwordAtom } from '../Recoil/userAtoms';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function Signin() {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration: duration || 0.5,
        ease: 'easeOut',
      },
    },
  });

  const successToast = (message) => {
    toast.success(message);
  };
  const failureToast = (message) => {
    toast.error(message);
  };

  const handleSignIn = async (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await SignIn(email, password);
      successToast("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      failureToast("Login Failed!");
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
        variants={fadeIn('down', 'tween', 0.2, 0.5)}
      >
        <Nav />
      </motion.section>
      <motion.div 
        className='flex justify-center py-20 pt-36'
        variants={fadeIn('up', 'tween', 0.3, 0.5)}
      >
        <motion.div 
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-5 shadow-2xl mt-10 rounded-lg"
          variants={fadeIn('up', 'tween', 0.4, 0.5)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="space-y-2">
            <motion.div 
              className='flex flex-col px-10 py-10'
              variants={fadeIn('up', 'tween', 0.5, 0.5)}
            >
              <motion.h3 
                className='flex justify-center text-coral-red text-4xl font-bold'
                variants={fadeIn('up', 'tween', 0.6, 0.5)}
              >
                Sign In
              </motion.h3>
              <motion.p 
                className='flex justify-center mt-4 text-gray-500 text-xl'
                variants={fadeIn('up', 'tween', 0.7, 0.5)}
              >
                Enter your credentials to login
              </motion.p>

              <motion.p 
                className='mt-5 font-bold text-lg'
                variants={fadeIn('up', 'tween', 0.8, 0.5)}
              >
                Email
              </motion.p>
              <motion.input
                type='email'
                name="email"
                id="email"
                placeholder='tony@example.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
                variants={fadeIn('up', 'tween', 0.9, 0.5)}
                whileFocus={{ scale: 1.02 }}
              />

              <motion.p 
                className='mt-5 font-bold text-lg'
                variants={fadeIn('up', 'tween', 1, 0.5)}
              >
                Password
              </motion.p>
              <motion.input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
                variants={fadeIn('up', 'tween', 1.1, 0.5)}
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
                onClick={() => handleSignIn(email, password)}
                className='mt-5 bg-white text-coral-red border border-coral-red hover:text-white 
                hover:bg-coral-red font-bold text-xl h-12 rounded-lg'
                variants={fadeIn('up', 'tween', 1.2, 0.5)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.div 
                className='flex flex-row mt-4 justify-center gap-1'
                variants={fadeIn('up', 'tween', 1.3, 0.5)}
              >
                <p>Don't have an account?</p>
                <motion.button
                  className='font-bold underline text-coral-red'
                  onClick={() => navigate("/signup")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Sign-Up
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pb-8 bg-black"
        variants={fadeIn('up', 'tween', 1.4, 0.5)}
      >
        <Footer />
      </motion.section>
      <ToastContainer />
    </motion.div>
  );
}

export default Signin;
