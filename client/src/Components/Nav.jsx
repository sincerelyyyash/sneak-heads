import React from 'react'
import {headerLogo} from '../assets/images'
import {hamburger} from '../assets/icons'
import { navLinks } from '../Constants'
import { useNavigate } from 'react-router-dom';


import Signin from '../Pages/Signin';

const Nav = () => {

  const navigate = useNavigate();

  return (
    <header className='padding-x
    py-8 absolute z-10 w-full'>
      <nav className='flex
      justify-between items-center
      max-container'>
        <a href="/">
          <img src={headerLogo} alt="Logo"
          width={130}
          height={30} />
        </a>
        <ul className='flex-1 flex justify-center items-center
        gap-16 max-lg:hidden'>
          {navLinks.map((item)=>(
            <li key={item.label}>
              <a
              href={item.href}
              className='font-montserrat
              leading-normal
              text-lg
              text-slate-gray'
              >
                {item.label}
              </a>
            </li>
          ))}
         <button 
         className='font-montserrat
         leading-normal
         text-lg
         text-slate-gray'
         onClick={()=>{
            navigate("/signin")
        }}>Sign-In</button>
        </ul>
    
      
       
        <div className='hidden 
        max-lg:block'>
          <img src={hamburger} alt='hamburger icon' width={25} height={25} />
        </div>
      </nav>
    </header>
  )
}

export default Nav