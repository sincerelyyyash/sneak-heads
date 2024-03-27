import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../Constants';
import ImageOptions from '../Components/ImageOptions';
import Button from '../Components/Button';
import { logo } from "../assets/icons"
import { star } from '../assets/icons'
import ProductNotfound from './ProductNotfound';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = products.find(product => product.productId == productId);

  if (!product) {
    return <div><ProductNotfound/></div>;
  }

  const { imgURLs, name, price, description } = product;

  const [selectedImage, setSelectedImage] = useState(imgURLs[0]);

  return (
    <div className='m-10 p-5 flex flex-row'>
      <div>
      <div>
      <div className='w-full'>
        <img src={selectedImage} alt={name} className="w-[540px] h-[440px]" />
      </div>
      <div className="flex justify-start">
        <ImageOptions
          imgURLs={imgURLs}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
      </div>
      </div>
      <div>
        <h1 className='mt-2 text-4xl leading-normal font-semibold font-palanquin text-black'>{name}</h1>
        <div className='mt-3 flex justify-start items-start gap-2.5'>
            <img src={star} alt="Star"
            width={24}
            height={24}
            className='object-contain m-0'
            />
            {/* <p className='text-xl font-montserrat text-slate-gray'>{rating}</p> */}
        </div>
        <p className='mt-4 font-montserrat
      text-gray-600' style={{ wordWrap: 'break-word', maxWidth: '580px' }}>{description}</p>
      <p className="mt-2 font-semibold font-montserrat text-coral-red text-3xl leading-normal">{price}</p>
      <div className="mt-11 flex flex-wrap gap-4">
        <Button label="Add to cart"
        backgroundColor='bg-white'
        borderColor='border-slate-gray'
        textColor ='text-slate-gray'
        />
        <Button label='Shop Now' />
        </div>
      </div>
    </div>
    
  );
};

export default ProductDetailsPage;
