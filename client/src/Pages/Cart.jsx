import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import CartTile from '../Components/CartTile';
import { useRecoilValue } from 'recoil';
import { cartItem } from '../Recoil/cartAtom';
import { fetchCartItems } from '../Api/CartsApi';
import SquareButton from '../Components/SquareButton';

function Cart() {
  const { getAllProductsFromCart } = fetchCartItems();

  useEffect(() => {
    getAllProductsFromCart();
  }, []);

  const cartItems = useRecoilValue(cartItem); 
  const cart = cartItems ? cartItems.data : [];
  const [isEmpty, setIsEmpty] = useState(false);
  const [total, setTotal] = useState(0); 

  useEffect(() => {
    setIsEmpty(cart.length === 0);
    const newTotal = cart.reduce((acc, cartItem) => acc + cartItem.subtotal, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div>
      <Nav />
      <div className='py-20 pt-40'>
        {isEmpty ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-3xl font-montserrat text-gray-500">Your cart is empty ;(</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex justify-between'>
            <p className="text-black text-lg font-semibold text-left mb-4">Total: Rs. {total.toFixed(2)}</p>
            <SquareButton label={"Checkout"} />
            </div>
            <section>
              {cart.map((cartItem, index) => (
                <CartTile 
                  key={index} 
                  name={cartItem.product.name} 
                  price={cartItem.product.price} 
                  imgURLs={cartItem.product.imgURLs} 
                  quantity={cartItem.quantity} 
                />
              ))}
            </section>
          </div>
        )}
      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer />
      </section>
    </div>
  );
}

export default Cart;
