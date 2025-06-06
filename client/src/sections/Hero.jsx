import Button from "../Components/Button"
import { useState } from "react"
import ShoeCard from "../Components/ShoeCard"
import { shoes, statistics } from "../Constants"
import { arrowRight} from "../assets/icons"
import { bigShoe1 } from "../assets/images"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1)
  const navigate = useNavigate();

  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration: duration || 0.5,
        ease: 'easeOut',
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
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <motion.div 
        className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28"
        variants={fadeIn('right', 'tween', 0.1, 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h1 
          className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold"
          variants={fadeIn('up', 'tween', 0.2, 0.4)}
        >
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">The New Arrival</span>
          <br />
          <span className="text-coral-red inline-block mt-3">SneakHeads</span> Shoes
        </motion.h1>
        <motion.p 
          className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm"
          variants={fadeIn('up', 'tween', 0.3, 0.4)}
        >
          Discover stylish SneakHead arrivals, quality comfort, and
          innovation for your active life.
        </motion.p>
        <motion.div variants={fadeIn('up', 'tween', 0.4, 0.4)}>
          <Button 
            label='Shop Now'
            iconURL={arrowRight}
            square={true}
            onClick={()=>{
              navigate("/products")
            }}
          />
        </motion.div>

        <motion.div 
          className="flex justify-start items-start flex-wrap w-full mt-20 gap-16"
          variants={staggerContainer(0.2, 0.1)}
        >
          {statistics.map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', 'tween', 0.2, 0.4)}
            >
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center"
        variants={fadeIn('left', 'tween', 0.1, 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <img 
          src={bigShoeImg} 
          alt="Shoe Collection"
          width={610}
          height={500}
          className="object-contain relative z-10"
          variants={fadeIn('up', 'tween', 0.2, 0.4)}
        />

        <motion.div 
          className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6"
          variants={staggerContainer(0.2, 0.1)}
        >
          {shoes.map((image, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', 'tween', 0.2, 0.4)}
            >
              <ShoeCard
                index={index}
                imgURL={image}
                changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
