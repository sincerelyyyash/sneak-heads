import React from 'react'
import SideBar from '../Components/SideBar'

const Customer = () => {
  return (
    <div className='grid grid-cols-2 gap-8 h-screen bg-gray-100'>
        <SideBar/>
        <main>Customer</main>
    </div>
  )
}

export default Customer