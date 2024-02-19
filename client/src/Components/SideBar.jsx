import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import {
    FaChartBar,
    FaChartLine,
    FaChartPie,
  } from "react-icons/fa";


function SideBar() {

  return (
    <aside className='w-56 bg-white p-4 z-10 
    overflow-y-auto scrollbar-hidden'>
        <h2>Logo</h2>
        <h2 className='mt-4 text-bold'>Dashboard</h2>
        <div className='m-4'>
            <ul>  
                <ListItem 
                url="/admin/dashboard"
                Icon={RiDashboardFill}
                text={"Overview"}
                />

                <ListItem 
                url="/admin/products"
                Icon={RiShoppingBag3Fill}
                text={"Products"}
                />

                <ListItem 
                url="/admin/customer"
                Icon={IoIosPeople}
                text={"Customer"}
                />

                <ListItem 
                url="/admin/transaction"
                Icon={AiFillFileText}
                text={"Transaction"}
                />
                
            </ul>
        </div>

        <h2 className='mt-4 text-bold'>Analytics</h2>
        <div className='m-4'>
            <ul>  
                <ListItem 
                url="/admin/bar"
                Icon={FaChartBar}
                text={"Bar"}
                />

                <ListItem 
                url="/admin/pie"
                Icon={FaChartPie}
                text={"Pie"}
                />

                <ListItem 
                url="/admin/line"
                Icon={FaChartLine}
                text={"Line"}
                />
                
            </ul>
        </div>
        </aside>
  )
}


const ListItem = ({ url, Icon, text }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(url);
  
    return (
      <li className={`flex items-center p-2 ${isActive ? 'bg-blue-100 text-coral-red rounded-lg' : ''}`}>
        <Link to={url} className='flex items-center'>
          <Icon />
          <h3 className=' px-2'>{text}</h3> 
        </Link>
      </li>
    );
  };



export default SideBar