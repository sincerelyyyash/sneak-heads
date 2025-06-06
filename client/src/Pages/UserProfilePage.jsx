import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import { motion } from "framer-motion";

function UserProfilePage() {
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
      <motion.section 
        className='pb-12'
        variants={fadeIn('down', 'tween', 0.2, 0.5)}
      >
        <Nav />
      </motion.section>
      <motion.div 
        className='py-20 pt-40 h-screen'
        variants={fadeIn('up', 'tween', 0.3, 0.5)}
      >
        <motion.div 
          className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
          variants={fadeIn('up', 'tween', 0.4, 0.5)}
        >
          <motion.p 
            className="text-coral-red text-2xl font-semibold text-left font-montserrat"
            variants={fadeIn('up', 'tween', 0.5, 0.5)}
          >
            My Profile
          </motion.p>
        </motion.div>       
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 'tween', 0.6, 0.5)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  )
}

export default UserProfilePage