import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import OrderTile from '../Components/OrderTile'; 
import { getAllOrders } from '../Api/OrdersApi';
import Button from '../Components/Button';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderDetails = await getAllOrders();
        if (orderDetails.success) {
          const orders = orderDetails.message.orders;
          setOrders(orders); 
        } else {
          // console.error('Failed to retrieve orders:', orderDetails.message);
        }
      } catch (error) {
        // console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchOrders();
  }, []);

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
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeIn('up', 'tween', 0.3, 0.4)}
        >
          <motion.p 
            className="text-coral-red text-2xl font-semibold text-left font-montserrat"
            variants={fadeIn('right', 'tween', 0.4, 0.4)}
          >
            Orders
          </motion.p>
          <motion.section
            variants={staggerContainer(0.2, 0.1)}
          >
            {loading ? (
              <motion.section 
                className='h-screen flex items-center justify-center'
                variants={fadeIn('up', 'tween', 0.5, 0.4)}
              >
                <p className='text-3xl font-montserrat text-gray-500'>Loading...</p>
              </motion.section>
            ) : orders.length === 0 ? (
              <motion.section 
                className='h-screen flex flex-col items-center justify-center'
                variants={fadeIn('up', 'tween', 0.5, 0.4)}
              >
                <p className='text-3xl font-montserrat text-gray-500'>No Orders to show!</p>
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
              </motion.section>
            ) : (
              <motion.div 
                className="md:grid-cols-2 gap-6"
                variants={staggerContainer(0.2, 0.1)}
              >
                {orders.slice().reverse().map((order, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn('up', 'tween', 0.2 * index, 0.4)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <OrderTile order={order} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt- pb-8 bg-black"
        variants={fadeIn('up', 'tween', 0.6, 0.4)}
      >
        <Footer />
      </motion.section>
    </motion.div>
  );
}

export default OrdersPage;
