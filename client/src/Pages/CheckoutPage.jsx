import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import BillingInfo from '../Components/BillingInfo'

function CheckoutPage() {
  return (
    <div>
      <Nav/>
      <div className='py-20 pt-40'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-coral-red text-2xl font-semibold text-left font-montserrat">Checkout</p>
          <BillingInfo userEmail={"newtest@gmail.com"} userName={"Yash"}/>
      </div>

      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer />
      </section>
    </div>
  )
}

export default CheckoutPage