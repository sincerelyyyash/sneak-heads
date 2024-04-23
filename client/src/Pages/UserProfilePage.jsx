import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'

function UserProfilePage() {
  return (
    <div>
      <Nav />
      <div className='py-20 pt-40 h-screen'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <p className="text-coral-red text-2xl font-semibold text-left font-montserrat">My Profile</p>
        </div>       
      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer />
      </section>
    </div>
  )
}

export default UserProfilePage