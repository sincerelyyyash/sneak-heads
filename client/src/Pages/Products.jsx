import React from 'react'
import SideBar from '../Components/SideBar'
import PopularProductCard from '../Components/PopularProductCard'
import { products } from "../Constants"

const Products = () => {
  return (
    <div className='flex flex-row gap-8 h-screen bg-gray-100'>
        <SideBar className='basis-1/4'/>
        <main>
        <div className='flex flex-row justify-between'>
        <div
        className="mt-16 grid lg:grid-cols-3 md:grid-cols-3 
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
