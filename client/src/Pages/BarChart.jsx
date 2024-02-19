import React from 'react'
import SideBar from '../Components/SideBar'

function BarChart() {
    return (
        <div className='grid grid-cols-2 gap-8 h-screen bg-gray-100'>
            <SideBar/>
            <main>BarChart</main>
        </div>
      )
}

export default BarChart