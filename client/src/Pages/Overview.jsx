import React from 'react'
import OverviewCard from '../Components/OverviewCard'
import SideBar from '../Components/SideBar'

function Overview() {
  return (
    <div>
      <SideBar/>
        <h3 className='font-semibold p-5 text-2xl'>Overview</h3>
        <div className='flex items-center justify-evenly'>
            <OverviewCard title={"Revenue"} value={"₹245600"} percentage={"76%"}/>
            <OverviewCard title={"User"} value={"8"} percentage={"44%"}/>
            <OverviewCard title={"Transaction"} value={"62"} percentage={"26%"}/>
            <OverviewCard title={"Products"} value={"17"} percentage={"45%"}/>

        </div>


    </div>
  )
}

export default Overview