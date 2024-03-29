import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import PopularProductCard from '../Components/PopularProductCard'
import { products } from "../Constants"

 function ProductsPage(){
  return (
    <main className="flex flex-col">
      <div>
        <Nav/>
      </div>
      <div className='p-10 m-10'>
      <div className="flex flex-col justify-start gap-5 pt-10">
          <h2 className="text-4xl font-palanquin font-bold"> All <span className="text-coral-red">Popular</span> Products</h2>
        </div>
        <div
        className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 
        sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
          {products.map((product)=>(
            <PopularProductCard 
            productId={product.productId}
            key={product.productId} {...product}/>
          ))}
        </div>
      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer/>
      </section>
    </main>
  )
}

export default ProductsPage
