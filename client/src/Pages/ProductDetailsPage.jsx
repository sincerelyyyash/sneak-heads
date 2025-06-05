import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageOptions from '../Components/ProductImagesOptions';
import Button from '../Components/Button';
import ProductNotfound from '../Components/ProductNotfound';
import { Footer } from '../sections';
import Nav from '../Components/Nav';
import { getProductDetails } from '../Api/ProductsApi'; 
import { addToCart } from '../Api/CartsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(6); 
  const navigate = useNavigate();

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

  const successToast = (message) => {
    toast.success(message);
  };
  const failureToast = (message) => {
    toast.error(message);
  };
  

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(productId);
        setProductDetails(data);
        setSelectedImage(data.imgURLs && data.imgURLs.length > 0 ? data.imgURLs[0] : '');
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    return <div><ProductNotfound/></div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { name, description, price } = productDetails;

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      successToast("Product added to cart!");
    } catch (error) {
      failureToast("Could not add product to cart!");
    }
  };

  const handleBuyNow = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      navigate('/checkout')
    } catch (error) {
      // console.log(error)
      failureToast("Failed to shop now");
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };


  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

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
        <Nav/>
      </motion.section>
      <motion.div 
        className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 padding flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-x-12'
        variants={fadeIn('up', 0.3)}
      >
        <motion.div 
          className="w-full lg:w-[680px] mb-8 lg:mb-0"
          variants={fadeIn('right', 0.4)}
        >
          <motion.div 
            className='w-full flex justify-center'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={selectedImage} alt={name} className="w-full lg:w-[540px] h-[480px]" />
          </motion.div>
          <motion.div 
            className="flex justify-start"
            variants={fadeIn('up', 0.5)}
          >
            <ImageOptions
              imgURLs={productDetails.imgURLs}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </motion.div>
        </motion.div>
        <motion.div 
          className="w-full lg:w-full mx-auto lg:mx-0"
          variants={fadeIn('left', 0.4)}
        >
          <motion.h1 
            className='mt-2 text-4xl leading-normal font-semibold font-palanquin text-black'
            variants={fadeIn('up', 0.5)}
          >
            {name}
          </motion.h1>
          <motion.p 
            className='mt-4 font-montserrat text-gray-600 lg:max-w-lg'
            variants={fadeIn('up', 0.6)}
          >
            {description}
          </motion.p>
          <motion.p 
            className="mt-2 font-semibold font-palanquin text-gray-700 text-3xl leading-normal"
            variants={fadeIn('up', 0.7)}
          >
            ₹ {price}
          </motion.p>
          <motion.div 
            className="mt-4"
            variants={fadeIn('up', 0.8)}
          >
            <h2 className='font-montserrat text-gray-600'>Quantity: (Max- 10 per order)</h2>
            <div className="flex gap-2 mt-2">
              <motion.button 
                onClick={handleDecreaseQuantity} 
                className="border border-gray-300 px-3 py-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <span className='text-2xl font-normal'>{quantity}</span>
              <motion.button 
                onClick={handleIncreaseQuantity} 
                className="border border-gray-300 px-3 py-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            className="mt-4"
            variants={fadeIn('up', 0.9)}
          >
            <h2 className='font-montserrat text-gray-600'>Size:</h2>
            <div className="flex gap-2 mt-2">
              {[6, 7, 8, 9, 10].map(size => (
                <motion.button
                  key={size}
                  className={`px-4 py-2 rounded-full ${selectedSize === size ? 'bg-coral-red text-white' : 'bg-white text-coral-red'} border border-gray-300`}
                  onClick={() => handleSizeSelect(size)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="mt-11 flex flex-wrap gap-4"
            variants={fadeIn('up', 1)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                label="Add to cart" 
                backgroundColor='bg-white'  
                borderColor='border-gray-500' 
                textColor='text-black' 
                onClick={()=>{
                  handleAddToCart(productId,quantity);
                }} 
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                label='Shop Now' 
                backgroundColor='bg-white' 
                borderColor='border-coral-red' 
                textColor='text-coral-red' 
                onClick={()=>{
                  handleBuyNow(productId,quantity);
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.section 
        className="padding-x padding-t pt-8 pb-8 bg-black"
        variants={fadeIn('up', 1.1)}
      >
        <Footer/>
      </motion.section>
      <ToastContainer/>
    </motion.div>
  );
};

export default ProductDetailsPage;
