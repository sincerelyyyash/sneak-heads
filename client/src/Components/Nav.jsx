import React, { useEffect, useState } from 'react'
import {headerLogo} from '../assets/images'
import {hamburger} from '../assets/icons'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DropdownMenu from './Dropdown';



const Nav = () => {

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <header className='padding-x
    py-8 absolute z-10 w-full'>
      <nav className='flex
      justify-between items-center
      max-container'>
        <div className='w-2/3'>
        <a href="/">
          <h1 className='text-4xl text-coral-red font-semibold font-palanquin'>
          SneakHeads
        </h1>
        </a>
        </div>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <ul className='flex-1 flex justify-center items-center
        gap-16 max-lg:hidden'>
          <li>
          <button 
         className='font-montserrat
         leading-normal
         text-lg
         text-slate-gray'
         onClick={()=>{
            navigate("/products")
        }}>Products</button>
          </li>
          <li> 
            <button 
              className='font-montserrat
              leading-normal
              text-lg
              text-slate-gray'
              onClick={handleProfileClick}
            >
              My Account
            </button>
            {showDropdown && <DropdownMenu />}
          </li>
        </ul>
    
      
       
        <div className='hidden 
        max-lg:block'>
          <img src={hamburger} alt='hamburger icon' width={25} height={25} onClick={handleProfileClick} />
          {showDropdown && <DropdownMenu />}
        </div>
      </nav>
    </header>
  )
}

export default Nav