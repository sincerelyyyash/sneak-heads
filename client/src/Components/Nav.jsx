import React from 'react'
import {headerLogo} from '../assets/images'
import {hamburger} from '../assets/icons'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';



const Nav = () => {

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('accessToken');
  const handleSearch = (query) => {
    console.log('Search Query:', query);
  };

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
         onClick={()=>{
            navigate("/cart")
        }}>View Cart</button>
          </li>
          <li>
        {isLoggedIn ? (<p className='font-montserrat
              leading-normal
              text-lg
              text-slate-gray'>Hello, User </p>): <button 
         className='font-montserrat
         leading-normal
         text-lg
         text-slate-gray'
         onClick={()=>{
            navigate("/signin")
        }}>Sign-In</button>}
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