import React from 'react'
import Nav from '../Components/Nav'
import { Footer } from '../sections'
import BillingInfo from '../Components/BillingInfo'
import PaymentInfo from '../Components/PaymentInfo'
import { useRecoilValue } from 'recoil'
import { emailAtom, fullnameAtom } from '../Recoil/userAtoms'

function CheckoutPage() {

  const userName = useRecoilValue(fullnameAtom);
  const userEmail = useRecoilValue(emailAtom);
  return (
    <div>
      <Nav/>
      <div className='py-20 pt-40'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-coral-red text-3xl font-semibold text-left font-montserrat">Checkout</p>
         <div className='flex flex-row justify-between'>
         <BillingInfo userEmail={userEmail} userName={userName}/>
          <PaymentInfo/>
         </div>
      </div>

      </div>
      <section className="padding-x padding-t pt- pb-8 bg-black">
        <Footer />
      </section>
    </div>
  )
}

export default CheckoutPage