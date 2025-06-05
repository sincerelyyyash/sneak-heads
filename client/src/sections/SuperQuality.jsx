import Button from "../Components/Button"
import { shoe8 } from "../assets/images"
import { motion } from "framer-motion"

const SuperQuality = () => {
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

  return (
    <motion.section 
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div 
        className="flex flex-1 flex-col"
        variants={fadeIn('right', 0.2)}
      >
        <motion.h2 
          className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'
          variants={fadeIn('up', 0.3)}
        >
          We Provide You
          <span className='text-coral-red'> Super </span>
          <span className='text-coral-red'>Quality </span> Shoes
        </motion.h2>
        <motion.p 
          className="mt-4 lg:max-w-lg info-text"
          variants={fadeIn('up', 0.4)}
        >
          Ensuring premium comfort and style, our meticulously crafted footwear 
          is designed to elevate your experience, providing you with unmatched quality,
          innovation, and a touch of elegance.
        </motion.p>
        <motion.p 
          className="mt-6 lg:max-w-lg info-text"
          variants={fadeIn('up', 0.5)}
        >
          Our dedication to ensure detail and 
          excellence ensures your satisfaction
        </motion.p>
      </motion.div>
      <motion.div 
        className="flex-1 flex justify-center items-center"
        variants={fadeIn('left', 0.2)}
      >
        <motion.img 
          src={shoe8} 
          alt="Shoe8" 
          width={570}
          height={522} 
          className="object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      </motion.div>
    </motion.section>
  )
}

export default SuperQuality