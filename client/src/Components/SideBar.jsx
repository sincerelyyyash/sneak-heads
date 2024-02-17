import React from 'react'
import { useNavigate } from 'react-router-dom'



function SideBar() {

    const navigate = useNavigate();


  return (
    <div className='w-64 bg-gray-800 fixed h-full'>
       <div>
       <h1 className='text-2xl text-white font-bold'>Dashboard</h1>
       </div>
       <ul>
        <li>
            <button onClick={()=>{
                navigate("/overview")
            }}>Overview</button>
        </li>
       </ul>
    </div>
  )
}

export default SideBar