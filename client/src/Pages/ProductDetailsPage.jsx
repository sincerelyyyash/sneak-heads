import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageOptions from '../Components/ProductImagesOptions';
import Button from '../Components/Button';
import ProductNotfound from '../Components/ProductNotfound';
import { Footer } from '../sections';
import Nav from '../Components/Nav';
import { getProductDetails } from '../Api/ProductsApi'; 
import { addToCart } from '../Api/CartsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

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

  return (
    <div>
      <section className='pb-12'>
        <Nav/>
      </section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 padding flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-x-12'>
        <div className="w-full lg:w-[680px] mb-8 lg:mb-0">
          <div className='w-full flex justify-center'>
            <img src={selectedImage} alt={name} className="w-full lg:w-[540px] h-[480px]" />
          </div>
          <div className="flex justify-start">
            <ImageOptions
              imgURLs={productDetails.imgURLs}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        </div>
        <div className="w-full lg:w-full mx-auto lg:mx-0">
          <h1 className='mt-2 text-4xl leading-normal font-semibold font-palanquin text-black'>{name}</h1>
          <p className='mt-4 font-montserrat text-gray-600 lg:max-w-lg'>{description}</p>
          <p className="mt-2 font-semibold font-palanquin text-gray-700 text-3xl leading-normal">₹ {price}</p>
          <div className="mt-4">
            <h2 className='font-montserrat text-gray-600'>Quantity: (Max- 10 per order)</h2>
            <div className="flex gap-2 mt-2">
              <button onClick={handleDecreaseQuantity} className="border border-gray-300 px-3 py-1">-</button>
              <span className='text-2xl font-normal'>{quantity}</span>
              <button onClick={handleIncreaseQuantity} className="border border-gray-300 px-3 py-1">+</button>
            </div>
          </div>
          <div className="mt-11 flex flex-wrap gap-4">
            <Button label="Add to cart" backgroundColor='bg-white'  borderColor='border-gray-500' textColor='text-black' onClick={()=>{
              handleAddToCart(productId,quantity);
            }} />
            <Button label='Shop Now' backgroundColor='bg-white' borderColor='border-coral-red' textColor='text-coral-red' />
          </div>
        </div>
      </div>
      <section className="padding-x padding-t pt-8 pb-8 bg-black ">
        <Footer/>
      </section>
      <ToastContainer/>
    </div>
  );
};

export default ProductDetailsPage;
