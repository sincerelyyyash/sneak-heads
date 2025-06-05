import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import PopularProductCard from '../Components/PopularProductCard'
import { useRecoilValue } from "recoil"
import { productDetails } from "../Recoil/productAtoms"
import { useGetProducts } from '../Api/ProductsApi';
import { motion } from "framer-motion";

function ProductsPage(){
  const { getProducts } = useGetProducts();
  useEffect(()=>{
    getProducts();
  }, []);

  const productsData = useRecoilValue(productDetails); 
  const products = productsData.data;

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

  const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });

  return (
    <motion.main 
      className="flex flex-col"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div>
        <Nav/>
      </div>
      <motion.div 
        className='p-10 m-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
        variants={fadeIn('up', 0.2)}
      >
        <motion.div 
          className="flex flex-col justify-start gap-5 pt-20"
          variants={fadeIn('up', 0.3)}
        >
          <h2 className="text-4xl font-palanquin font-bold">
            All <span className="text-coral-red">Popular</span> Products
          </h2>
        </motion.div>
        <motion.div 
          className="mt-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 sm:gap-6 gap-14"
          variants={staggerContainer(0.2, 0.1)}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={fadeIn('up', 0.2 * index)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PopularProductCard 
                productId={product._id}
                {...product}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 0.4)}
      >
        <Footer/>
      </motion.section>
    </motion.main>
  )
}

export default ProductsPage
