import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartItem } from '../Recoil/cartAtom';

function PaymentInfo() {
  const cart = useRecoilValue(cartItem);
  console.log(cart);

  if (!Array.isArray(cart)) {
    return (
      <div className="w-full p-5 shadow-lg lg:max-w-lg mt-10 rounded-lg bg-white">
        <div className="space-y-2">
          <div className='flex flex-col px-10 py-10 m-4'>
            <h3 className='flex justify-center text-coral-red text-3xl font-palanquin'>
              Your Order
            </h3>
            <p className="text-lg font-palanquin">No items in the cart.</p>
          </div>
        </div>
      </div>
    );
  }

  const items = cart.map(item => ({
    ...item.product,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity
  }));

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  const taxRate = 0.1;
  const tax = subtotal * taxRate;

  const shippingFee = 49;

  const total = subtotal + tax + shippingFee;

  return (
    <div className="w-full p-5 shadow-lg lg:max-w-lg mt-10 rounded-lg bg-white">
      <div className="space-y-2">
        <div className='flex flex-col px-10 py-10 m-4'>
          <h3 className='flex justify-center text-coral-red text-3xl font-palanquin'>
            Your Order
          </h3>

          <div className="flex justify-between items-center mt-2 p-2 border-b border-gray-300">
            <p className="text-lg font-palanquin font-semibold">Products</p>
            <p className="text-lg font-palanquin font-semibold">Price</p>
          </div>

          {/* List of products */}
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mt-4">
              <p className="text-lg font-palanquin">{item.name} x {item.quantity}</p>
              <p className="text-lg font-palanquin">₹{item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          {/* Subtotal */}
          <div className="flex justify-between items-center mt-4 border-t border-gray-300">
            <p className="text-lg font-palanquin font-semibold">Subtotal:</p>
            <p className="text-lg font-palanquin">₹{subtotal.toFixed(2)}</p>
          </div>
          {/* Tax */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-palanquin font-semibold">Tax:</p>
            <p className="text-lg font-palanquin">₹{tax.toFixed(2)}</p>
          </div>
          {/* Shipping fee */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-palanquin font-semibold">Shipping Fee:</p>
            <p className="text-lg font-palanquin">₹{shippingFee.toFixed(2)}</p>
          </div>
          {/* Total */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-palanquin font-semibold">Total:</p>
            <p className="text-lg font-palanquin">₹{total.toFixed(2)}</p>
          </div>
          {/* Proceed to pay button */}
          <button className='mt-5 bg-white text-coral-red border border-coral-red hover:text-white 
              hover:bg-coral-red font-bold text-xl h-12 rounded-lg'>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
