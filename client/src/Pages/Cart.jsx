import React, { useEffect } from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import CartTile from '../Components/CartTile';
import { useRecoilValue } from 'recoil';
import { cartItem, cartTotal } from '../Recoil/cartAtom';
import { fetchCartItems } from '../Api/CartsApi';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

function Cart() {
  const { getAllProductsFromCart } = fetchCartItems();

  useEffect(() => {
    getAllProductsFromCart();
  }, []);

  const cartItems = useRecoilValue(cartItem);
  const cartTotalValue = useRecoilValue(cartTotal);
  const cart = Array.isArray(cartItems) ? cartItems : [];
  const isEmpty = cart.length === 0;
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <div className='py-20 pt-40'>
        {isEmpty ? (
          <div className="flex justify-center items-center h-screen flex-col">
            <p className="text-3xl font-montserrat text-gray-500">Your cart is empty ;(</p>
            <Button label='Shop Now'
              square={true}
              onClick={()=>{
                navigate("/products")
              }}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-coral-red text-2xl font-semibold text-left font-montserrat">Shopping Cart</p>
            <div className='flex justify-end mb-4'>
              <Button square={true} label={"Checkout"} onClick={() => {
                navigate('/checkout');
              }} />
            </div>
            <section>
              {cart.map((cartItem, index) => (
                <CartTile
                  key={index}
                  name={cartItem.product.name}
                  price={cartItem.product.price}
                  imgURLs={cartItem.product.imgURLs}
                  quantity={cartItem.quantity}
                  productId={cartItem.product._id}
                />
              ))}
            </section>
            <div className='flex justify-end mt-4'>
              <p className="text-black text-3xl font-semibold text-left font-Palanquin mr-4 ">Subtotal: </p>
              <p className="text-black text-xl mt-2 font-semibold text-left font-Palanquin ">₹</p>
              <p className="text-black text-3xl font-semibold text-left font-Palanquin"> {cartTotalValue.toFixed(2)}</p>
            </div>
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
