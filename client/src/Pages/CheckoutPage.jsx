import React from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import BillingInfo from '../Components/BillingInfo';
import PaymentInfo from '../Components/PaymentInfo';
import { useRecoilValue } from 'recoil';
import { emailAtom, fullnameAtom } from '../Recoil/userAtoms';
import { motion } from "framer-motion";

function CheckoutPage() {
  const userName = useRecoilValue(fullnameAtom);
  const userEmail = useRecoilValue(emailAtom);

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

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Nav />
      <motion.div 
        className='py-20 pt-40'
        variants={fadeIn('up', 'tween', 0.1, 0.4)}
      >
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeIn('up', 'tween', 0.2, 0.4)}
        >
          <motion.p 
            className="text-coral-red text-3xl font-semibold text-left font-montserrat"
            variants={fadeIn('right', 'tween', 0.3, 0.4)}
          >
            Checkout
          </motion.p>
          <motion.div 
            className='flex flex-col sm:flex-row justify-between'
            variants={fadeIn('up', 'tween', 0.4, 0.4)}
          >
            <motion.div 
              className="sm:w-1/2"
              variants={fadeIn('right', 'tween', 0.5, 0.4)}
            >
              <BillingInfo userEmail={userEmail} userName={userName} />
            </motion.div>
            <motion.div 
              className="sm:w-1/2 mt-8 sm:mt-0"
              variants={fadeIn('left', 'tween', 0.6, 0.4)}
            >
              <PaymentInfo />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 'tween', 0.7, 0.4)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  );
}

export default CheckoutPage;
