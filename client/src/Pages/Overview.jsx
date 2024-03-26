import React from 'react'
import OverviewCard from '../Components/OverviewCard'
import SideBar from '../Components/SideBar'

function Overview() {
  return (
    <div>
      <SideBar/>
        <h3 className='font-semibold p-5 text-2xl text-black'>Overview</h3>
        <div className='flex items-center justify-evenly'>
            <OverviewCard title={"Revenue"} value={"₹245600"} percentage={"76%"}/>
            <OverviewCard title={"User"} value={"8"} percentage={"44%"}/>
            <OverviewCard title={"Transaction"} value={"62"} percentage={"26%"}/>
            <OverviewCard title={"Products"} value={"17"} percentage={"45%"}/>

        </div>
        <h1 className='text-2xl text-coral-red'>Add Products</h1>


    </div>
  )
}

export default Overview