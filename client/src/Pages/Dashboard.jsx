import React from 'react'
import DashboardCard from '../Components/DashboardCard'

function Dashboard() {
  return (
    <div>
        <h3 className='font-semibold p-5 text-2xl'>Dashboard</h3>
        <div className='flex items-center justify-evenly'>
            <DashboardCard title={"Revenue"} value={"₹245600"} percentage={"76%"}/>
            <DashboardCard title={"User"} value={"8"} percentage={"44%"}/>
            <DashboardCard title={"Transaction"} value={"62"} percentage={"26%"}/>
            <DashboardCard title={"Products"} value={"17"} percentage={"45%"}/>

        </div>


    </div>
  )
}

export default Dashboard