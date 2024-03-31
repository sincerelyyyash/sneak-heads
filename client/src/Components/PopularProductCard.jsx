import { Link } from 'react-router-dom';
import { useState } from 'react';
import SquareButton from './SquareButton';

const PopularProductCard = ({ imgURLs, name, price, productId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const firstImage = imgURLs && imgURLs.length > 0 ? imgURLs[0] : '';

  return (
    <Link
      to={`/products/${productId}`}
      className={`product-card ${isHovered ? 'hover:scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={firstImage} alt={name} className="w-[280px] h-[280px]" />
      <div className="product-info">
        <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
        <div className='flex flex-row gap-4'>
        <p className="mt-2 font-normal font-montserrat text-black text-2xl leading-normal">{price}</p>
        <SquareButton label='Add to Cart'
        />
        </div>
       
      </div>
    </Link>
  );
};

export default PopularProductCard;
