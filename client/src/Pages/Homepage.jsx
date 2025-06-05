import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { CustomerReviews, Footer, Hero, 
    PopularProducts, Services, SpecialOffer,
  Subscribe,SuperQuality } from "../sections";
import Nav from "../Components/Nav";
import { useGetProducts } from '../Api/ProductsApi';
import { fetchUser } from '../Api/UserApi';

// Animation variants
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
        variants={fadeIn('up', 0.2)}
      >
        <Hero/>
      </motion.section>

      <motion.section 
        className="padding"
        variants={fadeIn('up', 0.4)}
      >
        <PopularProducts/>
      </motion.section>

      <motion.section 
        className="padding"
        variants={fadeIn('up', 0.6)}
      >
        <SuperQuality/>
      </motion.section>

      <motion.section 
        className="padding-x py-10"
        variants={fadeIn('up', 0.8)}
      >
        <Services/>
      </motion.section>

      {/* <section className="padding">
        <SpecialOffer/>
      </section> */}

      <motion.section 
        className="padding bg-pale-blue"
        variants={fadeIn('up', 1)}
      >
        <CustomerReviews/>
      </motion.section>

      <motion.section 
        className="padding-x sm:py-32 py-16 w-full"
        variants={fadeIn('up', 1.2)}
      >
        <Subscribe/>
      </motion.section>

      <motion.section 
        className="padding-x padding-t pb-8 bg-black"
        variants={fadeIn('up', 1.4)}
      >
        <Footer/>
      </motion.section>
    </motion.main>
  )
}

export default Homepage