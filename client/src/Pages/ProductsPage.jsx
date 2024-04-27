import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import PopularProductCard from '../Components/PopularProductCard'
import { useRecoilValue } from "recoil"
import { productDetails } from "../Recoil/productAtoms"
import { useGetProducts } from '../Api/ProductsApi';


 function ProductsPage(){
  const { getProducts } = useGetProducts();
  useEffect(()=>{
    getProducts();
  })

  const productsData = useRecoilValue(productDetails); 
  const products = productsData.data;
  return (
    <main className="flex flex-col">
      <div>
        <Nav/>
      </div>
      <div className='p-10 m-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className="flex flex-col justify-start gap-5 pt-20">
          <h2 className="text-4xl font-palanquin font-bold"> All <span className="text-coral-red">Popular</span> Products</h2>
        </div>
        <div className="mt-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 sm:gap-6 gap-14">
          {products.map((product) => (
          <PopularProductCard 
          productId={product._id}
          key={product._id}
          {...product}
          
          />
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
