import React from 'react'
import SideBar from '../Components/SideBar'
import Overview from './Overview'
import OverviewCard from '../Components/OverviewCard'

function Dashboard() {
  return (
    <div className='grid grid-cols-2 gap-8 h-screen bg-gray-100'>
        <SideBar/>
        <main>
     
          <div className='flex items-center justify-evenly'>
            <OverviewCard title={"Revenue"} value={"₹245600"} percentage={-76}/>
          </div>
    
        </main>
    </div>
  )
}

export default Dashboard