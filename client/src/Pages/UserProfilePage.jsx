import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import { motion } from "framer-motion";

function UserProfilePage() {
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
      <motion.section 
        className='pb-12'
        variants={fadeIn('down', 0.2)}
      >
        <Nav />
      </motion.section>
      <motion.div 
        className='py-20 pt-40 h-screen'
        variants={fadeIn('up', 0.3)}
      >
        <motion.div 
          className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
          variants={fadeIn('up', 0.4)}
        >
          <motion.p 
            className="text-coral-red text-2xl font-semibold text-left font-montserrat"
            variants={fadeIn('up', 0.5)}
          >
            My Profile
          </motion.p>
        </motion.div>       
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 0.6)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  )
}

export default UserProfilePage