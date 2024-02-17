import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";


function SideBar() {

  return (
    <aside className='w-56 bg-white p-4 z-10 
    overflow-y-auto scrollbar-hidden'>
        <h2>Logo</h2>
        <div className='m-4'>
            <h5>Dashboard</h5>
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
        </aside>
  )
}


const ListItem = ({ url, Icon, text }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(url);
  
    return (
      <li className={`flex items-center p-2 ${isActive ? 'bg-blue-100 text-blue-900 rounded-lg' : ''}`}>
        <Link to={url} className='flex items-center'>
          <Icon />
          <h2 className='text-xl px-2'>{text}</h2> 
        </Link>
      </li>
    );
  };



export default SideBar