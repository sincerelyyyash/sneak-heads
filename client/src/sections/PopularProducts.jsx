import { useRecoilValue } from "recoil"
import PopularProductCard from "../Components/PopularProductCard"
import { productDetails } from "../Recoil/productAtoms"
import { arrowRight } from "../assets/icons";

const PopularProducts = () => {

  const productsData = useRecoilValue(productDetails); 
  const products = productsData.data;
  return (
    <div>
      <section id="products" className="max-container max-sm:mt-12">
        <div className=" flex flex-row justify-between">
        <div className="flex flex-col justify-start
        gap-5">
          <h2 className="text-4xl font-palanquin font-bold"> Our <span className="text-coral-red">Popular</span> Products</h2>
          <p 
          className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
            Experience top-notch quality and style with our 
            sought-after selections. Discover a world of comfort, design
            and value
          </p>
        </div>
        <div>
          <a href="/products">
            <div className="flex flex-row justify-center items-center">
            <p className="text-xl mt-12 font-palanquin">
              View All Products
            </p>
            <img src={arrowRight} alt="Arrow Right icon" 
        className="ml rounded-full w-5 h-5 mt-12 " />
            </div>
          </a>
        </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
          {products.slice(0, 4).map((product) => (
          <PopularProductCard 
          productId={product._id}
          key={product._id}
          {...product}
          />
          ))}
        </div>


      </section>
    </div>
  )
}

export default PopularProducts