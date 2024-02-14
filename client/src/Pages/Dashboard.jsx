import React from 'react'
import RevenueCard from '../Components/RevenueCard'

function Dashboard() {
  return (
    <div>
        <h3 className='font-semibold p-5 text-2xl'>Dashboard</h3>
        <RevenueCard title={"Revenue"} value={"₹245600"} percentage={"76%"}/>



    </div>
  )
}

export default Dashboard