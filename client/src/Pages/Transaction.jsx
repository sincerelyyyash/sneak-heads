import React from 'react'
import SideBar from '../Components/SideBar'

const Transaction = () => {
  return (
    <div className='grid grid-cols-2 gap-8 h-screen bg-gray-100'>
        <SideBar/>
        <main>Transaction</main>
    </div>
  )
}

export default Transaction