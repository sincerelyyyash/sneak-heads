import React from 'react'
import SideBar from '../Components/SideBar'
import PopularProductCard from '../Components/PopularProductCard'
import { products } from "../Constants"

const Products = () => {
  return (
    <div className='flex flex-row gap-8 h-screen bg-gray-100'>
        <SideBar className='basis-1/4'/>
        <main>
        <h1 className='text-2xl font-medium font-montserrat text-black p-5'>Products</h1>
        <div className='flex flex-row justify-between'>
        <div
        className="mt-4 grid lg:grid-cols-3 md:grid-cols-3 
        sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
          {products.map((product)=>(
            <PopularProductCard key=
            {product.name} {...product}/>
          ))}
        </div>
        </div>
        </main>
    </div>
  )
}

export default Products
