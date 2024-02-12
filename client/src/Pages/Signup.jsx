import React from 'react'
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center'>
        <div className="w-full p-5 shadow-2xl lg:max-w-lg mt-10 rounded-lg">
                <div className="space-y-2">
                <div className='flex flex-col px-10 py-10'>
            <h3 className='flex justify-center text-coral-red text-4xl font-bold'>
                Sign Up
            </h3>
            <p className='flex justify-center mt-4 text-gray-500 text-xl'>
                Enter your information to create an account
            </p>
            <p className='mt-5 font-bold text-lg'>Full Name</p>
            <input variant="outlined" type="text" name="fullName" id="fullname" placeholder='Tony Stark'
                onChange={(e)=>{
                    setFullName(e.target.value);
                }}
                className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
    
           
    
            <p className='mt-5 font-bold text-lg'>Email</p>
            <input variant="outlined" type='email' name="email" id="email" placeholder='tony@example.com'
                onChange={(e)=>{
                    setUsername(e.target.value);
                }}
                className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
    
            <p className='mt-5 font-bold text-lg'>Password</p>
            <input variant="outlined" type="password" name="password" id="password" 
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                className='w-full border border-gray-300 h-10  mt-3 rounded-lg p-2'
            />
    
            <button
            // onClick={handleSignUp}
            className='mt-5 bg-coral-red text-white font-bold text-xl h-12 rounded-lg'
            >Sign Up</button>
            <div className='flex flex-row mt-4 justify-center gap-1'>
            <p>Already have an account?</p><button className='font-bold underline text-coral-red'  onClick={()=>{
                navigate("/signin")
            }}>Login</button>
            
            
            </div>
            </div>
            </div>
        </div>
        </div>
      )
}

export default Signup