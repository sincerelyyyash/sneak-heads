import React, { useEffect } from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import CartTile from '../Components/CartTile';
import { useRecoilValue } from 'recoil';
import { cartItem, cartTotal } from '../Recoil/cartAtom';
import { fetchCartItems } from '../Api/CartsApi';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import { motion } from "framer-motion";

function Cart() {
  const { getAllProductsFromCart } = fetchCartItems();

  useEffect(() => {
    getAllProductsFromCart();
  }, []);

  const cartItems = useRecoilValue(cartItem);
  const cartTotalValue = useRecoilValue(cartTotal);
  const cart = Array.isArray(cartItems) ? cartItems : [];
  const isEmpty = cart.length === 0;
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
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Nav />
      <motion.div 
        className='py-20 pt-40'
        variants={fadeIn('up', 'tween', 0.2, 0.4)}
      >
        {isEmpty ? (
          <motion.div 
            className="flex justify-center items-center h-screen flex-col"
            variants={fadeIn('up', 'tween', 0.3, 0.4)}
          >
            <p className="text-3xl font-montserrat text-gray-500">Your cart is empty ;(</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                label='Shop Now'
                square={true}
                onClick={()=>{
                  navigate("/products")
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={fadeIn('up', 'tween', 0.2, 0.4)}
          >
            <motion.p 
              className="text-coral-red text-2xl font-semibold text-left font-montserrat"
              variants={fadeIn('right', 'tween', 0.3, 0.4)}
            >
              Shopping Cart
            </motion.p>
            <motion.div 
              className='flex justify-end mb-4'
              variants={fadeIn('left', 'tween', 0.3, 0.4)}
            >
              <Button 
                square={true} 
                label={"Checkout"} 
                onClick={() => {
                  navigate('/checkout');
                }} 
              />
            </motion.div>
            <motion.section
              variants={staggerContainer(0.2, 0.1)}
            >
              {cart.map((cartItem, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 'tween', 0.2 * index, 0.4)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <CartTile
                    name={cartItem.product.name}
                    price={cartItem.product.price}
                    imgURLs={cartItem.product.imgURLs}
                    quantity={cartItem.quantity}
                    productId={cartItem.product._id}
                  />
                </motion.div>
              ))}
            </motion.section>
            <motion.div 
              className='flex justify-end mt-4'
              variants={fadeIn('up', 'tween', 0.4, 0.4)}
            >
              <p className="text-black text-3xl font-semibold text-left font-Palanquin mr-4">Subtotal: </p>
              <p className="text-black text-xl mt-2 font-semibold text-left font-Palanquin">₹</p>
              <p className="text-black text-3xl font-semibold text-left font-Palanquin"> {cartTotalValue.toFixed(2)}</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 'tween', 0.5, 0.4)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  );
}

export default Cart;
