import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageOptions from '../Components/ProductImagesOptions';
import Button from '../Components/Button';
import ProductNotfound from '../Components/ProductNotfound';
import { Footer } from '../sections';
import Nav from '../Components/Nav';
import { getProductDetails } from '../Api/ProductsApi'; 
import { addToCart } from '../Api/CartsApi';
import PopUpBox from '../Components/PopUpBox';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

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
      <div className='padding flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-x-12'>
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
          <p className="mt-2 font-semibold font-montserrat text-coral-red text-3xl leading-normal">{price}</p>
          <div className="mt-4">
            <h2 className='font-montserrat text-gray-600'>Quantity: (Max- 10 per order)</h2>
            <div className="flex gap-2 mt-2">
              <button onClick={handleDecreaseQuantity} className="border border-gray-300 px-3 py-1">-</button>
              <span className='text-2xl font-normal'>{quantity}</span>
              <button onClick={handleIncreaseQuantity} className="border border-gray-300 px-3 py-1">+</button>
            </div>
          </div>
          <div className="mt-11 flex flex-wrap gap-4">
            <Button label="Add to cart" backgroundColor='bg-white' borderColor='border-slate-gray' textColor='text-slate-gray' onClick={()=>{
              addToCart(productId,quantity);
              PopUpBox("added to cart")
            }} />
            <Button label='Shop Now' />
          </div>
        </div>
      </div>
      <section className="padding-x padding-t pt-8 pb-8 bg-black ">
        <Footer/>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
