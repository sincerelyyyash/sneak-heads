import React from 'react';

const CartTile = ({ products, productId, quantity }) => {
  const product = products.find(product => product.productId === productId);

  if (!product) {
    return null; 
  }

  const { name, price, imgURLs } = product;
  const imgURL = imgURLs[0];
  const priceNumber = parseFloat(price);
  const totalPrice = priceNumber * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <img src={imgURL} alt={name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-500">Price: ${price}</p>
          <p className="text-gray-500">Quantity: {quantity}</p>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTile;
