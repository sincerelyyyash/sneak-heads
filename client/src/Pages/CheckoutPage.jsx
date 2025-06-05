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

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Nav />
      <motion.div 
        className='py-20 pt-40'
        variants={fadeIn('up', 0.2)}
      >
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeIn('up', 0.3)}
        >
          <motion.p 
            className="text-coral-red text-3xl font-semibold text-left font-montserrat"
            variants={fadeIn('right', 0.4)}
          >
            Checkout
          </motion.p>
          <motion.div 
            className='flex flex-col sm:flex-row justify-between'
            variants={fadeIn('up', 0.5)}
          >
            <motion.div 
              className="sm:w-1/2"
              variants={fadeIn('right', 0.6)}
            >
              <BillingInfo userEmail={userEmail} userName={userName} />
            </motion.div>
            <motion.div 
              className="sm:w-1/2 mt-8 sm:mt-0"
              variants={fadeIn('left', 0.6)}
            >
              <PaymentInfo />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 0.7)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  );
}

export default CheckoutPage;
