import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { CustomerReviews, Footer, Hero, 
    PopularProducts, Services, SpecialOffer,
  Subscribe,SuperQuality } from "../sections";
import Nav from "../Components/Nav";
import { useGetProducts } from '../Api/ProductsApi';
import { fetchUser } from '../Api/UserApi';

// Animation variants
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

function Homepage() {
  const { getProducts } = useGetProducts();
  const {getUserDetails} = fetchUser();
  
  useEffect(()=>{
    getProducts();
    getUserDetails();
  }, []);
  
  return (
    <motion.main 
      className="relative"
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Nav/> 
      <motion.section 
        className="xl:pl-8"
        variants={fadeIn('up', 'tween', 0.1, 0.4)}
      >
        <Hero/>
      </motion.section>

      <motion.section 
        className="padding"
        variants={fadeIn('up', 'tween', 0.2, 0.4)}
      >
        <PopularProducts/>
      </motion.section>

      <motion.section 
        className="padding"
        variants={fadeIn('up', 'tween', 0.3, 0.4)}
      >
        <SuperQuality/>
      </motion.section>

      <motion.section 
        className="padding-x py-10"
        variants={fadeIn('up', 'tween', 0.4, 0.4)}
      >
        <Services/>
      </motion.section>

      {/* <section className="padding">
        <SpecialOffer/>
      </section> */}

      <motion.section 
        className="padding bg-pale-blue"
        variants={fadeIn('up', 'tween', 0.5, 0.4)}
      >
        <CustomerReviews/>
      </motion.section>

      <motion.section 
        className="padding-x sm:py-32 py-16 w-full"
        variants={fadeIn('up', 'tween', 0.6, 0.4)}
      >
        <Subscribe/>
      </motion.section>

      <motion.section 
        className="padding-x padding-t pb-8 bg-black"
        variants={fadeIn('up', 'tween', 0.7, 0.4)}
      >
        <Footer/>
      </motion.section>
    </motion.main>
  )
}

export default Homepage