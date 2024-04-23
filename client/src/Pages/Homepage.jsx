import React, { useEffect } from 'react'
import { CustomerReviews, Footer, Hero, 
    PopularProducts, Services, SpecialOffer,
  Subscribe,SuperQuality } from "../sections";
  import Nav from "../Components/Nav";
import { useGetProducts } from '../Api/ProductsApi';
import { fetchUser } from '../Api/UserApi';



function Homepage() {
  const { getProducts } = useGetProducts();
  const {getUserDetails} = fetchUser();
  useEffect(()=>{
    getProducts();
    getUserDetails();
  })
  
  return (
    <main className="relative ">
    <Nav/> 
    <section className="xl:pl-8">
      <Hero/>
    </section>

    <section className="padding">
      <PopularProducts/>
    </section>

    <section className="padding">
      <SuperQuality/>
    </section>

    <section className="padding-x py-10">
      <Services/>
    </section>

    {/* <section className="padding">
      <SpecialOffer/>
    </section> */}

    <section className="padding
    bg-pale-blue">
      <CustomerReviews/>
    </section>

    <section className="padding-x
    sm:py-32 py-16 w-full">
      <Subscribe/>
    </section>

    <section className="padding-x padding-t pb-8 bg-black">
      <Footer/>
    </section>
  </main>
  
  )
}

export default Homepage