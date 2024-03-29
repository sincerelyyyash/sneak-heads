import React from 'react';
import Nav from '../Components/Nav';
import { Footer } from '../sections';
import CartTile from '../Components/CartTile';
import { products } from '../Constants'; 

function Cart() {
  return (
    <div>
      <Nav />
      <div className='py-20 pt-40'>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.map(product => (
            <CartTile key={product.productId} products={products} productId={product.productId} quantity={product.quantity} />
          ))}
        </section>
      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer />
      </section>
    </div>
  );
}

export default Cart;
