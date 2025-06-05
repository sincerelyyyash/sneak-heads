import { useRecoilValue } from "recoil"
import PopularProductCard from "../Components/PopularProductCard"
import { productDetails } from "../Recoil/productAtoms"
import { arrowRight } from "../assets/icons";
import { motion } from "framer-motion";

const PopularProducts = () => {
  const productsData = useRecoilValue(productDetails); 
  const products = productsData.data;

  const fadeIn = (direction, delay) => ({
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      opacity: 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  });

  const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <section id="products" className="max-container max-sm:mt-12">
        <motion.div 
          className="flex flex-row justify-between"
          variants={fadeIn('up', 0.2)}
        >
          <motion.div 
            className="flex flex-col justify-start gap-5"
            variants={fadeIn('right', 0.3)}
          >
            <h2 className="text-4xl font-palanquin font-bold">
              Our <span className="text-coral-red">Popular</span> Products
            </h2>
            <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
              Experience top-notch quality and style with our 
              sought-after selections. Discover a world of comfort, design
              and value
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn('left', 0.3)}
          >
            <a href="/products">
              <div className="flex flex-row justify-center items-center">
                <p className="text-xl mt-12 font-palanquin">
                  View All Products
                </p>
                <motion.img 
                  src={arrowRight} 
                  alt="Arrow Right icon" 
                  className="ml rounded-full w-5 h-5 mt-12"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </div>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14"
          variants={staggerContainer(0.2, 0.1)}
        >
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product._id}
              variants={fadeIn('up', 0.2)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PopularProductCard 
                productId={product._id}
                {...product}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}

export default PopularProducts