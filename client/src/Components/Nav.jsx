import React, { useState } from 'react'
import {headerLogo} from '../assets/images'
import {hamburger} from '../assets/icons'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DropdownMenu from './Dropdown';



const Nav = () => {

  const navigate = useNavigate();
  const handleSearch = (query) => {
    console.log('Search Query:', query);
  };
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
        <a href="/">
          <h1 className='text-4xl text-coral-red font-semibold font-palanquin'>
          SneakHeads
        </h1>
        </a>
        <SearchBar onSearch={handleSearch} />
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
              Profile
            </button>
            {showDropdown && <DropdownMenu />}
          </li>
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