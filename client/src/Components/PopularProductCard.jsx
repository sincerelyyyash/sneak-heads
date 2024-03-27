import { Link } from 'react-router-dom';
import { useState } from 'react';
import { star } from '../assets/icons';

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
        <div className="rating flex justify-start gap-2.5">
          <img src={star} alt="rating" width={24} height={24} />
          <p className="font-montserrat text-xl leading-normal text-slate-gray">(4.5)</p>
        </div>
        <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
        <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">{price}</p>
      </div>
    </Link>
  );
};

export default PopularProductCard;
