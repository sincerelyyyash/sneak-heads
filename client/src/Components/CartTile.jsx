import React, { useState, useEffect } from 'react';
import { fetchCartItems, modifyProductQuantity, removeFromCart} from '../Api/CartsApi'; // Import cartTotal atom
import { useRecoilState } from 'recoil'; 
import { cartTotal } from '../Recoil/cartAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';


const CartTile = ({ name, price, imgURLs, quantity, productId }) => {

  if (!name || !price || !imgURLs || imgURLs.length === 0 || !quantity) {
    return null;
  }

  const imgURL = imgURLs[0];
  const { getAllProductsFromCart } = fetchCartItems();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [total, setTotal] = useRecoilState(cartTotal); 

  const successToast = (message) => {
    toast.success(message);
  };
  const failureToast = (message) => {
    toast.error(message);
  };

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
      successToast("Quantity updated!")
    } catch (error) {
      failureToast("Could not update quanity!")
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      handleModifyQuantity(newQuantity);
    }
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = currentQuantity + 1;
      handleModifyQuantity(newQuantity);
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(productId);
      getAllProductsFromCart();
      const newTotal = total - price * currentQuantity;
      setTotal(newTotal);
      successToast("Product removed from cart!")
    } catch (error) {
      failureToast("Could not remove from cart")
    }
  };

  const priceNumber = parseFloat(price);
  const totalPrice = priceNumber * currentQuantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center gap-4 mb-4 sm:mb-0 w-1/2">
        <img src={imgURL} alt={name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-500">Price: ₹{price}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-gray-500">Quantity: </p>
            <button className="border border-gray-300 h-6 w-6 flex items-center justify-center bg-gray-100 text-black" onClick={handleDecreaseQuantity}>-</button>
            <p className="text-gray-500">{currentQuantity}</p>
            <button className="border border-gray-300 h-6 w-6 flex items-center justify-center bg-gray-100 text-black" onClick={handleIncreaseQuantity}>+</button>
          </div>
          <div className='m-2'>
            <Button square={true} label={"Remove"} onClick={handleRemoveFromCart} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">₹{totalPrice.toFixed(2)}</p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CartTile;
