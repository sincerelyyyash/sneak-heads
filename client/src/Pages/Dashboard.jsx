import React from 'react'
import SideBar from '../Components/SideBar'
import Overview from './Overview'
import OverviewCard from '../Components/OverviewCard'

function Dashboard() {
  return (
    <div className='flex flex-row gap-8 h-screen bg-gray-100'>
        <SideBar className='basis-1/4'/>
        <main >
        <h3 className='font-medium font-montserrat p-5 text-2xl text-black'>Overview</h3>
          <div className='flex flex-row  justify-between'>
            <OverviewCard title={"Revenue"} value={"₹245600"} percentage={-76}/>
            <OverviewCard title={"Orders"} value={"₹245600"} percentage={-76}/>
            <OverviewCard title={"Users"} value={"₹245600"} percentage={-76}/>
          </div>
          
    
        </main>
    </div>
  )
}

export default Dashboard