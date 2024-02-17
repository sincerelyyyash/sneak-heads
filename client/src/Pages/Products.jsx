import React from 'react'
import SideBar from '../Components/SideBar'

const Products = () => {
  return (
    <div className='grid grid-cols-2 gap-8 h-screen bg-gray-100'>
        <SideBar/>
        <main>Products</main>
    </div>
  )
}

export default Products
