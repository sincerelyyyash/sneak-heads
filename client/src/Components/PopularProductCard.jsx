import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';

const PopularProductCard = ({ imgURLs, name, price, productId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const firstImage = imgURLs && imgURLs.length > 0 ? imgURLs[0] : '';

  return (
    <div className={`border rounded-lg overflow-hidden flex justify-center bg-gray-50 ${isHovered ? 'border-coral-red' : 'border-gray-300'} ${isHovered ? 'hover:scale-105' : ''}`}>
      <div
        className={`product-card`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/products/${productId}`} className="block">
          <img src={firstImage} alt={name} className="w-[280px] h-[340px]" /> 
          <div className="p-4">
            <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin h-20">{name}</h3>
            <div className='flex flex-row gap-4'>
              <p className="mt-2 text-black text-xl leading-normal font-semibold font-palanquin">Rs. {price}</p>
              <Button square={true} label='View Details' fullWidth={true}/>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopularProductCard;
