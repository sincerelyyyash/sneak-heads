import React, { useState, useEffect } from 'react';
import SquareButton from './SquareButton';
import { fetchCartItems, modifyProductQuantity, removeFromCart} from '../Api/CartsApi'; // Import cartTotal atom
import { useRecoilState } from 'recoil'; 
import { cartTotal } from '../Recoil/cartAtom';

const CartTile = ({ name, price, imgURLs, quantity, productId }) => {
  if (!name || !price || !imgURLs || imgURLs.length === 0 || !quantity) {
    return null;
  }

  const imgURL = imgURLs[0];
  const { getAllProductsFromCart } = fetchCartItems();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [total, setTotal] = useRecoilState(cartTotal); 

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const handleModifyQuantity = async (newQuantity) => {
    try {
      await modifyProductQuantity(productId, newQuantity);
      getAllProductsFromCart();
      setCurrentQuantity(newQuantity);
      const newTotal = total + (newQuantity - currentQuantity) * price;
      setTotal(newTotal);
    } catch (error) {
      console.error('Error modifying product quantity:', error);
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setInterval(() => {
        handleModifyQuantity(newQuantity);
      }, 4000);
    }
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = currentQuantity + 1;
    setInterval(() => {
      handleModifyQuantity(newQuantity);
    }, 4000); 
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(productId);
      getAllProductsFromCart();
      const newTotal = total - price * currentQuantity;
      setTotal(newTotal);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const priceNumber = parseFloat(price);
  const totalPrice = priceNumber * currentQuantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <img src={imgURL} alt={name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-500">Price: Rs. {price}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-gray-500">Quantity: </p>
            <button className="border border-gray-300 h-6 w-6 flex items-center justify-center bg-gray-100 text-black" onClick={handleDecreaseQuantity}>-</button>
            <p className="text-gray-500">{currentQuantity}</p>
            <button className="border border-gray-300 h-6 w-6 flex items-center justify-center bg-gray-100 text-black" onClick={handleIncreaseQuantity}>+</button>
          </div>
          <div className='m-2'>
            <SquareButton label={"Remove"} onClick={handleRemoveFromCart} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">Rs. {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTile;
